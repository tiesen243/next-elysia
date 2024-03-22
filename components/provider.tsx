'use client'

import { ThemeProvider } from 'next-themes'

const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    {children}
  </ThemeProvider>
)

export default Provider
