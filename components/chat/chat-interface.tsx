'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { MessageBubble } from './message-bubble'
import { ChatInput } from './chat-input'
import { FileAttachment } from './file-attachment'
import { useChat } from '../../contexts/chat-context'
import { useLanguage } from '../../contexts/language-context'
import { Question, UserPreferences, getNextQuestion, findBestProducts, naturalLanguageSearch } from '../../utils/consultativeSearch'
import { Button } from "@/components/ui/button"
import { getUserBudget, isWithinBudget } from '../../utils/companySystem'

type ChatStep = 
  | 'initial'
  | 'consultative_search'
  | 'search_results'
  | 'recommendation'
  | 'navigation'
  | 'tracking_request'

export function ChatInterface() {
  const { messages, addMessage } = useChat()
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState<ChatStep>('initial')
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [userPreferences, setUserPreferences] = useState<Partial<UserPreferences>>({})
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const router = useRouter()
  const [trackingRequestId, setTrackingRequestId] = useState<string | null>(null)
  const { language } = useLanguage()
  const [userRole, setUserRole] = useState<string>('')

  const translations = {
    en: {
      welcome: "Hello! I'm your Sourcing Assistant. I can help you find the perfect product for your needs. Would you like to start a guided search process?",
      startSearch: "Great! Let's start by understanding your needs. What type of device are you looking for? (Laptop, Phone, or Tablet)",
      attachedFile: "Attached file:",
      navigatingToPurchases: "I'll take you to the Purchases page.",
      navigatingToSourcingDesk: "Of course! I'm directing you to the Sourcing Desk page.",
      navigatingToReturns: "Sure thing! I'm navigating you to the Returns page.",
      navigatingToDashboard: "I'm taking you to the Dashboard.",
      navigatingToCatalogue: "I'm directing you to the Product Catalogue.",
      unrecognizedNavigation: "I'm sorry, I couldn't identify the specific page you want to navigate to. Could you please specify if you want to go to Purchases, Sourcing Desk, Returns, Dashboard, or Catalogue?",
    },
    // Add translations for other languages...
  }

  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    if (messages.length === 0) {
      addMessage(t.welcome, false)
    }
  }, [messages, addMessage, t])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (message: string) => {
    addMessage(message, true)
    if (attachedFile) {
      addMessage(`${t.attachedFile} ${attachedFile.name}`, true)
      setAttachedFile(null)
    }
    processUserInput(message)
  }

  const handleFileSelect = (file: File) => {
    setAttachedFile(file)
  }

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (currentStep === 'initial') {
      if (lowerInput.includes('laptop')) {
        startConsultativeSearch('laptop')
      } else if (lowerInput.includes('yes') || lowerInput.includes('start') || lowerInput.includes('guided') || lowerInput.includes('search')) {
        startConsultativeSearch()
      } else {
        addMessage("I understand you might have a specific query. Could you please tell me what kind of product you're looking for or any specific requirements you have?", false)
      }
      return
    }

    if (currentStep === 'consultative_search') {
      handleConsultativeSearchInput(input)
      return
    }

    if (lowerInput.includes('track') || lowerInput.includes('tracking') || lowerInput.includes('shipment status')) {
      setCurrentStep('tracking_request')
      addMessage("I can help you track your shipment. Please provide the request ID in the format REQ-1234567.", false)
      return
    }

    if (lowerInput.includes('take me to') || 
        lowerInput.includes('go to') || 
        lowerInput.includes('navigate to')) {
      handleNavigation(lowerInput);
      return;
    }

    // If no specific action is triggered, attempt a natural language search
    performNaturalLanguageSearch(input)
  }

  const performNaturalLanguageSearch = (query: string) => {
    const searchResults = naturalLanguageSearch(query)
    setCurrentStep('search_results')

    if (searchResults.length === 0) {
      addMessage(`I'm sorry, but I couldn't find any products matching "${query}". Would you like to try our guided search process instead?`, false)
    } else {
      addMessage(`Based on your search for "${query}", here are some recommendations. However, I'd like to ask a few more questions to ensure we find the perfect product for you. Is that okay?`, false)
      searchResults.forEach((product, index) => {
        addMessage(`${index + 1}. ${product.name} - €${product.price.toFixed(2)}`, false)
        addMessage(`   ${product.description}`, false)
      })
    }
  }

  const startConsultativeSearch = (category?: string) => {
    setCurrentStep('consultative_search')
    setUserPreferences(category ? { category: category as 'Laptop' | 'Phone' | 'Tablet' } : { category: undefined })
    setUserRole('Financial Analyst')
    const budget = 1300 // Known budget for Financial Analyst

    addMessage(`As a Financial Analyst, your approved laptop budget is €${budget}. Let's find a suitable device for you that meets your needs for financial analysis tasks within this budget.`, false)
    
    if (category === 'laptop') {
      askNextQuestion('performanceRequirement')
    } else if (category) {
      askNextQuestion('primaryUse')
    } else {
      askNextQuestion('category')
    }
  }

  const handleConsultativeSearchInput = (input: string) => {
    const selectedOptionIndex = parseInt(input) - 1
    if (isNaN(selectedOptionIndex) || selectedOptionIndex < 0 || selectedOptionIndex >= (currentQuestion?.options.length || 0)) {
      addMessage("I'm sorry, that's not a valid option. Please choose a number from the list provided.", false)
      return
    }

    const selectedOption = currentQuestion!.options[selectedOptionIndex]
    
    if (currentQuestion!.id === 'additionalFeatures') {
      setUserPreferences(prev => ({
        ...prev,
        additionalFeatures: prev.additionalFeatures
          ? Array.isArray(prev.additionalFeatures)
            ? [...prev.additionalFeatures, selectedOption]
            : [prev.additionalFeatures, selectedOption]
          : [selectedOption]
      }))
    } else {
      setUserPreferences(prev => ({ ...prev, [currentQuestion!.id]: selectedOption }))
    }
    
    const nextQuestionId = getNextQuestionId(currentQuestion!.id, selectedOption)
    if (nextQuestionId) {
      askNextQuestion(nextQuestionId)
    } else {
      provideRecommendations()
    }
  }

  const getNextQuestionId = (currentQuestionId: string, selectedOption: string): string | null => {
    switch (currentQuestionId) {
      case 'category':
        return 'performanceRequirement'
      case 'performanceRequirement':
        return 'portability'
      case 'portability':
        return 'additionalFeatures'
      case 'additionalFeatures':
        return null
      default:
        return null
    }
  }

  const askNextQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      setCurrentQuestion(question)
      addMessage(question.text, false)
      addMessage("Please choose one of the following options:", false)
      question.options.forEach((option, index) => {
        addMessage(`${index + 1}. ${option}`, false)
      })
    }
  }

  const provideRecommendations = () => {
    const laptopBudget = 1300 // Known budget for Financial Analyst

    const bestProducts = findBestProducts(userPreferences as UserPreferences)
      .filter(product => product.price <= laptopBudget && product.category.toLowerCase() === 'laptop')
      .filter(product => product.specs.toLowerCase().includes('i7') || product.specs.toLowerCase().includes('ryzen 7'))
    setCurrentStep('recommendation')

    if (bestProducts.length === 0) {
      const alternativeProducts = products
        .filter(product => product.price <= laptopBudget && product.category.toLowerCase() === 'laptop')
        .sort((a, b) => b.price - a.price)
        .slice(0, 2)

      if (alternativeProducts.length > 0) {
        addMessage(`I apologize, but I couldn't find laptops with high-end processors that match all your requirements within your €${laptopBudget} budget. However, I can suggest the following alternatives that are within your budget:`, false)
        alternativeProducts.forEach((product, index) => {
          addMessage(`${index + 1}. ${product.name} - €${product.price.toFixed(2)}`, false)
          addMessage(`   ${product.description}`, false)
          addMessage(`   Key features: ${product.specs}`, false)
          addMessage(`   <Link href="/product/${product.id}">View Details</Link>`, false)
        })
        addMessage("Would you like more information about any of these products? Or should we adjust your preferences to find a better match?", false)
      } else {
        addMessage(`I'm sorry, but I couldn't find any laptops within your approved budget of €${laptopBudget}. Would you like to explore options slightly above your budget or adjust your preferences?`, false)
      }
    } else {
      addMessage(`Based on your role as a Financial Analyst, your need for a powerful processor, and your approved budget of €${laptopBudget}, here are the top recommendations:`, false)
      bestProducts.forEach((product, index) => {
        addMessage(`${index + 1}. ${product.name} - €${product.price.toFixed(2)}`, false)
        addMessage(`   ${product.description}`, false)
        addMessage(`   Key features: ${product.specs}`, false)
        addMessage(`   <Link href="/product/${product.id}">View Details</Link>`, false)
      })

      addMessage("These laptops all feature powerful processors suitable for financial analysis tasks and are within your budget. Would you like more information about any of these products? Or should we refine your search further?", false)
    }
  }

  const handleNavigation = (input: string) => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('purchases')) {
      addMessage(t.navigatingToPurchases, false)
      router.push('/purchases')
    } else if (lowerInput.includes('sourcing desk')) {
      addMessage(t.navigatingToSourcingDesk, false)
      router.push('/sourcing-desk')
    } else if (lowerInput.includes('returns')) {
      addMessage(t.navigatingToReturns, false)
      router.push('/returns')
    } else if (lowerInput.includes('dashboard')) {
      addMessage(t.navigatingToDashboard, false)
      router.push('/dashboard')
    } else if (lowerInput.includes('catalogue') || lowerInput.includes('catalog')) {
      addMessage(t.navigatingToCatalogue, false)
      router.push('/catalogue')
    } else {
      addMessage(t.unrecognizedNavigation, false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            content={message.content}
            isUser={message.isUser}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-2">
          <FileAttachment onFileSelect={handleFileSelect} />
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

const questions: Question[] = [
  {
    id: 'category',
    text: 'What type of device are you looking for?',
    options: ['Laptop', 'Phone', 'Tablet']
  },
  {
    id: 'performanceRequirement',
    text: 'As a Financial Analyst, you likely need a device with good performance. How would you describe your performance requirements?',
    options: ['Moderate (for spreadsheets and light data analysis)', 'High (for complex financial modeling)', 'Very High (for large datasets and intensive calculations)']
  },
  {
    id: 'portability',
    text: 'How important is portability for your work?',
    options: ['Very Important (I travel frequently)', 'Important (I sometimes work outside the office)', 'Not Important (I mainly work at my desk)']
  },
  {
    id: 'additionalFeatures',
    text: 'What additional features would be beneficial for your work? (You can select multiple options by entering their numbers one at a time)',
    options: ['Large high-resolution display', 'Numeric keypad', 'Long battery life', 'Enhanced security features', 'Docking station compatibility']
  }
]

const products = [
  // Sample product data - replace with your actual data
  { id: 1, name: 'Laptop A', price: 1200, category: 'laptop', description: 'A powerful laptop for professionals', specs: 'Intel i7, 16GB RAM, 512GB SSD' },
  { id: 2, name: 'Laptop B', price: 1500, category: 'laptop', description: 'High-end laptop with excellent performance', specs: 'AMD Ryzen 7, 32GB RAM, 1TB SSD' },
  { id: 3, name: 'Phone X', price: 1000, category: 'phone', description: 'A premium smartphone', specs: 'Snapdragon 8 Gen 2, 12GB RAM, 256GB Storage' },
  { id: 4, name: 'Tablet Y', price: 500, category: 'tablet', description: 'A versatile tablet', specs: 'Apple M1, 8GB RAM, 128GB Storage' },
  { id: 5, name: 'Laptop C', price: 900, category: 'laptop', description: 'Affordable laptop for everyday use', specs: 'Intel i5, 8GB RAM, 256GB SSD' },
  { id: 6, name: 'Laptop D', price: 1100, category: 'laptop', description: 'Mid-range laptop with good performance', specs: 'AMD Ryzen 5, 16GB RAM, 512GB SSD' },

]

