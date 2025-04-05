import type { ReactNode } from 'react';
import React, { Suspense } from 'react';

import type { TabsListProps } from '@mantine/core';
import { Group, Tabs as MantineTabs, Stack, Text } from '@mantine/core';

import { Counter } from '../Counter/Counter';
import { Loader } from '../Loader/Loader';
import { TabsProvider, useTabsContext } from './TabsProvider.provider';
import { useTabs } from './useTabs.hook';

export type TabsProps<TabValue extends string> = React.ComponentProps<
  typeof MantineTabs
> & {
  children: React.ReactNode;
  defaultTab: TabValue;
  tabListProps?: Omit<TabsListProps, 'children'>;
  header?: ReactNode;
  rightContent?: ReactNode;
};

export function TabsComponents<TabsValue extends string>() {
  function Tabs({
    defaultTab,
    children,
    tabListProps,
    onTabChange,
    header,
    rightContent,
    mx = '05',
    ...rest
  }: TabsProps<TabsValue>) {
    const { currentTab, handleTabChange, tabButtons, tabContents } =
      useTabs<TabsValue>(defaultTab, children);

    return (
      <TabsProvider defaultTab={defaultTab}>
        <MantineTabs
          keepMounted={false}
          w="100%"
          h="100%"
          defaultValue={defaultTab}
          value={currentTab}
          onTabChange={(value: TabsValue) => {
            onTabChange && onTabChange(value);
            handleTabChange(value);
          }}
          sx={{ display: 'flex', flexDirection: 'column', zIndex: 10 }}
          {...rest}
        >
          <Stack
            sx={theme => ({
              borderRadius: theme.radius.md,
            })}
            bg="white"
            spacing={0}
          >
            {header}
            <Group noWrap position="apart" w="100%" px={mx}>
              <MantineTabs.List
                sx={theme => ({
                  borderBottom: `1px solid ${theme.colors.gray[2]}`,
                })}
                {...tabListProps}
              >
                {tabButtons}
              </MantineTabs.List>
              {rightContent}
            </Group>
          </Stack>
          {tabContents}
        </MantineTabs>
      </TabsProvider>
    );
  }

  type TabButtonProps<TabsValue extends string> = {
    value: TabsValue;
    icon?: ReactNode;
    label: ReactNode | string;
    counter?: number;
    disabled?: boolean;
  };

  function TabButton({
    value,
    label,
    icon,
    counter,
    disabled = false,
  }: TabButtonProps<TabsValue>) {
    const { currentTab } = useTabsContext<TabsValue>();
    const isSelected = currentTab === value;

    return (
      <MantineTabs.Tab value={value} disabled={disabled}>
        <Group spacing="xs">
          {icon}
          <Text
            variant="sm"
            fw={isSelected ? '500' : '400'}
            c={isSelected ? 'gray.9' : 'gray.6'}
          >
            {label}
          </Text>
          {counter && (
            <Counter
              variant="subtle"
              value={counter}
              color={isSelected ? 'primary' : 'gray'}
            />
          )}
        </Group>
      </MantineTabs.Tab>
    );
  }

  type TabContentProps<TabsValue extends string> = {
    children: ReactNode;
    value: TabsValue;
    loadingComponent?: ReactNode;
  };

  function TabContent({
    loadingComponent,
    children,
    value,
  }: TabContentProps<TabsValue>) {
    return (
      <MantineTabs.Panel value={value} w="100%" h="100%">
        <Suspense
          fallback={
            loadingComponent || <Loader title="Chargement..." mt={20} />
          }
        >
          {children}
        </Suspense>
      </MantineTabs.Panel>
    );
  }

  TabButton.displayName = 'TabButton';
  TabContent.displayName = 'TabContent';
  Tabs.Button = TabButton;
  Tabs.Content = TabContent;
  return Tabs;
}
