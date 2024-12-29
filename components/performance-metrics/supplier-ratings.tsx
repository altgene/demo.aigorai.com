import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const supplierRatings = [
  { name: "Acme Corp", quality: 4.5, delivery: 4.2, cost: 4.0, overall: 4.2 },
  { name: "Beta Industries", quality: 4.2, delivery: 4.5, cost: 4.3, overall: 4.3 },
  { name: "Gamma Supplies", quality: 4.8, delivery: 4.0, cost: 4.1, overall: 4.3 },
  { name: "Delta Tech", quality: 4.0, delivery: 4.3, cost: 4.5, overall: 4.3 },
  { name: "Epsilon Services", quality: 4.3, delivery: 4.4, cost: 4.2, overall: 4.3 },
]

export function SupplierRatings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Supplier Ratings</CardTitle>
        <CardDescription>Performance ratings for top suppliers (out of 5)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Overall</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplierRatings.map((supplier) => (
              <TableRow key={supplier.name}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.quality}</TableCell>
                <TableCell>{supplier.delivery}</TableCell>
                <TableCell>{supplier.cost}</TableCell>
                <TableCell>{supplier.overall}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

