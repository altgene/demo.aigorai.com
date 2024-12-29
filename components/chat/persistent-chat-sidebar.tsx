'use client'

import { useState } from 'react'
import { ChatInterface } from './chat-interface'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'

export function PersistentChatSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <ChatInterface />
      </div>
      <Button
        className="fixed bottom-4 left-4 md:hidden z-50"
        size="icon"
        onClick={toggleSidebar}
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
    </>
  )
}

