import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Analytics Reports</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Spend Analysis</CardTitle>
            <CardDescription>Detailed breakdown of organizational spending</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/analytics/reports/spend-analysis" className="text-blue-500 hover:underline">
              View Spend Analysis Report
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Compliance Reports</CardTitle>
            <CardDescription>Reports on adherence to procurement policies and regulations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/analytics/reports/compliance" className="text-blue-500 hover:underline">
              View Compliance Reports
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Custom Reports</CardTitle>
            <CardDescription>Generate tailored reports based on specific criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/analytics/reports/custom" className="text-blue-500 hover:underline">
              Create Custom Report
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

