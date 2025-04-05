import { useEffect, useMemo, useRef, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { searchTenders } from '../../../../shared/api/magellan/tender';
import type { Interaction } from '../../../../shared/entities/Interaction';
import { DecisionStatus } from '../../../../shared/entities/Interaction';
import type { Filters } from '../../../../shared/entities/StreamFilterSettings';
import type Tender from '../../../../shared/entities/Tender';
import type { RagGenerability } from '../../../../shared/entities/Tender';
import type { User } from '../../../../shared/entities/User';
import type { StatusType } from '../../../../shared/utils/upsertDecision';

const PAGE_SIZE = 20;
const REMAINING_TENDERS_TO_REFETCH = 8;

export type TenderWithTransition = Omit<Tender, 'interaction'> & {
  interaction?: Omit<
    Interaction,
    | 'summarySheetRAGStatus'
    | 'dceRequestStatus'
    | 'isSubscribedToTenderUpdateOnBuyerProfile'
  >;
  ragGenerability: RagGenerability;
  mounted?: boolean;
  transitionStyle?: 'slide-left' | 'slide-right';
};

export const useSearchTenders = (
  filters: Filters | undefined,
  withDecision: boolean,
) => {
  const [decisionsTaken, setDecisionsTaken] = useState<number>(0);
  const [tendersWithTransition, setTendersWithTransition] = useState<
    TenderWithTransition[] | null
  >(null);
  const [lastPage, setLastPage] = useState<number>(-1);
  const queryKey = useMemo(
    () => [searchTenders.name, filters, withDecision],
    [filters, withDecision],
  );
  const [isRefetchedData, setIsRefetchedData] = useState<boolean>(false);
  const prevIsRefetching = useRef<boolean>(false);

  // reset state on stream change
  useEffect(() => {
    setDecisionsTaken(0);
    setTendersWithTransition(null);
    setLastPage(-1);
    setIsRefetchedData(false);
  }, [filters, withDecision]);

  const queryFn = async ({
    pageParam,
  }: {
    pageParam: { page: number; take: number };
  }) => {
    const offset = pageParam.page === 0 ? 0 : decisionsTaken;
    const skip = pageParam.page * PAGE_SIZE - offset;

    if (skip < 0) {
      throw new Error('Invalid skip value, should be positive or 0');
    }

    // casting filters since it we're disabling the query when filters are undefined
    const res = await searchTenders(
      filters as Filters,
      skip,
      pageParam.take,
      withDecision,
    );
    console.log('QueryFn result:', res);
    return { ...res, page: pageParam.page };
  };

  const {
    data,
    fetchNextPage,
    isRefetching,
    isFetching,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: { page: 0, take: PAGE_SIZE },
    getNextPageParam: lastPage => {
      if (lastPage.results.length < PAGE_SIZE) {
        return undefined;
      }

      return { page: lastPage.page + 1, take: 20 };
    },
    enabled: !!filters,
    gcTime: 0,
  });

  // reset state on refetch
  useEffect(() => {
    if (prevIsRefetching.current !== isRefetching) {
      if (isRefetching) {
        setDecisionsTaken(0);
        setTendersWithTransition(null);
        setLastPage(-1);
        setIsRefetchedData(false);
      } else {
        setDecisionsTaken(0);
        setTendersWithTransition(
          data?.pages
            .flatMap(page => page.results)
            .map(tender => ({ ...tender, mounted: true })) || null,
        );
        setLastPage(0);
        setIsRefetchedData(true);
      }
      prevIsRefetching.current = isRefetching;
    }
  }, [data?.pages, isRefetching]);

  // update tenders with transition when new data is fetched
  useEffect(() => {
    if (
      !data ||
      data.pages[data.pages.length - 1].page === lastPage ||
      isRefetchedData
    ) {
      setIsRefetchedData(false);
      return;
    }

    setTendersWithTransition(prev => {
      if (!prev) {
        return (
          data?.pages
            .flatMap(page => page.results)
            .map(tender => ({ ...tender, mounted: true })) || null
        );
      }

      const newTenders = data?.pages[data.pages.length - 1].results;
      if (newTenders) {
        const newTendersWithTransition = newTenders.map(tender => ({
          ...tender,
          mounted: true,
        }));
        return [...prev, ...newTendersWithTransition];
      } else {
        return null;
      }
    });
    setLastPage(data?.pages[data.pages.length - 1].page);
    setIsRefetchedData(false);

    // adding filters as a dependency to reset to ensure the state is recalculated even when data?.pages is the same twice in a row (when both streams are empty for example)
  }, [data, data?.pages, filters, lastPage, isRefetchedData]);

  const updateTender = (
    tenderId: number,
    status: StatusType,
    currentUser: User,
  ) => {
    if (withDecision) {
      setTendersWithTransition(prev => {
        if (!prev) {
          return null;
        }
        const tenderIndex = prev.findIndex(t => t.id === tenderId);
        if (tenderIndex === -1) {
          return prev;
        }

        const updatedTenders = [...prev];
        const tenderToUpdate = updatedTenders[tenderIndex];

        updatedTenders[tenderIndex] = {
          ...tenderToUpdate,
          interaction: {
            decisionStatus:
              status.type === 'DecisionStatus'
                ? status.value
                : tenderToUpdate.interaction?.decisionStatus,
            owner:
              updatedTenders[tenderIndex].interaction?.owner || currentUser,
          },
        };

        return updatedTenders;
      });
    } else {
      const remainingMountedTenders = unmountTender(tenderId, status.value);
      if (
        remainingMountedTenders &&
        remainingMountedTenders < REMAINING_TENDERS_TO_REFETCH
      ) {
        fetchNextPage({ cancelRefetch: false });
      }
    }
  };

  const unmountTender = (tenderId: number, status: DecisionStatus) => {
    if (!tendersWithTransition) {
      return;
    }
    const tenderIndex = tendersWithTransition.findIndex(t => t.id === tenderId);
    if (tenderIndex === -1) {
      return;
    }

    const updatedTenders = [...tendersWithTransition];

    updatedTenders[tenderIndex] = {
      ...updatedTenders[tenderIndex],
      mounted: false,
      transitionStyle:
        status === DecisionStatus.REJECTED ? 'slide-right' : 'slide-left',
    };

    setTendersWithTransition(updatedTenders);
    return updatedTenders.filter(t => t.mounted).length;
  };

  const incrementDecisionsTaken = () => {
    setDecisionsTaken(prev => prev + 1);
  };

  return {
    tendersWithTransition,
    fetchNextPage: () => {
      fetchNextPage({ cancelRefetch: false });
    },
    isFetching,
    isRefetching,
    isLoading,
    updateTender,
    hasNextPage,
    incrementDecisionsTaken,
  };
};
