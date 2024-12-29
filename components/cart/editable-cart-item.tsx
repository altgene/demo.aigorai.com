import { useState, useEffect } from 'react'
import { useCart } from '../../contexts/cart-context'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from 'lucide-react'

interface ServiceDetail {
  hours: number;
  area: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time';
}


interface EditableCartItemProps {
  id: number
  name: string
  price: number
  quantity: number
  category: string
  serviceDetails?: Record<string, ServiceDetail> |{
    hours: number;
    area: number;
    frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time';
  },
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  updateCleaningServiceDetails: (id: number, details: { hours: number, area: number, frequency: string }) => void
  updateCostCenter: (id: number, costCenter: string) => void
  updateProject: (id: number, project: string) => void
  updateServiceOptions: (id: number, options: {

    area?: { value: number; unit: string };

    time?: { value: number; unit: string };

    frequency?: string;

  }) => void;
}

export function EditableCartItem({ id, name, price, quantity, category, serviceDetails }: EditableCartItemProps) {
  const { updateQuantity, removeFromCart, updateCleaningServiceDetails } = useCart()
  const [localQuantity, setLocalQuantity] = useState(quantity)
  const [localHours, setLocalHours] = useState(typeof serviceDetails?.hours === 'number' ? serviceDetails.hours : 0)
  const [localArea, setLocalArea] = useState(typeof serviceDetails?.area === 'number' ? serviceDetails.area : 0)
  const [localFrequency, setLocalFrequency] = useState<'weekly' | 'bi-weekly' | 'monthly' | 'one-time' | undefined>((serviceDetails?.frequency as 'weekly' | 'bi-weekly' | 'monthly' | 'one-time') || undefined)

  useEffect(() => {
    updateQuantity(id, localQuantity)
  }, [localQuantity, id, updateQuantity])

  useEffect(() => {
    if (category === "Commercial Services") {
      updateCleaningServiceDetails(id, {
        hours: localHours,
        area: localArea,
        frequency: localFrequency,
      })
    }
  }, [localHours, localArea, localFrequency, id, category, updateCleaningServiceDetails])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value)
    setLocalQuantity(isNaN(newQuantity) ? 1 : Math.max(1, newQuantity))
  }

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = parseInt(e.target.value)
    setLocalHours(isNaN(newHours) ? 0 : Math.max(0, newHours))
  }

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArea = parseInt(e.target.value)
    setLocalArea(isNaN(newArea) ? 0 : Math.max(0, newArea))
  }

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">€{price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center space-x-4">
        {category === "Commercial Services" ? (
          <>
            <div className="flex flex-col items-start space-y-2">
              <label htmlFor={`hours-${id}`} className="text-sm">Hours:</label>
              <Input
                id={`hours-${id}`}
                type="number"
                min="0"
                value={localHours}
                onChange={handleHoursChange}
                className="w-20"
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label htmlFor={`area-${id}`} className="text-sm">Area (sq m):</label>
              <Input
                id={`area-${id}`}
                type="number"
                min="0"
                value={localArea}
                onChange={handleAreaChange}
                className="w-20"
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <label htmlFor={`frequency-${id}`} className="text-sm">Frequency:</label>
              <Select value={localFrequency} onValueChange={(value) => setLocalFrequency(value as 'weekly' | 'bi-weekly' | 'monthly' | 'one-time')}>
                <SelectTrigger id={`frequency-${id}`} className="w-[120px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One Time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor={`quantity-${id}`} className="text-sm">Quantity:</label>
            <Input
              id={`quantity-${id}`}
              type="number"
              min="1"
              value={localQuantity}
              onChange={handleQuantityChange}
              className="w-20"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

