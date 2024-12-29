'use client'

import { useState } from 'react'
import { Star, Leaf, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '../contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Progress } from '@/components/ui/progress'
import CleaningServiceDetail from '../components/cleaning-service-detail'

interface CarbonFootprint {
  value: number
  average: number
  unit: string
}

interface ProductDetailProps {
  id: number
  name: string
  description: string
  price: number
  rating: number
  image: string
  category: string
  specs: string
  carbonFootprint: CarbonFootprint
  pricingOptions?: {
    areaBased: { price: number; unit: string }[];
    timeBased: { price: number; unit: string }[];
    frequencyBased: { multiplier: number; unit: string }[];
    serviceTypes: { type: string; description: string }[];
  };
}

export function ProductDetail({
  id,
  name,
  description,
  price,
  rating,
  image,
  category,
  specs,
  carbonFootprint,
  pricingOptions,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState('overview')

  const handleAddToCart = () => {
    if (category === "Commercial Services" && (name.includes("Goetz & Weingardt") || name.includes("iD Media"))) {
      // For cleaning services, we'll handle this in the CleaningServiceDetail component
      return;
    }
    addToCart({ id, name, price, category }, quantity)
    setQuantity(1)
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  const product = {id, name, description, price, rating, image, category, specs, carbonFootprint, pricingOptions}

  const isCommercialService = category === "Commercial Services" && (name.includes("Goetz & Weingardt") || name.includes("iD Media"))
  const isCleaningService = category === "Commercial Services" && (name.includes("Goetz & Weingardt") || name.includes("iD Media"));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top Product Summary */}
      <div className="border-b pb-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image 
              src={image} 
              alt={name} 
              width={80} 
              height={80} 
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-semibold">{name}</h1>
              <p className="text-sm text-gray-600">{category}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-16 mx-2 text-center"
              />
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {!isCleaningService && (
              <Button 
                variant="default" 
                className="bg-[#4A90E2] text-white hover:bg-[#357ABD]"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="pricing">Editions & Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center items-start">
              <Image 
                src={image} 
                alt={name} 
                width={400} 
                height={300} 
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">{name}</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <Button variant="outline" className="mb-6">
                See Features
              </Button>

              {/* Pricing Card */}
              {isCommercialService && pricingOptions && (
                <CleaningServiceDetail product={{...product, pricingOptions}} />
              )}
              {!isCommercialService && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Price</h3>
                  <p className="text-2xl font-bold">€{price.toFixed(2)}</p>
                </div>
              )}


              {/* Carbon Footprint */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Carbon Footprint</h3>
                <div className="flex items-center mb-2">
                  <Leaf className={`w-5 h-5 mr-2 ${
                    carbonFootprint.value <= carbonFootprint.average * 0.8
                      ? "text-green-500"
                      : carbonFootprint.value <= carbonFootprint.average
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`} />
                  <span className={`font-semibold ${
                    carbonFootprint.value <= carbonFootprint.average * 0.8
                      ? "text-green-500"
                      : carbonFootprint.value <= carbonFootprint.average
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}>
                    {carbonFootprint.value} {carbonFootprint.unit}
                  </span>
                </div>
                <Progress 
                  value={(carbonFootprint.value / carbonFootprint.average) * 100} 
                  className="w-full h-2" 
                />
                <p className="text-sm text-gray-500 mt-1">
                  Average for similar items: {carbonFootprint.average} {carbonFootprint.unit}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Details</h3>
                <div className="text-sm">
                  <p className="font-medium">Categories:</p>
                  <p className="text-gray-600">{category}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features and Benefits</h3>
            <div className="space-y-2">
              <p className="text-gray-600">{specs}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-5 h-5",
                    i < Math.round(rating) 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300"
                  )} 
                />
              ))}
            </div>
            <span className="text-gray-600">({rating.toFixed(1)})</span>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">Standard Edition</p>
              </div>
              <p className="text-xl font-bold">€{price.toFixed(2)}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <Image 
                src="/placeholder.svg" 
                alt="Related Product" 
                width={100} 
                height={100} 
                className="mx-auto mb-2"
              />
              <p className="text-sm font-medium truncate">Related Product {i}</p>
              <p className="text-sm text-gray-600">€{(price * 0.8).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

