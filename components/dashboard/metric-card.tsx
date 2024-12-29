import { ReactNode } from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface MetricCardProps {
  title: string
  value: string
  year: string
  trend: Array<{ value: number }>
  icon: ReactNode
  className?: string
}

export function MetricCard({ title, value, year, trend, icon, className = '' }: MetricCardProps) {
  return (
    <div className={`bg-white rounded-lg p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-100">
            {icon}
          </div>
          <div>
            <h3 className="text-sm text-gray-600">{title}</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{value}</p>
              <span className="text-sm text-gray-500">{year}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-xs text-gray-500 text-center mt-1">5 year trend</div>
      </div>
    </div>
  )
}

