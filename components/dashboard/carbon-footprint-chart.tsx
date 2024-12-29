import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CarbonFootprintData {
  name: string
  value: number
}

interface CarbonFootprintChartProps {
  data: CarbonFootprintData[]
}

export function CarbonFootprintChart({ data }: CarbonFootprintChartProps) {
  return (
    <ChartContainer
      config={{
        actual: {
          label: "Actual",
          color: "hsl(var(--chart-1))",
        },
        minimum: {
          label: "Minimum Possible",
          color: "hsl(var(--chart-2))",
        },
        maximum: {
          label: "Maximum Possible",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="value" fill="var(--color-actual)" name="Carbon Footprint (kg CO2e)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

