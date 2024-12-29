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

interface Return {
  id: string
  customer: string
  returnId: string
  reason: string
  status: 'Requested' | 'Approved' | 'In Transit' | 'Received' | 'Processed' | 'Refunded'
  dateCreated: string
  amount: number
}

const initialReturns: Return[] = [
  {
    id: '1',
    customer: 'John Carpenter',
    returnId: 'R2900678',
    reason: 'Wrong item received',
    status: 'Requested',
    dateCreated: '2 min ago',
    amount: 2000
  },
  {
    id: '2',
    customer: 'Jane Smith',
    returnId: 'R2900679',
    reason: 'Item damaged',
    status: 'Approved',
    dateCreated: '1 day ago',
    amount: 3500
  },
  {
    id: '3',
    customer: 'Bob Johnson',
    returnId: 'R2900680',
    reason: 'No longer needed',
    status: 'In Transit',
    dateCreated: '3 days ago',
    amount: 1500
  },
  {
    id: '4',
    customer: 'Alice Brown',
    returnId: 'R2900681',
    reason: 'Defective product',
    status: 'Received',
    dateCreated: '1 week ago',
    amount: 5000
  },
  {
    id: '5',
    customer: 'Charlie Davis',
    returnId: 'R2900682',
    reason: 'Changed mind',
    status: 'Refunded',
    dateCreated: '2 weeks ago',
    amount: 2500
  }
]

export default function Returns() {
  const [showFilters, setShowFilters] = useState(false)
  const [returns, setReturns] = useState<Return[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Simulating API call to fetch returns
    setTimeout(() => {
      setReturns(initialReturns)
    }, 1000)
  }, [])

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Requested':
        return 'border border-blue-500 bg-transparent text-blue-600'
      case 'Approved':
        return 'border border-green-500 bg-transparent text-green-600'
      case 'In Transit':
        return 'border border-yellow-500 bg-transparent text-yellow-600'
      case 'Received':
        return 'border border-purple-500 bg-transparent text-purple-600'
      case 'Processed':
        return 'border border-orange-500 bg-transparent text-orange-600'
      case 'Refunded':
        return 'border border-gray-500 bg-transparent text-gray-600'
      default:
        return 'border border-gray-500 bg-transparent text-gray-600'
    }
  }

  const filteredReturns = returns.filter(returnItem =>
    returnItem.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    returnItem.returnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    returnItem.reason.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Returns</h1>
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
              <TableHead>Customer and Return ID</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date created</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReturns.map((returnItem) => (
              <TableRow key={returnItem.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium">{returnItem.customer}</div>
                    <div className="text-sm text-gray-500">{returnItem.returnId}</div>
                  </div>
                </TableCell>
                <TableCell>{returnItem.reason}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={getStatusBadgeStyle(returnItem.status)}
                  >
                    {returnItem.status}
                  </Badge>
                </TableCell>
                <TableCell>{returnItem.dateCreated}</TableCell>
                <TableCell className="text-right">€{returnItem.amount.toLocaleString()},-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

