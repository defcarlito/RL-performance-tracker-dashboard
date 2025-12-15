import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Game, Player } from "@/types/match"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
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
  localTeam: number
}

export default function MatchDetails({
  matchData,
  filterBy,
  localTeam,
}: matchProps) {
  const playerInfo: Player[] = matchData.players

  const sortedByLocalTeam = [...playerInfo].sort((a, b) => {
    if (a.team !== b.team) {
      return a.team - b.team
    }
    return b.score - a.score
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
          player.uid === LOCAL_PLAYER_ID
            ? player.team === 0
              ? "bg-blue-300/50"
              : "bg-orange-300/50"
            : player.team === 0
              ? "bg-blue-300/25"
              : "bg-orange-300/25"
        }
      >
        {children}
      </TableRow>
    )
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const collapseIcon = isOpen ? (
    <ChevronDown className="size-4" />
  ) : (
    <ChevronRight className="size-4" />
  )

  const mmrDifference = () => {
    const diff = matchData.mmrAfter - matchData.mmrBefore
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

  const localTeammates: Array<Player> =
    matchData?.players.filter((player) => player.team === localTeam) ?? []
  const opponents: Array<Player> =
    matchData?.players.filter((player) => player.team !== localTeam) ?? []

  function getSaveEfficiency() {
    const localTeamSaves = localTeammates.reduce(
      (sum, player) => sum + player.saves,
      0,
    )
    const opponentTeamShots = opponents.reduce(
      (sum, player) => sum + player.shots,
      0,
    )
    const saveEff = Math.round((localTeamSaves / opponentTeamShots) * 100)
    return opponentTeamShots === 0 ? 0 : saveEff
  }

  function getShotConversion() {
    const localTeamGoals = localTeammates.reduce(
      (sum, player) => sum + player.goals,
      0,
    )
    const localTeamShots = localTeammates.reduce(
      (sum, player) => sum + player.shots,
      0,
    )
    const conversionRate = Math.round((localTeamGoals / localTeamShots) * 100)
    return localTeamShots === 0 ? 0 : conversionRate
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
                        {player.uid === LOCAL_PLAYER_ID ? (
                          <span className="flex items-center gap-1">
                            <Star className="size-4" fill="currentColor" />
                            Me
                          </span>
                        ) : (
                          player.name
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.score}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.goals}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.assists}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.saves}
                      </TableCell>
                      <TableCell className="text-center">
                        {player.shots}
                      </TableCell>
                    </CustomRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <span className="flex gap-1">
                  MMR: {matchData.mmrAfter}
                  <span>{mmrDifference()}</span>
                </span>
                <span>Prev: {matchData.mmrBefore}</span>
              </div>
              <div>
                {filterBy === "limit"
                  ? matchData.date.toLocaleTimeString()
                  : matchData.date.toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p>Save efficiency: {getSaveEfficiency()}%</p>
            <p>Shot conversion rate: {getShotConversion()}%</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
