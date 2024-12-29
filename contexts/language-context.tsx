'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type LanguageContextType = {
  language: 'en' | 'de' | 'fr' | 'es' | 'pl'
  setLanguage: (lang: 'en' | 'de' | 'fr' | 'es' | 'pl') => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'de' | 'fr' | 'es' | 'pl'>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'de' | 'fr' | 'es' | 'pl' | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: 'en' | 'de' | 'fr' | 'es' | 'pl') => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

