import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const QueryContext = React.createContext();

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={queryClient}>
        {children}
      </QueryContext.Provider>
    </QueryClientProvider>
  );
};