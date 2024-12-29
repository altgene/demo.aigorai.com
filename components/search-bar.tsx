'use client'

import { useState } from 'react'
import { Paperclip, Mic, ArrowRight } from 'lucide-react'

interface SearchBarProps {
  onSubmit: (query: string) => void
  onAttachFile: () => void
  onVoiceInput: () => void
  onSearch: (query: string) => void // Add this new prop
}

export function SearchBar({ onSubmit, onAttachFile, onVoiceInput, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmit(query)
      onSearch(query) // Call the new onSearch prop
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center w-full bg-gray-100 rounded-full">
        <button 
          type="button" 
          className="p-3 text-gray-500 hover:text-[#4A90E2]"
          aria-label="Attach file"
          onClick={onAttachFile}
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question or request here"
          className="flex-1 bg-transparent py-3 px-4 focus:outline-none text-gray-700 placeholder-gray-500"
        />
        <button 
          type="button" 
          className="p-3 text-gray-500 hover:text-[#4A90E2]"
          aria-label="Voice input"
          onClick={onVoiceInput}
        >
          <Mic className="h-5 w-5" />
        </button>
        <button 
          type="submit" 
          className="p-3 text-gray-500 hover:text-[#4A90E2]"
          aria-label="Send message"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}

