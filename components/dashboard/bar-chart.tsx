import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface BarChartProps {
  data: Array<{
    name: string
    roi: number
    benchmark: number
  }>
}

export function ROIBarChart({ data }: BarChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="roi" fill="#FF6B6B" name="ROI" />
          <Bar dataKey="benchmark" fill="#FFB84C" name="Benchmark" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

