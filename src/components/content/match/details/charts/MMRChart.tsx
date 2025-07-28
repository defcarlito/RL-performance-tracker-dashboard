import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Game } from "@/types/match"
import { TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

export const description = "A simple area chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type mmrChartProps = {
  allMatches: Array<Game>
}

export default function MMRChart({ allMatches }: mmrChartProps) {

  type ChartPoint = {
    MMR: number
    time: number
  }

  const [chartData, setChartData] = useState<ChartPoint[]>([])

  useEffect(() => {


    const data = () => {
      const arr = allMatches.map((match) => ({
        MMR: match.LocalMMRAfter,
        time: match.MatchDate.getTime() / 1000,
      }))
      return arr.reverse()
    }

    setChartData(data())
  }, [allMatches])

  useEffect(() => {
    console.log(chartData)
  }, [chartData])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>MMR Change</CardTitle>
          <CardDescription>
            Showing the change in MMR over the last # days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="MMR"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending a net ## MMR increase{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                For MM/DD/YYYY
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
