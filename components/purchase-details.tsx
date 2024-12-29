import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface PurchaseDetailsProps {
  id: string
  customer: string
  requestId: string
  status: 'Pending Approval' | 'Submitted' | 'Approved' | 'Processing' | 'Shipped' | 'Delivered'
  dateCreated: string
  total: number
  items: number
  approvalDate?: string
  trackingLink?: string
}

export function PurchaseDetails({ 
  id, 
  customer, 
  requestId, 
  status, 
  dateCreated, 
  total, 
  items,
  approvalDate,
  trackingLink
}: PurchaseDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800'
      case 'Submitted':
        return 'bg-blue-100 text-blue-800'
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Purchase Details</CardTitle>
        <CardDescription>Request ID: {requestId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Status:</span>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Customer:</span>
          <span>{customer}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Date Created:</span>
          <span>{dateCreated}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Total Amount:</span>
          <span>€{total.toLocaleString()},-</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Number of Items:</span>
          <span>{items}</span>
        </div>
        {status === 'Submitted' && (
          <div className="flex justify-between">
            <span className="font-semibold">Approval Pending Since:</span>
            <span>{approvalDate || dateCreated}</span>
          </div>
        )}
        {(status === 'Shipped' || status === 'Delivered') && (
          <div className="flex justify-between items-center">
            <span className="font-semibold">Tracking:</span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/transaction-status/purchases/${id}/tracking`}>
                  View Tracking Details
                </Link>
              </Button>
              {trackingLink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={trackingLink} target="_blank" rel="noopener noreferrer">
                    Carrier's Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

