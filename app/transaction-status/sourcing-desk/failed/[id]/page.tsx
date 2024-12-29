'use client'

import { useParams } from 'next/navigation'
import { ArrowLeft, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

// Mock data for a failed sourcing item
const mockFailedItem = {
  id: '5',
  customer: 'Charlie Davis',
  requestId: '2900684',
  description: 'Custom Software Development',
  status: 'Sourcing Failed',
  dateCreated: '1 December 2024',
  budget: 50000,
  reason: 'No suitable vendors found within the specified budget and timeline.',
  additionalDetails: [
    'Required expertise in niche technologies not readily available',
    'Tight deadline of 3 months not feasible for the scope',
    'Budget constraints limiting potential vendors'
  ],
  recommendedActions: [
    'Revise project scope to focus on core functionalities',
    'Extend the project timeline to attract more potential vendors',
    'Consider increasing the budget to match market rates for custom software development'
  ]
}

export default function SourcingFailedItem() {
  const { id } = useParams()

  // In a real application, we would fetch the item data based on the ID
  // For this example, we'll use the mock data
  const failedItem = mockFailedItem

  return (
    <div className="container mx-auto p-6">
      <Link href="/transaction-status/sourcing-desk" className="flex items-center text-blue-500 hover:text-blue-700 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Sourcing Desk
      </Link>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{failedItem.description}</CardTitle>
              <CardDescription>Request ID: {failedItem.requestId}</CardDescription>
            </div>
            <Badge variant="outline" className="border-red-500 bg-transparent text-red-600">
              {failedItem.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <AlertTriangle className="mr-2 text-red-500" size={20} />
                Reason for Failure:
              </h3>
              <p className="text-red-600">{failedItem.reason}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Additional Details:</h3>
              <ul className="list-disc list-inside space-y-1">
                {failedItem.additionalDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommended Actions:</h3>
              <ul className="list-disc list-inside space-y-1">
                {failedItem.recommendedActions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Customer:</strong> {failedItem.customer}</p>
                <p><strong>Date Created:</strong> {failedItem.dateCreated}</p>
              </div>
              <div>
                <p><strong>Original Budget:</strong> €{failedItem.budget.toLocaleString()},-</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline">
            Revise Request
          </Button>
          <Button>
            Contact Sourcing Team
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

