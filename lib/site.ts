export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.APP_URL) return `https://${process.env.APP_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const siteConfig = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Next.js + Elysia',
  description: 'A Next.js template with Elysiajs',
  applicationName: 'Next.js + Elysia',
  keywords: ['next.js', 'elysiajs', 'react', 'typescript'],
  openGraph: {
    title: 'Next.js + Elysia',
    description: 'A Next.js template with Elysiajs',
    type: 'website',
    url: getBaseUrl(),
    siteName: 'Next.js + Elysia',
  },
  twitter: {
    title: 'Next.js + Elysia',
    description: 'A Next.js template with Elysiajs',
    card: 'summary_large_image',
  },
  alternates: {
    canonical: getBaseUrl(),
  },
}
