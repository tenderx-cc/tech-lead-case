import type { Story } from '@ladle/react';

import { TabsComponents, type TabsProps } from './Tabs';

type TabsValue = 'informations' | 'documents' | 'analyse';
const Tabs = TabsComponents<TabsValue>();

const TabsStory: Story<TabsProps<TabsValue>> = () => {
  return (
    <Tabs defaultTab="informations">
      <Tabs.Button value="informations" label="informations"></Tabs.Button>
      <Tabs.Button value="documents" label="documents"></Tabs.Button>
      <Tabs.Content value="informations">Informations</Tabs.Content>
      <Tabs.Content value="documents">Documents</Tabs.Content>
    </Tabs>
  );
};

export const Default = TabsStory.bind({});
Default.args = {};
