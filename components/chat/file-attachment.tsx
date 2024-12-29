'use client'

import { useState, useRef } from 'react'
import { Paperclip } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useLanguage } from '../../contexts/language-context'

interface FileAttachmentProps {
  onFileSelect: (file: File) => void
}

export function FileAttachment({ onFileSelect }: FileAttachmentProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguage()

  const translations = {
    en: {
      attachFile: "Attach file",
    },
    de: {
      attachFile: "Datei anhängen",
    },
    fr: {
      attachFile: "Joindre un fichier",
    }
  }

  const t = translations[language as keyof typeof translations]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleClick}
      >
        <Paperclip className="h-4 w-4" />
        <span className="sr-only">{t.attachFile}</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
    </div>
  )
}

