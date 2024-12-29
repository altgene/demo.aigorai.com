'use client'

import { useParams } from 'next/navigation'
import { ProductDetail } from '../../../components/product-detail'
import { products } from '../../../data/products'

export default function ProductPage() {
  const params = useParams()
  const productId = parseInt(params.id as string, 10)

  // Find the product in our data
  const product = products.find(p => p.id === productId)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail {...product} />
    </div>
  )
}

