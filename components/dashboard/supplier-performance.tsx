import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const topSuppliers = [
  { name: "Acme Corp", score: 95, spend: "$1.2M", savings: "$150K" },
  { name: "Beta Industries", score: 88, spend: "$800K", savings: "$95K" },
  { name: "Gamma Supplies", score: 92, spend: "$650K", savings: "$78K" },
  { name: "Delta Tech", score: 87, spend: "$550K", savings: "$62K" },
  { name: "Epsilon Services", score: 90, spend: "$450K", savings: "$54K" },
]

export function SupplierPerformance() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Suppliers</CardTitle>
          <CardDescription>Based on performance score, spend, and savings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Performance Score</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Cost Savings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSuppliers.map((supplier) => (
                <TableRow key={supplier.name}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.score}</TableCell>
                  <TableCell>{supplier.spend}</TableCell>
                  <TableCell>{supplier.savings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Average Supplier Score</CardTitle>
            <CardDescription>Across all active suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.5</div>
            <p className="text-xs text-muted-foreground">+2.3 from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Supplier Diversity</CardTitle>
            <CardDescription>Percentage of diverse suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">+5% from last year</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

