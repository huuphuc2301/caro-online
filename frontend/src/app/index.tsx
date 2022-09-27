import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import RootLayout from './layouts/rootLayout';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout />
    </QueryClientProvider>
  );
}
