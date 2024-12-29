import { products } from '../data/products'

interface Question {
  id: string
  text: string
  options: string[]
  followUp?: { [key: string]: string }
}

interface UserPreferences {
  category:  'Laptop' | 'Phone' | 'Tablet'
  primaryUse: string
  performanceRequirement: string
  graphicsRequirement: string
  portability: string
  budget: 'Under €500' | '€500 - €1000' | '€1000 - €1500' | 'Over €1500'
  additionalFeatures?: string | string[]
}

const questions: Question[] = [
  {
    id: 'category',
    text: "What type of device are you looking for?",
    options: ['Laptop', 'Phone', 'Tablet']
  },
  {
    id: 'primaryUse',
    text: "What will be your primary use for this device?",
    options: ['General Use', 'Business/Productivity', 'Creative Work', 'Gaming', 'Data Analysis/Programming'],
    followUp: {
      'Creative Work': 'graphicsRequirement',
      'Gaming': 'graphicsRequirement',
      'Data Analysis/Programming': 'performanceRequirement'
    }
  },
  {
    id: 'performanceRequirement',
    text: "How demanding are your performance requirements?",
    options: ['Basic (web browsing, document editing)', 'Moderate (multitasking, light data processing)', 'High (large datasets, complex calculations)', 'Very High (machine learning, big data analytics)']
  },
  {
    id: 'graphicsRequirement',
    text: "How important are graphics capabilities for your work?",
    options: ['Not important', 'Somewhat important', 'Very important', 'Critical (3D rendering, video editing)']
  },
  {
    id: 'portability',
    text: "How important is portability to you?",
    options: ['Not important', 'Somewhat important', 'Very important', 'Critical (frequent travel)']
  },
  {
    id: 'budget',
    text: "What is your budget range?",
    options: ['Under €500', '€500 - €1000', '€1000 - €1500', 'Over €1500']
  },
  {
    id: 'additionalFeatures',
    text: "Are there any additional features you require? (Select all that apply)",
    options: ['Long battery life', 'Large storage capacity', 'High-resolution display', 'Touchscreen', 'Lightweight', 'Rugged/Durable', 'None of the above']
  }
]

function getNextQuestion(currentQuestionId: string | null, userPreferences: Partial<UserPreferences>): Question | null {
  if (!currentQuestionId) {
    return questions[0]
  }
  const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
  const currentQuestion = questions[currentIndex]
  
  if (currentQuestion.followUp && userPreferences[currentQuestion.id as keyof UserPreferences]) {
    const followUpId = currentQuestion.followUp[userPreferences[currentQuestion.id as keyof UserPreferences] as string]
    if (followUpId) {
      return questions.find(q => q.id === followUpId) || questions[currentIndex + 1] || null
    }
  }
  
  return questions[currentIndex + 1] || null
}

function scoreProduct(product: any, preferences: UserPreferences): number {
  let score = 0

  // Category match
  if (product.category.toLowerCase() === preferences.category.toLowerCase()) {
    score += 3
  }

  // Primary use match
  switch (preferences.primaryUse) {
    case 'Business/Productivity':
      if (product.specs.toLowerCase().includes('business') || product.specs.toLowerCase().includes('productivity')) {
        score += 2
      }
      break
    case 'Creative Work':
      if (product.specs.toLowerCase().includes('graphics') || product.specs.toLowerCase().includes('creative')) {
        score += 2
      }
      break
    case 'Gaming':
      if (product.specs.toLowerCase().includes('gaming') || product.specs.toLowerCase().includes('gpu')) {
        score += 2
      }
      break
    case 'Data Analysis/Programming':
      if (product.specs.toLowerCase().includes('i7') || product.specs.toLowerCase().includes('ryzen 7')) {
        score += 2
      }
      break
  }

  // Performance requirement match
  switch (preferences.performanceRequirement) {
    case 'High':
    case 'Very High':
      if (product.specs.toLowerCase().includes('i7') || product.specs.toLowerCase().includes('ryzen 7')) {
        score += 2
      }
      break
    case 'Moderate':
      if (product.specs.toLowerCase().includes('i5') || product.specs.toLowerCase().includes('ryzen 5')) {
        score += 1
      }
      break
  }

  // Graphics requirement match
  if (preferences.graphicsRequirement === 'Critical' || preferences.graphicsRequirement === 'Very important') {
    if (product.specs.toLowerCase().includes('nvidia') || product.specs.toLowerCase().includes('radeon')) {
      score += 2
    }
  }

  // Portability match
  if (preferences.portability === 'Critical' || preferences.portability === 'Very important') {
    if (product.weight < 1.5) {
      score += 2
    } else if (product.weight < 2) {
      score += 1
    }
  }

  // Budget match
  const budgetMap = {
    'Under €500': 500,
    '€500 - €1000': 1000,
    '€1000 - €1500': 1500,
    'Over €1500': 2000
  }
  const maxBudget = budgetMap[preferences.budget as keyof typeof budgetMap]
  if (product.price <= maxBudget) {
    score += 2
  } else if (product.price <= maxBudget * 1.1) {
    score += 1  // Small overage
  }

  // Additional features match
  if (Array.isArray(preferences.additionalFeatures)) {
    preferences.additionalFeatures.forEach(feature => {
      if (product.specs.toLowerCase().includes(feature.toLowerCase())) {
        score += 1
      }
    })
  } else if (typeof preferences.additionalFeatures === 'string') {
    if (product.specs.toLowerCase().includes(preferences.additionalFeatures.toLowerCase())) {
      score += 1
    }
  }

  return score
}

function findBestProducts(preferences: UserPreferences): any[] {
  return products
    .map(product => ({
      ...product,
      score: scoreProduct(product, preferences)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function naturalLanguageSearch(query: string): any[] {
  const keywords = query.toLowerCase().split(/\s+/)
  return products
    .map(product => ({
      ...product,
      score: keywords.filter(keyword => 
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.specs.toLowerCase().includes(keyword)
      ).length
    }))
    .filter(product => product.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export { 
  type Question,
  type UserPreferences,
  getNextQuestion,
  findBestProducts,
  naturalLanguageSearch
}

