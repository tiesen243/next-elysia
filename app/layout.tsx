import type { Metadata, NextPage } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Next.js + Elysiajs',
  description: 'A Next.js starter with Elysiajs',
}

import Header from '@/components/header'
import Provider from '@/components/provider'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'
const RootLayout: NextPage<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" className="dark" suppressHydrationWarning>
    <body className={inter.variable}>
      <Provider>
        <Header />
        <main className="container my-4 max-w-screen-md space-y-4">{children}</main>
        <Toaster />
      </Provider>
    </body>
  </html>
)

export default RootLayout
