'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from '../../contexts/language-context'

interface ChatInputProps {
  onSend: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('')
  const { language } = useLanguage()

  const translations = {
    en: {
      placeholder: "Type your message here...",
      send: "Send",
    },
    de: {
      placeholder: "Geben Sie Ihre Nachricht hier ein...",
      send: "Senden",
    },
    fr: {
      placeholder: "Tapez votre message ici...",
      send: "Envoyer",
    }
  }

  const t = translations[language as keyof typeof translations]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSend(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2 w-full">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.placeholder}
        className="flex-1 min-h-[40px] max-h-[120px] resize-y"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
        <span className="sr-only">{t.send}</span>
      </Button>
    </form>
  )
}

