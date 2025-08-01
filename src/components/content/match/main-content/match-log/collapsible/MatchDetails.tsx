import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Game, Player } from "@/types/match"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LOCAL_PLAYER_ID } from "@/constants"
import { FilterType } from "@/types/filter"
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Minus,
  Star,
} from "lucide-react"
import { useState } from "react"

type matchProps = {
  matchData: Game
  filterBy: FilterType
}

export default function MatchDetails({ matchData, filterBy }: matchProps) {
  const playerInfo: Player[] = matchData.MatchPlayerInfo

  const sortedByLocalTeam = [...playerInfo].sort((a, b) => {
    if (a.Team !== b.Team) {
      return a.Team - b.Team
    }
    return b.Score - a.Score
  })

  const CustomRow = ({
    children,
    player,
  }: {
    children: React.ReactNode
    player: Player
  }) => {
    return (
      <TableRow
        className={
          player.EpicAccountId === LOCAL_PLAYER_ID
            ? player.Team === 0
              ? "bg-blue-300/50"
              : "bg-orange-300/50"
            : player.Team === 0
              ? "bg-blue-300/25"
              : "bg-orange-300/25"
        }
      >
        {children}
      </TableRow>
    )
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  let collapseIcon = isOpen ? (
    <ChevronDown className="size-4" />
  ) : (
    <ChevronRight className="size-4" />
  )

  const mmrDifference = () => {
    const diff = matchData.LocalMMRAfter - matchData.LocalMMRBefore
    if (diff === 0)
      return (
        <div className="text-foreground flex items-center">
          <Minus className="size-4" />0
        </div>
      )
    return diff > 0 ? (
      <div className="flex items-center text-green-300">
        <ArrowUp className="size-4" /> {diff}
      </div>
    ) : (
      <div className="flex items-center text-red-300">
        <ArrowDown className="size-4" /> {Math.abs(diff)}
      </div>
    )
  }

  return (
    <>
      <Collapsible onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button size="xs" variant="outline" className="px-0 pl-1">
            <span className="flex items-center gap-0.5">
              Details {collapseIcon}
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="flex flex-col gap-2">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-center">Goals</TableHead>
                    <TableHead className="text-center">Assists</TableHead>
                    <TableHead className="text-center">Saves</TableHead>
                    <TableHead className="text-center">Shots</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedByLocalTeam.map((player: Player, index: number) => (
                    <CustomRow player={player} key={index}>
                      <TableCell>
                        {player.EpicAccountId === LOCAL_PLAYER_ID
                          ? <span className="flex gap-1 items-center"><Star className="size-4" fill="currentColor" />Me</span>
                          : player.Name}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.Score}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.Goals}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.Assists}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.Saves}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.Shots}
                      </TableCell>
                    </CustomRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <span className="flex gap-1">
                  MMR: {matchData.LocalMMRAfter}
                  <span>{mmrDifference()}</span>
                </span>
                <span>Prev: {matchData.LocalMMRBefore}</span>
              </div>
              <div>
                {filterBy === "limit"
                  ? matchData.MatchDate.toLocaleTimeString()
                  : matchData.MatchDate.toLocaleDateString()}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
