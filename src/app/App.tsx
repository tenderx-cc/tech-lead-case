import { Suspense } from 'react';

import { AppShell } from '@mantine/core';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Outlet } from 'react-router-dom';

import { Loader } from '../shared/components/UI/Loader/Loader.tsx';
import { Navbar } from '../shared/components/UI/Navbar/Navbar.tsx';

import { ThemeProvider } from '../shared/contexts/MantineTheme.provider.tsx';
import { queryClient } from '../shared/infra/queryClient.ts';
import { Router } from './Router.tsx';

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export function AppWithLogin() {
  return (
    <AppShell padding={0} header={<Navbar />}>
      <Suspense fallback={<Loader title="Chargement" />}>
        <Outlet />
      </Suspense>
    </AppShell>
  );
}
