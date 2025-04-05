import React, { useCallback, useEffect, useRef } from 'react';

import { Box, Skeleton, Stack } from '@mantine/core';

import { Loader } from '../../../../shared/components/UI/Loader/Loader';

import { displayDecisionNotification } from '../../../../shared/components/notifications/decisionNotifications';
import type { DecisionStatus } from '../../../../shared/entities/Interaction';
import type { Filters } from '../../../../shared/entities/StreamFilterSettings';
import type { RagGenerability } from '../../../../shared/entities/Tender';
import { useActiveUserQuery } from '../../../../shared/hooks/useActiveUserQuery.hook';
import {
  type StatusType,
  upsertDecision,
} from '../../../../shared/utils/upsertDecision';
import { useSearchTenders } from '../forms/hooks/useSearchTenders.hook';
import { EmptyStreamList } from './EmptyStreamList';
import { TenderPreviewCard } from './TenderPreviewCard';

const LENGTH_FROM_BOTTOM_TO_REFETCH = 600;

type HandleDecisionProps = {
  tenderId: number;
  ragGenerability: RagGenerability;
  decisionStatus: DecisionStatus;
  affectedStreamIds?: number[];
  reason?: string;
  previousDecisionStatus?: DecisionStatus;
};

type ContentProps = {
  streamId: number;
  filters: Filters | undefined;
  withDecision?: boolean;
};

export const Content = React.memo(
  ({ streamId, filters, withDecision = false }: ContentProps) => {
    const activeUserQuery = useActiveUserQuery();
    const { user: activeUser } = activeUserQuery.data;
    const {
      tendersWithTransition,
      isLoading,
      isFetching,
      isRefetching,
      fetchNextPage,
      updateTender,
      incrementDecisionsTaken,
    } = useSearchTenders(filters, withDecision);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll to top when tabs change
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }, [withDecision]);

    const fetchMoreOnBottomReached = useCallback(
      (containerRefElement?: HTMLDivElement | null) => {
        if (containerRefElement) {
          const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

          if (
            scrollHeight - scrollTop - clientHeight <
              LENGTH_FROM_BOTTOM_TO_REFETCH &&
            !isFetching
          ) {
            fetchNextPage();
          }
        }
      },
      [fetchNextPage, isFetching],
    );

    const numberOfMountedTenders = tendersWithTransition?.filter(
      t => t.mounted,
    ).length;

    if (
      isLoading ||
      isRefetching ||
      !filters ||
      tendersWithTransition === null
    ) {
      return (
        <Loader
          title="Chargement des opportunités..."
          subtitle="Nous cherchons des opportunités qui vous correspondent parmi plus de 700 000 appels
          d'offres collectés."
          mt={280}
        />
      );
    }

    if (numberOfMountedTenders === 0) {
      return <EmptyStreamList />;
    }

    /*
     * This function is very tighly coupled with the searchTenders hook and the order of calls matters.
     * See the useSearchTenders hook for more information on theses issues.
     */
    async function handleDecision({
      tenderId,
      ragGenerability,
      decisionStatus,
      reason,
    }: HandleDecisionProps) {
      if (!withDecision) {
        // we only increment the decision taken count if we are looking at pending decisions
        incrementDecisionsTaken();
      }

      const status = {
        type: 'DecisionStatus',
        value: decisionStatus,
      } as StatusType;

      await upsertDecision({ tenderId, status, reason, streamId });
      updateTender(tenderId, status, activeUser);

      displayDecisionNotification(decisionStatus, ragGenerability);
    }

    const tenderList = tendersWithTransition.map(tender => (
      <TenderPreviewCard
        tender={tender}
        key={tender.id}
        onTenderDecision={(
          status: DecisionStatus,
          reason: string | undefined,
        ) =>
          handleDecision({
            tenderId: tender.id,
            ragGenerability: tender.ragGenerability,
            decisionStatus: status,
            affectedStreamIds: tender.affectedStreamIds,
            reason,
            previousDecisionStatus: tender.interaction?.decisionStatus,
          })
        }
      />
    ));
    console.log('tenderList', tenderList);

    return (
      <Box
        ref={containerRef}
        onScroll={event =>
          fetchMoreOnBottomReached(event.target as HTMLDivElement)
        }
        p={40}
        h="100%"
        sx={{ overflowY: 'auto' }}
      >
        <Stack spacing={24} maw="1600px">
          {tenderList}
          {isFetching && <TenderPreviewSkeletton />}
        </Stack>
      </Box>
    );
  },
);

function TenderPreviewSkeletton() {
  return (
    <Stack spacing={24}>
      <Skeleton p={24} maw="1500px" h="250px" radius={8}></Skeleton>
      <Skeleton p={24} maw="1500px" h="250px" radius={8}></Skeleton>
    </Stack>
  );
}
