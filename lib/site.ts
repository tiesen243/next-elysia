export const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  else return 'http://192.168.1.7:3000'
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
