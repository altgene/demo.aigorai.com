'use client'

import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/language-context'
import { useChatUI } from '../contexts/chat-ui-context'

export default function ClientHome() {
  const { language } = useLanguage()
  const { toggleAssistant } = useChatUI()

  const translations = {
    en: {
      welcome: "Welcome to Aigorai",
      subtitle: "Smart sourcing made easier!",
      startSourcing: "Start Sourcing"
    },
    de: {
      welcome: "Willkommen bei Aigorai",
      subtitle: "Intelligente Beschaffung leicht gemacht!",
      startSourcing: "Beschaffung starten"
    },
    fr: {
      welcome: "Bienvenue sur Aigorai",
      subtitle: "L'approvisionnement intelligent simplifié !",
      startSourcing: "Commencer l'approvisionnement"
    },
    es: {
      welcome: "Bienvenido a Aigorai",
      subtitle: "¡Abastecimiento inteligente simplificado!",
      startSourcing: "Comenzar abastecimiento"
    },
    pl: {
      welcome: "Witaj w Aigorai",
      subtitle: "Inteligentne zaopatrzenie stało się łatwiejsze!",
      startSourcing: "Rozpocznij zaopatrzenie"
    }
  }

  const t = translations[language as keyof typeof translations] || translations.en

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-normal text-gray-600 mb-2">
            {t.welcome}
          </h1>
          <p className="text-xl text-gray-500">
            {t.subtitle}
          </p>
        </div>
        <Button 
          onClick={toggleAssistant}
          className="px-8 py-6 text-lg bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
        >
          {t.startSourcing}
        </Button>
      </main>
    </div>
  )
}

