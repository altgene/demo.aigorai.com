'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Sample data
const categoryLevel1Data = [
  { name: 'Production Parts', value: 85.54, percentage: 46.98 },
  { name: 'Travel', value: 37.91, percentage: 20.82 },
  { name: 'IT & Telecoms', value: 22.89, percentage: 12.57 },
  { name: 'Human Resources', value: 17.69, percentage: 9.71 },
  { name: 'Marketing', value: 11.63, percentage: 6.39 },
  { name: 'Facilities', value: 6.4, percentage: 3.53 },
]

const categoryLevel3Data = [
  { category: 'Gas System Components', spend: 16810785, transactions: 685, suppliers: 8 },
  { category: 'Control Boards', spend: 16033564, transactions: 134, suppliers: 1 },
  { category: 'Printed Publications', spend: 14361685, transactions: 579, suppliers: 151 },
  { category: 'Knobs, Bezels & Endcaps', spend: 9913795, transactions: 1463, suppliers: 3 },
  { category: 'Harness', spend: 8307556, transactions: 2477, suppliers: 3 },
  { category: 'Educational Supplies', spend: 7198050, transactions: 163, suppliers: 32 },
  { category: 'Stationery', spend: 6522287, transactions: 777, suppliers: 215 },
]

const categoryLevel2Data = [
  { name: 'Mechanical', value: 47833116 },
  { name: 'Electrical & Electronics', value: 26494031 },
  { name: 'Office Equipment', value: 14678201 },
  { name: 'Publications', value: 14361685 },
  { name: 'Employee Benefits', value: 11573935 },
]

const categoryLevel4Data = [
  { name: 'Paper', value: 2575976 },
  { name: 'HVAC Installation', value: 2330088 },
  { name: 'Security Services', value: 1744412 },
  { name: 'Security Equipment', value: 1382026 },
  { name: 'Pallets and Crates', value: 1372436 },
]

const supplierData = [
  { name: 'ELAN INDUSTRIES', value: 19190000 },
  { name: 'ECI-ELECTRIC', value: 8800000 },
  { name: 'ROBERTSHAW', value: 7200000 },
]

const COLORS = ['#4A90E2', '#50C878', '#FFB6C1', '#FFD700', '#FF7F50', '#9370DB']

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-red-500">Spend</div>
            <div className="text-2xl font-bold text-green-600">$182.06M</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-red-500">Suppliers</div>
            <div className="text-2xl font-bold">2,792</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-red-500">Transactions</div>
            <div className="text-2xl font-bold">18,960</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-red-500">PO Count</div>
            <div className="text-2xl font-bold">6,209</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-red-500">PR Count</div>
            <div className="text-2xl font-bold">6,811</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-red-500">Invoice Count</div>
            <div className="text-2xl font-bold">10,387</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Spend by Category Level 1 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spend by Category Level 1</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryLevel1Data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                  >
                    {categoryLevel1Data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spend by Category Level 3 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spend by Category Level 3</h3>
            <div className="max-h-[300px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category Level 3</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Transactions</TableHead>
                    <TableHead className="text-right">Suppliers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryLevel3Data.map((item) => (
                    <TableRow key={item.category}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">${(item.spend / 1000000).toFixed(2)}M</TableCell>
                      <TableCell className="text-right">{item.transactions}</TableCell>
                      <TableCell className="text-right">{item.suppliers}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Category Search */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Search</h3>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search categories..." className="pl-8" />
            </div>
            <div className="space-y-2">
              {['Appliances', 'Facilities', 'Human Resources', 'IT & Telecoms', 'Logistics'].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <label htmlFor={category} className="text-sm">{category}</label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Level 2 & 4 Charts */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Spend by Category Level 2 */}
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spend by Category Level 2</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={categoryLevel2Data}
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4A90E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spend by Category Level 4 */}
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spend by Category Level 4</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={categoryLevel4Data}
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#50C878" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Search */}
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Supplier Search</h3>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search suppliers..." className="pl-8" />
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={supplierData}
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4A90E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segmentation Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Spend Segmentation */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spend Segmentation by Value Bracket</h3>
            <div className="h-[100px]">
              <div className="flex h-8 w-full rounded-lg overflow-hidden">
                <div className="bg-blue-500 w-[3%]" title="$0 - $1k (3%)" />
                <div className="bg-yellow-500 w-[19%]" title="$1k - $2k (19%)" />
                <div className="bg-red-500 w-[12%]" title="$2k - $5k (12%)" />
                <div className="bg-green-500 w-[17%]" title="$5k - $10k (17%)" />
                <div className="bg-blue-300 w-[16%]" title="$10k - $25k (16%)" />
                <div className="bg-orange-500 w-[17%]" title="$25k - $50k (17%)" />
                <div className="bg-purple-500 w-[18%]" title="$50k+ (18%)" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Segmentation */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transactions Segmentation by Value Bracket</h3>
            <div className="h-[100px]">
              <div className="flex h-8 w-full rounded-lg overflow-hidden">
                <div className="bg-blue-500 w-[16%]" title="$0 - $1k (16%)" />
                <div className="bg-blue-700 w-[19%]" title="$1k - $2k (19%)" />
                <div className="bg-yellow-500 w-[31%]" title="$2k - $5k (31%)" />
                <div className="bg-red-500 w-[16%]" title="$5k - $10k (16%)" />
                <div className="bg-green-500 w-[10%]" title="$10k - $25k (10%)" />
                <div className="bg-gray-500 w-[8%]" title="$25k+ (8%)" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

