import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/munotgloeggli/favicon.ico',
  },
}

export default function MunotgloeggliLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
