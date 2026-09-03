import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteContentProvider } from '../lib/site-content'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        name: 'theme-color',
        content: '#D6A737',
      },
      {
        title: 'Smart Fix — Mobile Repairing & Training Center, Bharuch',
      },
      {
        name: 'description',
        content: 'Expert mobile repairs, genuine accessories and hands-on technician training — all under one roof in the heart of Bharuch.',
      },
      {
        property: 'og:title',
        content: 'Smart Fix — Mobile Repairing & Training Center, Bharuch',
      },
      {
        property: 'og:description',
        content: 'Expert mobile repairs, genuine accessories and hands-on technician training — all under one roof in the heart of Bharuch.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased min-h-screen">
        <SiteContentProvider>
          {children}
        </SiteContentProvider>
        <Scripts />
      </body>
    </html>
  )
}
