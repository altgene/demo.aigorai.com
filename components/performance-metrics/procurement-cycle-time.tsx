import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const cycleTimeData = [
  { month: 'Jan', averageTime: 15, targetTime: 14 },
  { month: 'Feb', averageTime: 14, targetTime: 14 },
  { month: 'Mar', averageTime: 16, targetTime: 14 },
  { month: 'Apr', averageTime: 13, targetTime: 14 },
  { month: 'May', averageTime: 12, targetTime: 14 },
  { month: 'Jun', averageTime: 11, targetTime: 14 },
]

export function ProcurementCycleTime() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Procurement Cycle Time Trend</CardTitle>
        <CardDescription>Average cycle time vs target (in days)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cycleTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="averageTime" stroke="#8884d8" name="Average Cycle Time" />
              <Line type="monotone" dataKey="targetTime" stroke="#82ca9d" name="Target Cycle Time" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

