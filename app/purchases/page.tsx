'use client'

import { useState } from 'react'
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
import { SideNavigation } from '../../components/side-navigation'

interface Purchase {
  customer: string
  requestId: string
  status: 'Submitted' | 'Approved' | 'Rejected'
  dateCreated: string
  total: number
  items: number
}

const initialPurchases: Purchase[] = [
  {
    customer: 'John Carpenter',
    requestId: '2900678',
    status: 'Submitted',
    dateCreated: '2 min ago',
    total: 2000,
    items: 1
  },
  {
    customer: 'John Carpenter',
    requestId: '2900678',
    status: 'Approved',
    dateCreated: '14 November 2024',
    total: 2000,
    items: 1
  },
]

export default function Purchases() {
  const [showFilters, setShowFilters] = useState(false)
  const [purchases, setPurchases] = useState(initialPurchases)
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'border border-blue-500 bg-transparent text-blue-600'
      case 'Approved':
        return 'border border-green-500 bg-transparent text-green-600'
      case 'Rejected':
        return 'border border-red-500 bg-transparent text-red-600'
      default:
        return 'border border-gray-500 bg-transparent text-gray-600'
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <div className="w-64 p-6 flex-shrink-0">
        <SideNavigation />
      </div>
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-9"
            >
              Show filters
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
              {purchases.map((purchase, index) => (
                <TableRow key={index} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{purchase.customer} {purchase.requestId}</div>
                      <div className="text-sm text-gray-500">{purchase.items} item</div>
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
    </div>
  )
}

