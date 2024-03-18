'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

const createQueryClient = () => new QueryClient()

let clientQueryClientSingleton: QueryClient | undefined = undefined
export const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  return (clientQueryClientSingleton ??= createQueryClient())
}

const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Provider
