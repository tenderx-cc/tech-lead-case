import { createContext, useContext } from 'react';

import { useTabs } from './useTabs.hook';

type TabsContextType<TabValue extends string> = {
  currentTab: string;
  handleTabChange: (value: TabValue) => void;
  tabButtons: React.ReactNode[];
  tabContents: React.ReactNode[];
};

const TabContext = createContext<TabsContextType<any> | null>(null);

type TabsProviderProps<TabValue extends string> = {
  defaultTab: TabValue;
  children: React.ReactNode;
};

export function TabsProvider<TabValue extends string>({
  children,
  defaultTab,
}: TabsProviderProps<TabValue>) {
  const { currentTab, handleTabChange, tabButtons, tabContents } = useTabs(
    defaultTab,
    children,
  );

  return (
    <TabContext.Provider
      value={{
        currentTab,
        handleTabChange,
        tabButtons,
        tabContents,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTabsContext<TabValue extends string>() {
  const context = useContext(
    TabContext as React.Context<TabsContextType<TabValue>>,
  );
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
}
