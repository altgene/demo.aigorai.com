import { useCart } from '../../contexts/cart-context'
import { Button } from '@/components/ui/button'

interface StepThreeProps {
  onPrevious: () => void
  onSubmitForApproval: () => void
}

export function StepThree({ onPrevious, onSubmitForApproval }: StepThreeProps) {
  const { items, getCartTotal } = useCart()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 3: Final Review</h2>
      {items.map((item) => (
        <div key={item.id} className="border-b pb-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-gray-600">Price: €{(item.price * item.quantity).toFixed(2)}</p>
          <p className="text-gray-600">Cost Center: {item.costCenter}</p>
          <p className="text-gray-600">Project: {item.project}</p>
          <p className="text-gray-600">Delivery Address: {item.deliveryAddress}</p>
        </div>
      ))}
      <div className="mt-8">
        <p className="text-2xl font-bold">Total: €{getCartTotal().toFixed(2)}</p>
        <p className="text-sm text-gray-600 mt-2">
          By submitting this order, you are requesting approval from your company's procurement system.
        </p>
      </div>
      <div className="mt-8 text-right space-x-4">
        <Button variant="outline" onClick={onPrevious}>Back to Delivery</Button>
        <Button onClick={onSubmitForApproval}>Submit for Approval</Button>
      </div>
    </div>
  )
}

