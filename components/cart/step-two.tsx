import { useCart } from '../../contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface StepTwoProps {
  onPrevious: () => void
  onNext: () => void
}

export function StepTwo({ onPrevious, onNext }: StepTwoProps) {
  const { items, updateDeliveryAddress } = useCart()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: Confirm Delivery Addresses</h2>
      {items.map((item) => (
        <div key={item.id} className="border-b pb-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-600">Cost Center: {item.costCenter}</p>
          <p className="text-gray-600">Project: {item.project}</p>
          <Input
            type="text"
            placeholder="Delivery Address"
            value={item.deliveryAddress}
            onChange={(e) => updateDeliveryAddress(item.id, e.target.value)}
            className="mt-2 w-full"
          />
        </div>
      ))}
      <div className="mt-8 text-right space-x-4">
        <Button variant="outline" onClick={onPrevious}>Back to Cart</Button>
        <Button onClick={onNext}>Proceed to Review</Button>
      </div>
    </div>
  )
}

