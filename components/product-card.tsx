'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  pricingOptions?: {
    areaBased: Array<{ price: number; unit: string }>;
    timeBased: Array<{ price: number; unit: string }>;
    frequencyBased?: Array<{ unit: string; multiplier: number }>;
    serviceTypes?: Array<{ type: string; description: string }>;
  };
  isGridView?: boolean
  addToCart: (product: {id: number, name: string, price: number, category: string}, quantity: number) => void;
}

export function ProductCard({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  category,
  pricingOptions,
  isGridView = true,
  addToCart
}: ProductCardProps) {
  const isCommercialService = category === 'Commercial Services'

  const renderPricing = () => {
    if (isCommercialService && pricingOptions) {
      const lowestPrice = Math.min(
        ...pricingOptions.areaBased.map(option => option.price),
        ...pricingOptions.timeBased.map(option => option.price)
      )
      return (
        <div>
          <span className="text-sm text-gray-600">Starting from</span>
          <br />
          <span className="font-semibold">€{lowestPrice.toFixed(2)}</span>
        </div>
      )
    }
    return <span>€{price.toFixed(2)}</span>
  }

  const renderActionButton = () => {
    if (isCommercialService) {
      return (
        <Link href={`/product/${id}`}>
          <Button variant="default" size="sm">View Details</Button>
        </Link>
      )
    }
    return (
      <Button variant="default" size="sm" onClick={() => addToCart({ id, name, price, category }, 1)}>
        Add to Cart
      </Button>
    )
  }

  if (isGridView) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <Link href={`/product/${id}`} className="block">
          <div className="relative h-48 mb-4">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {renderPricing()}
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox id={`compare-${id}`} />
            <span className="text-sm">Compare</span>
          </label>
        </div>
        <div className="mt-2">
          {renderActionButton()}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
      <Link href={`/product/${id}`} className="w-48 relative">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="object-contain"
        />
      </Link>
      <div className="flex-1">
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold mb-2">{name}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {renderPricing()}
          </div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox id={`compare-list-${id}`} />
            <span className="text-sm">Compare</span>
          </label>
        </div>
        <div className="mt-2">
          {renderActionButton()}
        </div>
      </div>
    </div>
  )
}

