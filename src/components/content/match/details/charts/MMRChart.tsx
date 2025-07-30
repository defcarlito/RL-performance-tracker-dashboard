import { Badge } from "@/components/ui/badge"
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
import { ONES_PLAYLIST } from "@/constants"
import { Game } from "@/types/match"
import { match } from "assert"
import { TrendingDown, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Area, AreaChart, ReferenceLine, XAxis, YAxis } from "recharts"

export const description = "A simple area chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type mmrChartProps = {
  allMatches: Array<Game>
  playlist: number
}

type ChartPoint = {
  MMR: number
  time: number
}

export default function MMRChart({ allMatches, playlist }: mmrChartProps) {
  const data: ChartPoint[] = useFetchTimeFromAllMatches(allMatches)

  const title: string = playlist === ONES_PLAYLIST ? "1v1" : "2v2"

  const areaColor: string =
    playlist === ONES_PLAYLIST ? "var(--chart-1)" : "var(--chart-4)"

  const dateCount = () => {
    const uniqueDates = new Set(
      allMatches.map((match) => match.MatchDate.toDateString()),
    )
    return uniqueDates.size
  }

  const dateString = dateCount() === 1 ? "day" : "days"

  const matchCount = allMatches.length
  const matchString = matchCount === 1 ? "match" : "matches"

  const mmrNet = (): number => {
    if (data.length > 0) {
      return data[data.length - 1].MMR - data[0].MMR
    }
    return 0
  }

  const summaryText = () => {
    const net: number = mmrNet()
    if (net > 0) {
      return (
        <>
          Netting a {net} increase in MMR <TrendingUp className="h-4 w-4 text-green-300" />
        </>
      )
    } else if (net < 0) {
      return (
        <>
          Netting a {Math.abs(net)} decrease in MMR <TrendingDown className="h-4 w-4 text-red-300" />
        </>
      )
    } else {
      return <>No change in MMR.</>
    }
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">
            {playlist === ONES_PLAYLIST ? (
              <Badge className="bg-chart-1/60 text-foreground text-xl font-medium">
                {title}
              </Badge>
            ) : (
              <Badge className="bg-chart-4/60 text-foreground text-xl font-medium">
                {title}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Showing the change in MMR over the last {matchCount} {matchString}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={data}>
              <YAxis
                domain={["dataMin - 100", "dataMax + 100"]}
                dataKey="MMR"
                width={0}
              />
              <XAxis dataKey="time" height={0} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="MMR"
                type="monotone"
                fill={areaColor}
                fillOpacity={0.3}
                stroke={areaColor}
              />
              {data.length > 0 && (
                <ReferenceLine
                  y={data[0].MMR}
                  stroke="var(--accent)"
                  label={data[0].MMR}
                />
              )}
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                {summaryText()}
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Over {dateCount()} {dateString}.
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

function useFetchTimeFromAllMatches(allMatches: Game[]) {
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

  return chartData
}
