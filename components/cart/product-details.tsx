import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProductDetailsProps {
  image: string
  pricePerUnit: number
  shippingAddress: {
    street: string
    city: string
    postcode: string
  }
  costCenter: string
  onRemove: () => void
  onEditAddress: () => void
}

export function ProductDetails({
  image,
  pricePerUnit,
  shippingAddress,
  costCenter,
  onRemove,
  onEditAddress,
}: ProductDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-end">
        <button
          onClick={onRemove}
          className="text-red-500 text-sm hover:text-red-700"
        >
          Remove
        </button>
      </div>
      
      <div className="flex justify-center mb-6">
        <Image
          src={image}
          alt="Product"
          width={300}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total units</span>
          <div className="flex items-center gap-2">
            <span>€{pricePerUnit}/unit</span>
            <Input
              type="number"
              defaultValue={1}
              className="w-20 text-right"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-600">Shipping Details</span>
            <button
              onClick={onEditAddress}
              className="text-blue-500 text-sm hover:text-blue-700"
            >
              Edit Address
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p>{shippingAddress.street}</p>
            <p>{shippingAddress.city}</p>
            <p>{shippingAddress.postcode}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <span className="text-gray-600">Cost Center</span>
          <div className="bg-gray-50 p-3 rounded mt-2">
            {costCenter}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xl font-semibold">Due now</span>
            <span className="text-xl">€ 2.000,-</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Price reflects one-time and prorated recurring charges, if applicable.</p>
            <p>• Price includes shipping cost.</p>
            <p>• VAT exclusive.</p>
          </div>
        </div>

        <Button className="w-full">Next</Button>
      </div>
    </div>
  )
}

