'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CostSavings } from "@/components/performance-metrics/cost-savings"
import { ProcurementCycleTime } from "@/components/performance-metrics/procurement-cycle-time"
import { SupplierRatings } from "@/components/performance-metrics/supplier-ratings"

export default function PerformanceMetricsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Performance Metrics</h1>
      <Tabs defaultValue="cost-savings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cost-savings">Cost Savings</TabsTrigger>
          <TabsTrigger value="cycle-time">Procurement Cycle Time</TabsTrigger>
          <TabsTrigger value="supplier-ratings">Supplier Ratings</TabsTrigger>
        </TabsList>
        <TabsContent value="cost-savings">
          <CostSavings />
        </TabsContent>
        <TabsContent value="cycle-time">
          <ProcurementCycleTime />
        </TabsContent>
        <TabsContent value="supplier-ratings">
          <SupplierRatings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

