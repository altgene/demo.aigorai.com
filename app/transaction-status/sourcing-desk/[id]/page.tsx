'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react'

interface SourcingDetail {
  id: string
  customer: string
  requestId: string
  status: 'Sourcing Request' | 'Approved' | 'Sourcing Ongoing' | 'Sourcing Successful' | 'Sourcing Failed'
  dateCreated: string
  budget: number
  description: string
  items?: {
    name: string
    quantity: number
    estimatedPrice: number
  }[]
  issues?: string[]
  approvalDate?: string
  estimatedCompletionDate?: string
  sourcingAgent?: string
  achievedPrice?: number
  potentialSuppliers?: string[]
  rejectionReason?: string
  approvalPending?: boolean
  requestDetails?: string
  approvedBy?: string
  ongoingActivities?: string[]
}

const fetchSourcingData = (id: string): Promise<SourcingDetail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseData = {
        id,
        customer: 'Jane Smith',
        requestId: `SREQ-${id}`,
        dateCreated: '2023-06-18',
        budget: 5000,
        description: 'High-performance workstation setup',
        items: [
          { name: 'Custom PC', quantity: 1, estimatedPrice: 3500 },
          { name: '4K Monitor', quantity: 2, estimatedPrice: 600 }
        ],
      };

      let specificData: Partial<SourcingDetail> = {};

      switch(id) {
        case '1':
          specificData = {
            status: 'Sourcing Request',
            approvalPending: true,
            requestDetails: 'Awaiting initial review and approval',
          };
          break;
        case '2':
          specificData = {
            status: 'Approved',
            approvalDate: '2023-06-19',
            approvedBy: 'John Doe',
            estimatedCompletionDate: '2023-07-02',
          };
          break;
        case '3':
          specificData = {
            status: 'Sourcing Ongoing',
            approvalDate: '2023-06-19',
            estimatedCompletionDate: '2023-07-02',
            sourcingAgent: 'Alex Johnson',
            ongoingActivities: ['Contacting suppliers', 'Comparing quotes', 'Negotiating terms'],
            potentialSuppliers: ['TechCorp', 'ElectroSystems', 'PCMasters'],
          };
          break;
        case '4':
          specificData = {
            status: 'Sourcing Successful',
            approvalDate: '2023-06-19',
            sourcingAgent: 'Alex Johnson',
            achievedPrice: 4800,
            potentialSuppliers: ['TechCorp', 'ElectroSystems', 'PCMasters'],
          };
          break;
        case '5':
          specificData = {
            status: 'Sourcing Failed',
            approvalDate: '2023-06-19',
            sourcingAgent: 'Alex Johnson',
            rejectionReason: 'Budget constraints and unavailable components',
            issues: ['Specific GPU model unavailable', 'Potential delay in assembly'],
          };
          break;
      }

      resolve({...baseData, ...specificData} as SourcingDetail);
    }, 1000)
  })
}

export default function SourcingDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const [sourcing, setSourcing] = useState<SourcingDetail | null>(null)

  useEffect(() => {
    if (id) {
      fetchSourcingData(id as string).then(setSourcing)
    }
  }, [id])

  if (!sourcing) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sourcing Request':
        return 'bg-blue-100 text-blue-800'
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Sourcing Ongoing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Sourcing Successful':
        return 'bg-green-100 text-green-800'
      case 'Sourcing Failed':
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
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sourcing Desk
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Sourcing Request Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <Badge className={getStatusColor(sourcing.status)}>{sourcing.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Customer:</span>
                <p>{sourcing.customer}</p>
              </div>
              <div>
                <span className="font-semibold">Request ID:</span>
                <p>{sourcing.requestId}</p>
              </div>
              <div>
                <span className="font-semibold">Date Created:</span>
                <p>{sourcing.dateCreated}</p>
              </div>
              <div>
                <span className="font-semibold">Budget:</span>
                <p>€{sourcing.budget.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <span className="font-semibold">Description:</span>
              <p>{sourcing.description}</p>
            </div>

            {sourcing.approvalPending && (
              <div>
                <span className="font-semibold">Approval Status:</span>
                <p>Pending</p>
              </div>
            )}

            {sourcing.requestDetails && (
              <div>
                <span className="font-semibold">Request Details:</span>
                <p>{sourcing.requestDetails}</p>
              </div>
            )}

            {sourcing.approvalDate && (
              <div>
                <span className="font-semibold">Approval Date:</span>
                <p>{sourcing.approvalDate}</p>
              </div>
            )}

            {sourcing.approvedBy && (
              <div>
                <span className="font-semibold">Approved By:</span>
                <p>{sourcing.approvedBy}</p>
              </div>
            )}

            {sourcing.estimatedCompletionDate && (
              <div>
                <span className="font-semibold">Estimated Completion Date:</span>
                <p>{sourcing.estimatedCompletionDate}</p>
              </div>
            )}

            {sourcing.sourcingAgent && (
              <div>
                <span className="font-semibold">Sourcing Agent:</span>
                <p>{sourcing.sourcingAgent}</p>
              </div>
            )}

            {sourcing.ongoingActivities && sourcing.ongoingActivities.length > 0 && (
              <div>
                <span className="font-semibold">Ongoing Activities:</span>
                <ul className="list-disc list-inside">
                  {sourcing.ongoingActivities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            )}

            {sourcing.achievedPrice && (
              <div>
                <span className="font-semibold">Achieved Price:</span>
                <p>€{sourcing.achievedPrice.toFixed(2)}</p>
              </div>
            )}

            {sourcing.potentialSuppliers && sourcing.potentialSuppliers.length > 0 && (
              <div>
                <span className="font-semibold">Potential Suppliers:</span>
                <ul className="list-disc list-inside">
                  {sourcing.potentialSuppliers.map((supplier, index) => (
                    <li key={index}>{supplier}</li>
                  ))}
                </ul>
              </div>
            )}

            {sourcing.rejectionReason && (
              <div>
                <span className="font-semibold">Rejection Reason:</span>
                <p className="text-red-600">{sourcing.rejectionReason}</p>
              </div>
            )}

            {sourcing.items && (
              <div>
                <h3 className="font-semibold mb-2">Requested Items:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {sourcing.items.map((item, index) => (
                    <li key={index}>
                      <div className="flex items-center justify-between">
                        <span>{item.name} - Quantity: {item.quantity}, Estimated Price: €{item.estimatedPrice.toFixed(2)}</span>
                        {sourcing.status === 'Sourcing Successful' && (
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Add to Catalogue</Button>
                            <Button variant="default" size="sm">Add to Cart</Button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sourcing.issues && sourcing.issues.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Issues:</h3>
                <ul className="list-disc list-inside text-red-600">
                  {sourcing.issues.map((issue, index) => (
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

