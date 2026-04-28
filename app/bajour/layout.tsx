import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/bajour/favicon.ico',
  },
}

export default function BajourLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
