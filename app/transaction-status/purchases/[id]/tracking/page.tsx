'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Truck, Calendar } from 'lucide-react'

interface TrackingInfo {
  requestId: string
  currentLocation: string
  expectedDelivery: string
  status: string
  updates: {
    date: string
    location: string
    status: string
  }[]
}

const fetchTrackingInfo = (requestId: string): Promise<TrackingInfo> => {
  // Simulating API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        requestId: requestId,
        currentLocation: "Amsterdam, Netherlands",
        expectedDelivery: "June 25, 2023",
        status: "In Transit",
        updates: [
          { date: "June 22, 2023", location: "Amsterdam, Netherlands", status: "Departed Sorting Facility" },
          { date: "June 21, 2023", location: "Rotterdam, Netherlands", status: "Arrived at Sorting Facility" },
          { date: "June 20, 2023", location: "Berlin, Germany", status: "Shipped" },
        ]
      })
    }, 1000)
  })
}

export default function TrackingPage() {
  const router = useRouter()
  const { id } = useParams()
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)

  useEffect(() => {
    if (id) {
      fetchTrackingInfo(id as string).then(setTrackingInfo)
    }
  }, [id])

  if (!trackingInfo) {
    return <div className="flex justify-center items-center h-screen">Loading tracking information...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Tracking Information for {trackingInfo.requestId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="font-medium">{trackingInfo.currentLocation}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Calendar className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Expected Delivery</p>
              <p className="font-medium">{trackingInfo.expectedDelivery}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Truck className="h-6 w-6 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{trackingInfo.status}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Tracking Updates</h3>
            <div className="space-y-4">
              {trackingInfo.updates.map((update, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-4 h-4 mt-1 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">{update.status}</p>
                    <p className="text-sm text-gray-500">{update.location}</p>
                    <p className="text-sm text-gray-500">{update.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

