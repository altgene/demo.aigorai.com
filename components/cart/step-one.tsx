'use client'

import { useState } from 'react'
import { useCart } from '../../contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from 'lucide-react'
import { EditableCartItem } from './editable-cart-item'


export interface EditableCartItemProps {

  id: number

  name: string

  price: number

  quantity: number

  category: string

  serviceDetails?: {

    hours?: number

    area?: number

    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time'

  }

  removeFromCart: (id: number) => void

  updateQuantity: (id: number, quantity: number) => void

  updateCostCenter: (id: number, costCenter: string) => void

  updateProject: (id: number, project: string) => void

  updateServiceOptions: (id: number, options: any) => void

  updateCleaningServiceDetails: (id: number, details: { hours?: number; area?: number; frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time' }) => void

}

interface StepOneProps {
  onNext: () => void
}

export function StepOne({ onNext }: StepOneProps) {
  const { items, removeFromCart, updateQuantity, updateCostCenter, updateProject, getCartTotal, updateServiceOptions, updateCleaningServiceDetails } = useCart()


  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 1: Review and Update Items</h2>
      {items.map((item) => (
        <EditableCartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          category={item.category}
          serviceDetails={item.serviceDetails}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          updateCostCenter={updateCostCenter}
          updateProject={updateProject}
          updateServiceOptions={updateServiceOptions}
          updateCleaningServiceDetails={(id, details) => {
            updateCleaningServiceDetails(id, {
              hours: details.hours || 0,
              area: details.area || 0,
              frequency: (details.frequency as 'weekly' | 'bi-weekly' | 'monthly' | 'one-time') || 'one-time'
            })
          }}
        />
      ))}
      <div className="mt-8 text-right">
        <p className="text-2xl font-bold">Total: €{getCartTotal().toFixed(2)}</p>
        <Button className="mt-4" onClick={onNext}>Proceed to Delivery</Button>
      </div>
    </div>
  )
}

