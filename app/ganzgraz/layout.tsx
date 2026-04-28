import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/ganzgraz/favicon.ico',
  },
}

export default function GanzgrazLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
