'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface ServiceDetail {
  hours: number;
  area: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time';
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  costCenter: string
  deliveryAddress: string
  project: string
  status?: string
  category: string
  pricingOptions?: {
    areaBased: Array<{ unit: string; price: number }>
    timeBased: Array<{ unit: string; price: number }>
    frequencyBased: Array<{ unit: string; multiplier: number }>
    area: { unit: string; value: number }
    time: { unit: string; value: number }
    frequency: string
  }
  serviceDetails?: Record<string, ServiceDetail> |{
    hours: number;
    area: number;
    frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time';
  }
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity' | 'costCenter' | 'deliveryAddress' | 'project'>, quantity: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  updateCostCenter: (id: number, costCenter: string) => void
  updateDeliveryAddress: (id: number, deliveryAddress: string) => void
  updateProject: (id: number, project: string) => void
  clearCart: () => void
  getCartCount: () => number
  getCartTotal: () => number
  approvalStatus: 'not_submitted' | 'pending' | 'approved' | 'rejected'
  setApprovalStatus: (status: 'not_submitted' | 'pending' | 'approved' | 'rejected') => void
  orderPlaced: boolean
  setOrderPlaced: (placed: boolean) => void
  submitForApproval: () => void;
  updatePricingOptions: (id: number, options: Partial<CartItem['pricingOptions']>) => void;
  updateServiceOptions: (id: number, options: {
    area?: { value: number; unit: string };
    time?: { value: number; unit: string };
    frequency?: string;
  }) => void;
  updateCleaningServiceDetails: (id: number, details: {
    hours?: number;
    area?: number;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time';
  }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [approvalStatus, setApprovalStatus] = useState<'not_submitted' | 'pending' | 'approved' | 'rejected'>('not_submitted')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const addToCart = useCallback((newItem: Omit<CartItem, 'quantity' | 'costCenter' | 'deliveryAddress' | 'project'>, quantity: number) => {
    setOrderPlaced(false)
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      const cartItem: CartItem = {
        ...newItem,
        quantity,
        costCenter: '',
        deliveryAddress: '',
        project: '',
      }
      if (newItem.category === 'Commercial Services' && newItem.pricingOptions) {
        cartItem.pricingOptions = {
          ...newItem.pricingOptions,
          area: { unit: newItem.pricingOptions.areaBased[0].unit, value: 1 },
          time: { unit: newItem.pricingOptions.timeBased[0].unit, value: 1 },
          frequency: newItem.pricingOptions.frequencyBased[0].unit
        }
      }
      return [...prevItems, cartItem]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    )
  }, [])

  const updateCostCenter = useCallback((id: number, costCenter: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, costCenter } : item
      )
    )
  }, [])

  const updateDeliveryAddress = useCallback((id: number, deliveryAddress: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, deliveryAddress } : item
      )
    )
  }, [])

  const updateProject = useCallback((id: number, project: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, project } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setApprovalStatus('not_submitted')
  }, [])

  const getCartCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => {
      if (item.category === 'Commercial Services' && item.serviceDetails) {
        const { hours = 0, area = 0, frequency } = item.serviceDetails;
        const hourlyRate = 30; // Assuming a fixed hourly rate
        const areaRate = 1.08; // Assuming a fixed rate per square meter
        const frequencyMultiplier = 
          frequency === 'weekly' ? 0.9 :
          frequency === 'bi-weekly' ? 0.95 :
          frequency === 'monthly' ? 0.85 : 1;
        
        const servicePrice = (hourlyRate * Number(hours) + areaRate * Number(area)) * frequencyMultiplier;
        return total + servicePrice * item.quantity;
      }
      return total + item.price * item.quantity;
    }, 0);
  }, [items]);

  const submitForApproval = useCallback(() => {
    // Here you would typically send the cart items to your backend
    // For now, we'll just update the local state
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, status: 'Pending Approval' }))
    );
    setApprovalStatus('pending');
    setOrderPlaced(true);
  }, [setApprovalStatus, setOrderPlaced]);

  const updatePricingOptions = useCallback((id: number, options: Partial<CartItem['pricingOptions']>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.pricingOptions
          ? { ...item, pricingOptions: { ...item.pricingOptions, ...options } }
          : item
      )
    )
  }, [])

  const updateServiceOptions = useCallback((id: number, options: {
    area?: { value: number; unit: string };
    time?: { value: number; unit: string };
    frequency?: string;
  }) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.pricingOptions
          ? {
              ...item,
              pricingOptions: {
                ...item.pricingOptions,
                area: options.area || item.pricingOptions.area,
                time: options.time || item.pricingOptions.time,
                frequency: options.frequency || item.pricingOptions.frequency,
              },
            }
          : item
      )
    );
  }, []);

  const updateCleaningServiceDetails = useCallback((id: number, details: {
    hours?: number;
    area?: number;
    frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time';
  }) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.category === "Commercial Services"
          ? {
              ...item,
              serviceDetails: {
                hours: details.hours ?? (item.serviceDetails as ServiceDetail)?.hours ?? 0,
                area: details.area ?? (item.serviceDetails as ServiceDetail)?.area ?? 0,
                frequency: details.frequency ?? (item.serviceDetails as ServiceDetail)?.frequency ?? 'one-time'
              } as ServiceDetail
            } as CartItem
          : item
      )
    );
  }, []);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCostCenter,
      updateDeliveryAddress,
      updateProject,
      clearCart,
      getCartCount,
      getCartTotal,
      approvalStatus,
      setApprovalStatus,
      orderPlaced,
      setOrderPlaced,
      submitForApproval,
      updatePricingOptions,
      updateServiceOptions,
      updateCleaningServiceDetails
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

