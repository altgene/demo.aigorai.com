'use client'

import React, { createContext, useContext, useState } from 'react'

interface ChatUIContextType {
  isAssistantOpen: boolean
  toggleAssistant: () => void
}

const ChatUIContext = createContext<ChatUIContextType | undefined>(undefined)

export function ChatUIProvider({ children }: { children: React.ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)

  const toggleAssistant = () => {
    setIsAssistantOpen((prev) => !prev)
  }

  return (
    <ChatUIContext.Provider value={{ isAssistantOpen, toggleAssistant }}>
      {children}
    </ChatUIContext.Provider>
  )
}

export function useChatUI() {
  const context = useContext(ChatUIContext)
  if (context === undefined) {
    throw new Error('useChatUI must be used within a ChatUIProvider')
  }
  return context
}

