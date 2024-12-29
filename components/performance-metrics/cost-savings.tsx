import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const costSavingsData = [
  { category: 'IT Equipment', actual: 150000, target: 120000 },
  { category: 'Office Supplies', actual: 80000, target: 75000 },
  { category: 'Professional Services', actual: 200000, target: 180000 },
  { category: 'Travel', actual: 50000, target: 60000 },
  { category: 'Facilities', actual: 100000, target: 90000 },
]

export function CostSavings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Savings by Category</CardTitle>
        <CardDescription>Actual vs Target savings for major spend categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costSavingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="actual" fill="#8884d8" name="Actual Savings" />
              <Bar dataKey="target" fill="#82ca9d" name="Target Savings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

