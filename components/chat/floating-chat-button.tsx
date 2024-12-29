'use client'

import { Bot, X } from 'lucide-react'
import { ChatInterface } from './chat-interface'
import { useChatUI } from '../../contexts/chat-ui-context'

export function FloatingChatButton() {
  const { isAssistantOpen, toggleAssistant } = useChatUI()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isAssistantOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-96 h-[600px] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b bg-[#4A90E2] text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <h2 className="text-lg font-semibold">Sourcing Assistant</h2>
            </div>
            <button onClick={toggleAssistant} className="text-white hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      ) : (
        <button
          onClick={toggleAssistant}
          className="bg-[#4A90E2] hover:bg-[#357ABD] text-white rounded-lg p-4 shadow-lg transition-all duration-200 ease-in-out flex flex-col items-center gap-2"
        >
          <Bot size={24} />
          <span className="text-sm font-medium">Sourcing Assistant</span>
        </button>
      )}
    </div>
  )
}

