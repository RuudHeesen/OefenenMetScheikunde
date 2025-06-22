import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scheikunde Oefenen - AI Powered Learning',
  description: 'Oefen scheikunde met AI-gegenereerde vragen op jouw niveau. Voor HAVO en VWO leerlingen.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="bg-gray-100 min-h-screen" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}