import React, { useCallback, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

type UseTabs<TabsValue extends string> = {
  currentTab: TabsValue;
  handleTabChange: (value: TabsValue) => void;
  tabButtons: React.ReactNode[];
  tabContents: React.ReactNode[];
};

export function useTabs<TabsValue extends string>(
  defaultTab: TabsValue,
  children: React.ReactNode,
): UseTabs<TabsValue> {
  const { pathname, search, hash } = useLocation();
  const getUrlTabsValue = useCallback(
    (search: string): TabsValue | undefined => {
      const queryParams = new URLSearchParams(search);
      const urlTabsValue = queryParams.get('tab');
      return urlTabsValue as TabsValue;
    },
    [],
  );

  const [currentTab, setCurrentTab] = useState<TabsValue>(
    getUrlTabsValue(search) || defaultTab,
  );
  const navigate = useNavigate();

  // Effect to sync TabsValue with URL query parameters
  useEffect(() => {
    const urlTabsValue = getUrlTabsValue(search);
    if (urlTabsValue && urlTabsValue !== currentTab) {
      setCurrentTab(urlTabsValue as TabsValue);
    }
    // This effect should run only when the URL search params change
  }, [search, currentTab, getUrlTabsValue]);

  const handleTabChange = (value: TabsValue) => {
    setCurrentTab(value);
    const queryParams = new URLSearchParams(search);
    queryParams.set('tab', value);
    navigate(`${pathname}?${queryParams.toString()}${hash}`, { replace: true });
  };

  const tabButtons: React.ReactNode[] = [];
  const tabContents: React.ReactNode[] = [];

  React.Children.forEach(children, child => {
    // First, confirm the child is a valid React element
    if (React.isValidElement(child)) {
      // Now, we assert the type to access .type
      const elementType = child.type as any;

      // Then check for displayName
      if (elementType.displayName === 'TabButton') {
        tabButtons.push(child);
      } else if (elementType.displayName === 'TabContent') {
        tabContents.push(child);
      }
    }
  });

  return { currentTab, handleTabChange, tabButtons, tabContents };
}
