'use client'

import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'

const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SWRConfig>
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </SWRConfig>
)

export default Provider
