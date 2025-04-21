"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PriceChartProps {
  crypto: string
  timeframe: string
  priceChange: number
}

export function PriceChart({ crypto, timeframe, priceChange }: PriceChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock data based on the selected timeframe
    const generateMockData = () => {
      const data = []
      const now = new Date()
      const priceDirection = priceChange >= 0 ? 1 : -1
      const volatility = Math.abs(priceChange) / 10

      let points = 24
      let interval = 60 * 60 * 1000 // 1 hour in milliseconds

      if (timeframe === "7d") {
        points = 7
        interval = 24 * 60 * 60 * 1000 // 1 day
      } else if (timeframe === "30d") {
        points = 30
        interval = 24 * 60 * 60 * 1000 // 1 day
      } else if (timeframe === "1y") {
        points = 12
        interval = 30 * 24 * 60 * 60 * 1000 // 1 month
      }

      const basePrice = 50000 // Base price for Bitcoin
      let currentPrice = basePrice

      for (let i = points; i >= 0; i--) {
        const date = new Date(now.getTime() - i * interval)

        // Add some randomness to the price movement
        const randomFactor = (Math.random() - 0.5) * volatility
        const trendFactor = ((i / points) * priceDirection * Math.abs(priceChange)) / 100

        currentPrice = basePrice * (1 + trendFactor + randomFactor)

        data.push({
          date: date.toLocaleString(),
          price: currentPrice,
          formattedDate: formatDate(date, timeframe),
        })
      }

      return data
    }

    setChartData(generateMockData())
  }, [crypto, timeframe, priceChange])

  const formatDate = (date: Date, timeframe: string) => {
    if (timeframe === "24h") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (timeframe === "7d" || timeframe === "30d") {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    } else {
      return date.toLocaleDateString([], { month: "short", year: "2-digit" })
    }
  }

  const chartColor = priceChange >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-5))"

  return (
    <div className="h-[250px] w-full">
      <ChartContainer
        config={{
          price: {
            label: "Price",
            color: chartColor,
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="formattedDate" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickMargin={10} />
            <YAxis
              dataKey="price"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => `$${Math.round(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              domain={["auto", "auto"]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  style={{ backgroundColor: "hsl(var(--background))" }}
                  className="border border-border shadow-md"
                />
              }
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
