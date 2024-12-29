'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProcurementDashboard } from "@/components/dashboard/procurement-dashboard"
import { ExecutiveOverview } from "@/components/dashboard/executive-overview"
import { SupplierPerformance } from "@/components/dashboard/supplier-performance"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('executive')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="executive">Executive Overview</TabsTrigger>
          <TabsTrigger value="procurement">Procurement Summary</TabsTrigger>
          <TabsTrigger value="supplier">Supplier Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="executive">
          <ExecutiveOverview />
        </TabsContent>
        <TabsContent value="procurement">
          <ProcurementDashboard />
        </TabsContent>
        <TabsContent value="supplier">
          <SupplierPerformance />
        </TabsContent>
      </Tabs>
    </div>
  )
}

