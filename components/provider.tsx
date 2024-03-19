'use client'

import { getQueryClient } from '@/lib/utils'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

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
