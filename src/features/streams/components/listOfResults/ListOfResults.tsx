import React from 'react';

import { Stack } from '@mantine/core';

import { useLocation } from 'react-router-dom';

import { EmptyPlaceholder } from '../../../../shared/components/UI/EmptyPlaceholder/EmptyPlaceholder';
import { TabsComponents } from '../../../../shared/components/UI/Tabs/Tabs';

import type Stream from '../../../../shared/entities/Stream';
import { Content } from './Content';
import { Header, STREAM_LIST_OF_RESULTS_HEADER_HEIGHT } from './Header';

type ListOfResultsProps = {
  stream: Stream | null;
};

type TabsValue = 'pending' | 'all';

export const ListOfResults = React.memo(({ stream }: ListOfResultsProps) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const urlTabsValue = queryParams.get('tab') as TabsValue | null;
  const defaultTab = 'pending';
  const [tabValue, setTabValue] = React.useState<TabsValue>(
    urlTabsValue || defaultTab,
  );
  const Tabs = TabsComponents<TabsValue>();

  if (stream === null) {
    return (
      <EmptyPlaceholder
        title="Desolé, ce flux n'existe pas."
        subtitle="Il semble que le lien que vous avez suivi soit cassé ou que le flux ait été supprimé"
      />
    );
  }

  return (
    <Stack spacing={0} h="100%">
      <Header streamId={stream?.id} streamTitle={stream?.name} />
      <Tabs
        defaultTab={defaultTab}
        value={tabValue}
        onTabChange={(value: TabsValue) => setTabValue(value)}
        mah={`calc(100% - ${STREAM_LIST_OF_RESULTS_HEADER_HEIGHT}px)`}
        sx={{ zIndex: 1 }}
        h={undefined}
      >
        <Tabs.Button
          value="pending"
          label="À traiter"
          counter={stream?.pendingDecisionCount}
        />
        <Tabs.Button value="all" label="Tous" />
      </Tabs>
      <Content
        streamId={stream?.id}
        filters={stream?.filterSettings}
        withDecision={tabValue === 'all'}
      />
    </Stack>
  );
});
