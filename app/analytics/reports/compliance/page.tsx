'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'


// Define TypeScript interfaces for data
interface ComplianceData {
  name: string
  rate: number
}

interface ComplianceIssue {
  issue: string
  count: number
  impact: string
}

const complianceData : ComplianceData[] = [
  { name: 'Jan', rate: 95 },
  { name: 'Feb', rate: 98 },
  { name: 'Mar', rate: 97 },
  { name: 'Apr', rate: 99 },
  { name: 'May', rate: 96 },
  { name: 'Jun', rate: 98 },
]

const complianceIssues : ComplianceIssue[] = [
  { issue: "Missing documentation", count: 15, impact: "Medium" },
  { issue: "Unapproved vendor", count: 7, impact: "High" },
  { issue: "Exceeded budget limit", count: 12, impact: "High" },
  { issue: "Late submission", count: 23, impact: "Low" },
  { issue: "Incorrect coding", count: 18, impact: "Medium" },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Compliance Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
          <CardDescription>Monthly compliance rate over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#8884d8" name="Compliance Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Compliance Issues Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Top Compliance Issues</CardTitle>
          <CardDescription>Most frequent compliance violations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceIssues.map((issue) => (
                <TableRow key={issue.issue}>
                  <TableCell>{issue.issue}</TableCell>
                  <TableCell>{issue.count}</TableCell>
                  <TableCell>{issue.impact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
