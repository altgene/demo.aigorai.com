'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

interface Message {
  content: string
  isUser: boolean
}

interface ChatContextType {
  messages: Message[]
  addMessage: (content: string, isUser: boolean) => void
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isInitialized.current) {
      const savedMessages = localStorage.getItem('chatMessages')
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      }
      isInitialized.current = true
    }
  }, [])

  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }, [messages])

  const addMessage = useCallback((content: string, isUser: boolean) => {
    setMessages(prev => [...prev, { content, isUser }])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

