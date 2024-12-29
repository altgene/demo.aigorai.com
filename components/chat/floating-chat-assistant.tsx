'use client'

import { useState, useEffect } from 'react'
import { Bot, X } from 'lucide-react'
import { ChatInterface } from './chat-interface'
import { Button } from "@/components/ui/button"

interface FloatingChatAssistantProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export function FloatingChatAssistant({ isOpen, onClose, onOpen }: FloatingChatAssistantProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  if (!mounted) return null

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
      <div className="w-96 h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-[#4A90E2]" />
            <h2 className="text-lg font-semibold">Sourcing Assistant</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-grow overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}

