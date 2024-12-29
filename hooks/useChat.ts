import { useState, useCallback } from 'react'
import { getUserBudget, isWithinBudget } from '../utils/companySystem'

interface Message {
  content: string
  isUser: boolean
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [userRole, setUserRole] = useState<string>('')
  const [userRequirements, setUserRequirements] = useState<{
    usage?: string
    performance?: string
    portability?: string
  }>({})

  const addMessage = useCallback((content: string, isUser: boolean) => {
    setMessages(prev => [...prev, { content, isUser }])
  }, [])

  const generateAIResponse = useCallback((userMessage: string) => {
    const lowercaseMessage = userMessage.toLowerCase()
    let budget: ReturnType<typeof getUserBudget> | undefined

    if (lowercaseMessage.includes('laptop') && !currentQuestion) {
      setCurrentQuestion('role')
      return "Before we start looking for a laptop, could you please tell me your role in the company? This will help me determine the budget available for your equipment."
    }

    switch (currentQuestion) {
      case 'role':
        setUserRole(userMessage)
        budget = getUserBudget(userMessage)
        if (budget) {
          setCurrentQuestion('usage')
          return `Thank you. As a ${userMessage}, your approved laptop budget is €${budget.laptopBudget}. Now, could you tell me what you'll primarily be using the laptop for? For example:\n\n1. Complex calculations or data analysis\n2. Presentations and general office work\n3. Programming and software development\n4. Graphic design or video editing\n5. General browsing and light tasks`
        } else {
          return "I'm sorry, I couldn't find budget information for that role. Could you please check your role and try again?"
        }

      case 'usage':
        setUserRequirements(prev => ({ ...prev, usage: userMessage }))
        setCurrentQuestion('performance')
        return "Thank you for that information. How important is performance to you? This will help determine the processor and RAM requirements.\n\n1. I need the highest performance possible\n2. I need good performance, but it doesn't have to be the absolute best\n3. Moderate performance is fine\n4. I'm more concerned about battery life than performance"

      case 'performance':
        setUserRequirements(prev => ({ ...prev, performance: userMessage }))
        setCurrentQuestion('portability')
        return "Got it. Now, how important is portability to you? This will help determine the size and weight of the laptop.\n\n1. I need something ultra-portable for frequent travel\n2. I want a balance between screen size and portability\n3. I prefer a larger screen and don't mind the extra weight\n4. Portability isn't a concern; I'll mostly use it in one place"

      case 'portability':
        setUserRequirements(prev => ({ ...prev, portability: userMessage }))
        setCurrentQuestion('recommendation')
        return "Thank you for providing all that information. Based on your requirements and budget, I'll now search for the best laptop options that match your needs. Give me a moment to compile some recommendations for you."

      case 'recommendation':
        budget = getUserBudget(userRole)
        if (budget) {
          const recommendedLaptop = {
            name: "TechPro UltraBook X1",
            price: budget.laptopBudget - 200,
            specs: "Latest gen processor, 16GB RAM, 512GB SSD, 14\" display"
          }

          if (isWithinBudget(userRole, 'laptop', recommendedLaptop.price)) {
            return `Based on your requirements and budget, I recommend the ${recommendedLaptop.name}. It's priced at €${recommendedLaptop.price}, which is within your approved budget of €${budget.laptopBudget}. Key features include: ${recommendedLaptop.specs}. Would you like me to add this to your cart?`
          } else {
            return `I'm having trouble finding a laptop that meets all your requirements within the approved budget of €${budget.laptopBudget}. Would you like me to show you some options that are close to your requirements but might be slightly over budget, or should we prioritize certain features to stay within budget?`
          }
        } else {
          return "I apologize, but I'm having trouble accessing your budget information. Could you please confirm your role in the company?"
        }

      default:
        if (lowercaseMessage.includes('yes') || lowercaseMessage.includes('add to cart')) {
          return "Great! I've added the TechPro UltraBook X1 to your cart. Is there anything else you'd like help with?"
        } else if (lowercaseMessage.includes('no')) {
          return "Alright, I understand. Is there anything else you'd like to know about laptops or any other products?"
        } else {
          return "I apologize, but I didn't quite understand your response. Could you please clarify or rephrase your answer?"
        }
    }
  }, [currentQuestion, userRole])

  return {
    messages,
    addMessage,
    generateAIResponse,
  }
}

