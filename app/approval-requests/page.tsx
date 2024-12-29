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

interface ApprovalRequest {
  customer: string
  requestId: string
  status: 'Submitted' | 'Approved' | 'Rejected'
  dateCreated: string
  total: number
  items: number
}

const initialRequests: ApprovalRequest[] = [
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

export default function ApprovalRequests() {
  const [showFilters, setShowFilters] = useState(false)
  const [requests, setRequests] = useState(initialRequests)
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-600 hover:bg-blue-100/80'
      case 'Approved':
        return 'bg-green-100 text-green-600 hover:bg-green-100/80'
      case 'Rejected':
        return 'bg-red-100 text-red-600 hover:bg-red-100/80'
      default:
        return 'bg-gray-100 text-gray-600 hover:bg-gray-100/80'
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
            >
              {showFilters ? 'Hide filters' : 'Show filters'}
            </Button>
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search requests..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {showFilters && (
            <div className="p-4 border-b bg-gray-50">
              {/* Add filter controls here */}
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
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.customer}</div>
                      <div className="text-sm text-gray-500">{request.items} item</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(request.status)}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.dateCreated}</TableCell>
                  <TableCell className="text-right">€{request.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
            Sourcing Desk
          </Button>
          <Button variant="outline" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
            Purchases
          </Button>
          <Button variant="outline" className="bg-[#4A90E2] text-white hover:bg-[#357ABD]">
            Returns
          </Button>
        </div>
      </div>
    </div>
  )
}

