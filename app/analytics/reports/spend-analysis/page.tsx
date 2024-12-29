'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useEffect, useState } from 'react'

// Define TypeScript interfaces
interface SpendCategory {
  name: string
  value: number
}

interface Vendor {
  name: string
  spend: string
  category: string
}

// Sample data
const spendData: SpendCategory[] = [
  { name: 'IT Equipment', value: 4000 },
  { name: 'Office Supplies', value: 3000 },
  { name: 'Professional Services', value: 2000 },
  { name: 'Travel', value: 1000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const topVendors: Vendor[] = [
  { name: "Acme Corp", spend: "$1,200,000", category: "IT Equipment" },
  { name: "Beta Industries", spend: "$800,000", category: "Professional Services" },
  { name: "Gamma Supplies", spend: "$650,000", category: "Office Supplies" },
  { name: "Delta Tech", spend: "$550,000", category: "IT Equipment" },
  { name: "Epsilon Services", spend: "$450,000", category: "Professional Services" },
]

export default function SpendAnalysisPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Spend Analysis Report</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Spend by Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
            <CardDescription>Distribution of spend across major categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {spendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Vendors by Spend Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Vendors by Spend</CardTitle>
            <CardDescription>Vendors with the highest total spend</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Total Spend</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topVendors.map((vendor) => (
                  <TableRow key={vendor.name}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.spend}</TableCell>
                    <TableCell>{vendor.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}