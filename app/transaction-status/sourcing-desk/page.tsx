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
import { useRouter } from 'next/navigation'

interface SourcingRequest {
  id: string
  customer: string
  requestId: string
  description: string
  status: 'Sourcing Request' | 'Approved' | 'Sourcing Ongoing' | 'Sourcing Successful' | 'Sourcing Failed'
  dateCreated: string
  budget: number
}

const initialRequests: SourcingRequest[] = [
  {
    id: '1',
    customer: 'John Carpenter',
    requestId: '2900678',
    description: 'Conference Organization',
    status: 'Sourcing Request',
    dateCreated: '2 min ago',
    budget: 152000
  },
  {
    id: '2',
    customer: 'Jane Smith',
    requestId: '2900681',
    description: 'Compressor',
    status: 'Approved',
    dateCreated: '7 November 2024',
    budget: 13000
  },
  {
    id: '3',
    customer: 'Bob Johnson',
    requestId: '2900682',
    description: 'Business BI',
    status: 'Sourcing Ongoing',
    dateCreated: '5 December 2024',
    budget: 7500
  },
  {
    id: '4',
    customer: 'Alice Brown',
    requestId: '2900683',
    description: 'Servers',
    status: 'Sourcing Successful',
    dateCreated: '14 November 2024',
    budget: 11000
  },
  {
    id: '5',
    customer: 'Charlie Davis',
    requestId: '2900684',
    description: 'Custom Software',
    status: 'Sourcing Failed',
    dateCreated: '1 December 2024',
    budget: 50000
  }
]

export default function SourcingDesk() {
  const [showFilters, setShowFilters] = useState(false)
  const [requests, setRequests] = useState<SourcingRequest[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Simulating API call to fetch sourcing requests
    setTimeout(() => {
      setRequests(initialRequests)
    }, 1000)
  }, [])

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Sourcing Request':
        return 'border border-blue-500 bg-transparent text-blue-600'
      case 'Approved':
        return 'border border-green-500 bg-transparent text-green-600'
      case 'Sourcing Ongoing':
        return 'border border-yellow-500 bg-transparent text-yellow-600'
      case 'Sourcing Successful':
        return 'border border-purple-500 bg-transparent text-purple-600'
      case 'Sourcing Failed':
        return 'border border-red-500 bg-transparent text-red-600'
      default:
        return 'border border-gray-500 bg-transparent text-gray-600'
    }
  }

  const filteredRequests = requests.filter(request =>
    request.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRowClick = (request: SourcingRequest) => {
    router.push(`/transaction-status/sourcing-desk/${request.id}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sourcing Desk</h1>
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
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date created</TableHead>
              <TableHead className="text-right">Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow 
                key={request.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(request)}
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{request.customer}</div>
                    <div className="text-sm text-gray-500">{request.requestId}</div>
                  </div>
                </TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={getStatusBadgeStyle(request.status)}
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>{request.dateCreated}</TableCell>
                <TableCell className="text-right">€ {request.budget.toLocaleString()},-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

