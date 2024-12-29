'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react'

interface PurchaseDetail {
  id: string
  customer: string
  requestId: string
  status: 'Pending Approval' | 'Submitted' | 'Approved' | 'Processing' | 'Shipped' | 'Delivered' | 'Rejected'
  dateCreated: string
  total: number
  items: {
    name: string
    quantity: number
    price: number
  }[]
  issues?: string[]
}

// This is a mock function to simulate fetching purchase data
// In a real application, you would fetch this data from your API
const fetchPurchaseData = (id: string): Promise<PurchaseDetail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        customer: 'John Doe',
        requestId: `REQ-${id}`,
        status: 'Processing',
        dateCreated: '2023-06-15',
        total: 1500,
        items: [
          { name: 'Laptop', quantity: 1, price: 1200 },
          { name: 'Mouse', quantity: 2, price: 150 }
        ],
        issues: id === '3' ? ['Item out of stock', 'Delayed shipping'] : undefined
      })
    }, 1000)
  })
}

export default function PurchaseDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [purchase, setPurchase] = useState<PurchaseDetail | null>(null)

  useEffect(() => {
    if (id) {
      fetchPurchaseData(id as string).then(setPurchase)
    }
  }, [id])

  if (!purchase) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800'
      case 'Submitted':
        return 'bg-blue-100 text-blue-800'
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Processing':
        return 'bg-purple-100 text-purple-800'
      case 'Shipped':
        return 'bg-indigo-100 text-indigo-800'
      case 'Delivered':
        return 'bg-gray-100 text-gray-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Purchases
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Purchase Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <Badge className={getStatusColor(purchase.status)}>{purchase.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Customer:</span>
                <p>{purchase.customer}</p>
              </div>
              <div>
                <span className="font-semibold">Request ID:</span>
                <p>{purchase.requestId}</p>
              </div>
              <div>
                <span className="font-semibold">Date Created:</span>
                <p>{purchase.dateCreated}</p>
              </div>
              <div>
                <span className="font-semibold">Total Amount:</span>
                <p>€{purchase.total.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="list-disc list-inside">
                {purchase.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}, Price: €{item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            {purchase.issues && purchase.issues.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Issues:</h3>
                <ul className="list-disc list-inside text-red-600">
                  {purchase.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

