export const baseUrl =
  process.env.NODE_ENV === 'production' ? 'https://next-elysia.vercel.app' : 'http://192.168.1.7:3000'

export const siteConfig = {
  metadataBase: new URL(baseUrl),
  title: 'Next.js + Elysia',
  description: 'A Next.js template with Elysiajs',
  applicationName: 'Next.js + Elysia',
  keywords: ['next.js', 'elysiajs', 'react', 'typescript'],
  openGraph: {
    title: 'Next.js + Elysia',
    description: 'A Next.js template with Elysiajs',
    type: 'website',
    url: baseUrl,
    siteName: 'Next.js + Elysia',
  },
  twitter: {
    title: 'Next.js + Elysia',
    description: 'A Next.js template with Elysiajs',
    card: 'summary_large_image',
  },
  alternates: {
    canonical: baseUrl,
  },
}
