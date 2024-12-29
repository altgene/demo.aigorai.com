'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SideNavigation } from '../../../components/side-navigation'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/cart-context'; // Import useCart

interface Purchase {
  id: string
  customer: string
  requestId: string
  status: 'Submitted' | 'Approved' | 'Processing' | 'Shipped' | 'Delivered' | 'Pending Approval' // Added 'Pending Approval'
  dateCreated: string
  total: number
  items: number
}

const initialPurchases: Purchase[] = [
  {
    id: '1',
    customer: 'John Carpenter',
    requestId: '2900678',
    status: 'Pending Approval',
    dateCreated: '2 min ago',
    total: 2000,
    items: 1
  },
  {
    id: '2',
    customer: 'Jane Smith',
    requestId: '2900679',
    status: 'Approved',
    dateCreated: '1 day ago',
    total: 3500,
    items: 2
  },
  {
    id: '3',
    customer: 'Bob Johnson',
    requestId: '2900680',
    status: 'Processing',
    dateCreated: '3 days ago',
    total: 1500,
    items: 1
  },
  {
    id: '4',
    customer: 'Alice Brown',
    requestId: '2900681',
    status: 'Shipped',
    dateCreated: '1 week ago',
    total: 5000,
    items: 3
  },
  {
    id: '5',
    customer: 'Charlie Davis',
    requestId: '2900682',
    status: 'Delivered',
    dateCreated: '2 weeks ago',
    total: 2500,
    items: 2
  }
]

export default function Purchases() {
  const [showFilters, setShowFilters] = useState(false)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { items } = useCart(); // Use cart items

  useEffect(() => {
    // Simulating API call to fetch purchases
    setTimeout(() => {
      const cartItems = items.map((item, index) => ({
        id: `cart-${index + 1}`,
        customer: 'Current User', // You might want to replace this with actual user info
        requestId: `REQ-${Date.now()}-${index + 1}`,
        status: 'Pending Approval' as const,
        dateCreated: new Date().toISOString(),
        total: item.price * item.quantity,
        items: item.quantity
      }));
      setPurchases([...initialPurchases, ...cartItems]);
    }, 1000);
  }, [items]);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return 'border border-yellow-500 bg-transparent text-yellow-600'
      case 'Submitted':
        return 'border border-blue-500 bg-transparent text-blue-600'
      case 'Approved':
        return 'border border-green-500 bg-transparent text-green-600'
      case 'Processing':
        return 'border border-yellow-500 bg-transparent text-yellow-600'
      case 'Shipped':
        return 'border border-purple-500 bg-transparent text-purple-600'
      case 'Delivered':
        return 'border border-gray-500 bg-transparent text-gray-600'
      default:
        return 'border border-gray-500 bg-transparent text-gray-600'
    }
  }

  const filteredPurchases = purchases.filter(purchase =>
    purchase.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.requestId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Purchases</h1>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-9"
          >
            {showFilters ? 'Hide filters' : 'Show filters'}
          </Button>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {showFilters && (
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm text-gray-500">Filter options will be added here</p>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer and Request ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date created</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPurchases.map((purchase) => (
              <TableRow 
                key={purchase.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => router.push(`/transaction-status/purchases/${purchase.id}`)}
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{purchase.customer}</div>
                    <div className="text-sm text-gray-500">{purchase.requestId} ({purchase.items} item{purchase.items > 1 ? 's' : ''})</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={getStatusBadgeStyle(purchase.status)}
                  >
                    {purchase.status}
                  </Badge>
                </TableCell>
                <TableCell>{purchase.dateCreated}</TableCell>
                <TableCell className="text-right">€{purchase.total.toLocaleString()},-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex gap-4">
        <Button variant="outline" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
          Approval Request
        </Button>
        <Button variant="outline" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
          Purchase Orders
        </Button>
        <Button variant="outline" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
          Sourcing Requests
        </Button>
        <Button variant="outline" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
          Returns
        </Button>
      </div>
    </div>
  )
}

