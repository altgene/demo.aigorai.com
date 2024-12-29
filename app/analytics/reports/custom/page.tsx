'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

export default function CustomReportPage() {
  const [reportType, setReportType] = useState('spend')
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })

  const handleGenerateReport = () => {
    // Logic to generate the custom report based on selected options
    console.log('Generating report:', { reportType, dateRange })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Custom Report Generator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Select your custom report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Report Type</label>
              <Select onValueChange={setReportType} defaultValue={reportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spend">Spend Analysis</SelectItem>
                  <SelectItem value="supplier">Supplier Performance</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">Date Range</label>
              <DatePickerWithRange onDateChange={setDateRange} />
            </div>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

