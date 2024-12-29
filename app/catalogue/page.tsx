'use client'

import { useState, useEffect } from 'react'
import { LayoutGrid, List, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductCard } from '../../components/product-card'
import { PromotionalBanner } from '../../components/promotional-banner'
import { products } from '../../data/products'
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: 'IT', label: 'IT' },
  { id: 'Commercial Services', label: 'Commercial Services' },
  { id: 'MRO', label: 'MRO' },
]

export default function Catalogue() {
  const [isGridView, setIsGridView] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('relevance')
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || 
                              selectedCategories.includes(product.category)
      return matchesSearch && matchesCategory
    })

    const sorted = filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0)
        case 'price-desc':
          return (b.price || 0) - (a.price || 0)
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    console.log('Filtered and sorted products:', sorted)
    setFilteredProducts(sorted)
  }, [searchQuery, selectedCategories, sortOrder])

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchQuery('')
    setSortOrder('relevance')
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <PromotionalBanner />
      
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Showing {filteredProducts.length} Products
              </span>
              <Select
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order by Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Order by Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isGridView ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => setIsGridView(true)}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={!isGridView ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => setIsGridView(false)}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {(selectedCategories.length > 0 || searchQuery) && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold">Active filters:</span>
              {selectedCategories.map(categoryId => (
                <Badge key={categoryId} variant="secondary" className="px-2 py-1">
                  {categories.find(c => c.id === categoryId)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => handleCategoryClick(categoryId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {searchQuery && (
                <Badge variant="secondary" className="px-2 py-1">
                  Search: {searchQuery}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Product Grid */}
          <div className={isGridView 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                isGridView={isGridView}
                addToCart={() => {}} // You'll need to implement this function
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

