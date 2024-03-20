import type { Metadata, NextPage } from 'next'
import { Inter } from 'next/font/google'

import { siteConfig } from '@/lib/site'

export const metadata: Metadata = siteConfig

import Header from '@/components/header'
import Provider from '@/components/provider'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const RootLayout: NextPage<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" className="dark" suppressHydrationWarning>
    <body className={inter.variable}>
      <Provider>
        <Header />
        <main className="container my-4 flex-grow space-y-4">{children}</main>
        <Toaster />
      </Provider>
    </body>
  </html>
)

export default RootLayout
