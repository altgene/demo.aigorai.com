import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
]

export function ExecutiveOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Spend</CardTitle>
          <CardDescription>Year to date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2.4M</div>
          <p className="text-xs text-muted-foreground">+20.1% from last year</p>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="total" fill="#adfa1d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cost Savings</CardTitle>
          <CardDescription>Year to date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$420K</div>
          <p className="text-xs text-muted-foreground">+12.3% from target</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Supplier Count</CardTitle>
          <CardDescription>Active suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+3.2% from last quarter</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Rate</CardTitle>
          <CardDescription>Procurement policy adherence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98.7%</div>
          <p className="text-xs text-muted-foreground">+0.5% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

