import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '../contexts/language-context'
import ClientLayout from './client-layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aigorai - Smart Sourcing Platform',
  description: 'Aigorai is an intelligent sourcing platform that streamlines procurement processes and enhances decision-making.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}

