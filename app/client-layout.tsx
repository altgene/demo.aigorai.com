'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChatProvider } from '../contexts/chat-context'
import { CartProvider } from '../contexts/cart-context'
import { ChatUIProvider } from '../contexts/chat-ui-context'
import { RoleProvider } from '../contexts/role-context'
import { Header } from '../components/header'
import { FloatingChatButton } from '../components/chat/floating-chat-button'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')

    if (!authStatus && pathname !== '/login') {
      router.push('/login')
    }
  }, [pathname, router])

  if (!isAuthenticated && pathname !== '/login') {
    return null // or a loading spinner
  }

  return (
    <ChatProvider>
      <CartProvider>
        <ChatUIProvider>
          <RoleProvider>
            <div className="min-h-screen flex flex-col">
              {isAuthenticated && <Header />}
              <main className="flex-1">
                {children}
              </main>
              {isAuthenticated && <FloatingChatButton />}
            </div>
          </RoleProvider>
        </ChatUIProvider>
      </CartProvider>
    </ChatProvider>
  )
}

