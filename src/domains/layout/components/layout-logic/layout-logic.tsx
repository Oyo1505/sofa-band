'use client'

import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query"

const LayoutLogic = ({children}:{children:React.ReactNode}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default LayoutLogic