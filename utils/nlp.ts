import { products } from '../data/products'

type ProductAttribute = 'name' | 'description' | 'category' | 'price' | 'rating'

function extractKeywords(query: string): string[] {
  // Simple keyword extraction (you might want to use a more sophisticated NLP library in a real-world scenario)
  return query.toLowerCase().split(/\s+/).filter(word => word.length > 2)
}

function matchProduct(product: any, keywords: string[]): boolean {
  const productString = `${product.name} ${product.description} ${product.category}`.toLowerCase()
  return keywords.some(keyword => productString.includes(keyword))
}

export function naturalLanguageSearch(query: string) {
  const keywords = extractKeywords(query)
  
  // Filter products based on keywords
  const matchedProducts = products.filter(product => matchProduct(product, keywords))

  // Sort products by relevance (number of matching keywords)
  matchedProducts.sort((a, b) => {
    const aMatches = keywords.filter(keyword => matchProduct(a, [keyword])).length
    const bMatches = keywords.filter(keyword => matchProduct(b, [keyword])).length
    return bMatches - aMatches
  })

  return matchedProducts
}

export function generateSearchResponse(products: any[], query: string): string {
  if (products.length === 0) {
    return `I'm sorry, but I couldn't find any products matching your query: "${query}". Could you please try a different search term or provide more details about what you're looking for?`
  }

  const topProducts = products.slice(0, 3)
  let response = `Based on your search for "${query}", I found the following products that might interest you:\n\n`

  topProducts.forEach((product, index) => {
    response += `${index + 1}. ${product.name} - €${product.price.toFixed(2)}\n`
    response += `   ${product.description}\n\n`
  })

  response += `Would you like more information about any of these products? Or should I refine the search further?`

  return response
}

