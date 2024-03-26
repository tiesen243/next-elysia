'use client'

import { ThemeProvider } from 'next-themes'
import { toast } from 'sonner'
import { SWRConfig } from 'swr'

const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SWRConfig
    value={{
      onError: (error: Error) => !error.fieldsError && toast.error(error.message),
      onSuccess: (data: Res) => toast.success(data.message),
    }}
  >
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </SWRConfig>
)

export default Provider
