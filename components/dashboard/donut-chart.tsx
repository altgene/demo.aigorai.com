import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#FF6B6B', '#FFB84C', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']

interface DonutChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

export function DonutChart({ data }: DonutChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

