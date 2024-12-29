import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "./metric-card"
import { DonutChart } from "./donut-chart"
import { ROIBarChart } from "./bar-chart"
import { SupplierTable } from "./supplier-table"
import { CarbonFootprintChart } from "./carbon-footprint-chart"
import { DollarSign, TrendingDown, Users, ShoppingCart } from 'lucide-react'

const spendByCategoryData = [
  { name: "IT Equipment", value: 35 },
  { name: "Office Supplies", value: 25 },
  { name: "Professional Services", value: 20 },
  { name: "Travel", value: 15 },
  { name: "Facilities", value: 5 },
]

const roiData = [
  { name: "Q1", roi: 1.2, benchmark: 1.0 },
  { name: "Q2", roi: 1.5, benchmark: 1.1 },
  { name: "Q3", roi: 1.3, benchmark: 1.2 },
  { name: "Q4", roi: 1.8, benchmark: 1.3 },
]

const topSuppliers = [
  { name: "TechCorp", reduction: 50000 },
  { name: "OfficeMax", reduction: 35000 },
  { name: "ConsultCo", reduction: 30000 },
  { name: "TravelPro", reduction: 25000 },
  { name: "FacilityServices", reduction: 20000 },
]

const carbonFootprintData = [
  { name: "Current Year", value: 75 },
  { name: "Previous Year", value: 100 },
]

export function ProcurementDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Procurement Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Spend"
          value="$12.5M"
          year="2023"
          trend={[{ value: 10 }, { value: 15 }, { value: 12 }, { value: 13 }]}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Cost Savings"
          value="$2.3M"
          year="2023"
          trend={[{ value: 1 }, { value: 2 }, { value: 1.8 }, { value: 2.3 }]}
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Active Suppliers"
          value="287"
          year="2023"
          trend={[{ value: 250 }, { value: 270 }, { value: 280 }, { value: 287 }]}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Purchase Orders"
          value="1,543"
          year="2023"
          trend={[{ value: 1200 }, { value: 1350 }, { value: 1450 }, { value: 1543 }]}
          icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart data={spendByCategoryData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Procurement ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <ROIBarChart data={roiData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Suppliers by Cost Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <SupplierTable suppliers={topSuppliers} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Carbon Footprint Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <CarbonFootprintChart data={carbonFootprintData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

