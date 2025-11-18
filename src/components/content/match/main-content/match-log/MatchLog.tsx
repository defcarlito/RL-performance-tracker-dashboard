import { OnesBadge, TwosBadge } from "@/components/ui/custom-badges"
import { LOCAL_PLAYER_ID, ONES_PLAYLIST, TWOS_PLAYLIST } from "@/constants"
import { FilterType } from "@/types/filter"
import { Game, Player } from "@/types/match"
import { useEffect } from "react"
import MatchDetails from "./collapsible/MatchDetails"

type logProps = {
  allMatches: Array<Game>
  show1v1: boolean
  show2v2: boolean
  setMatchCount: React.Dispatch<React.SetStateAction<number>>
  filterBy: FilterType
}

export default function Log({
  allMatches,
  show1v1,
  show2v2,
  setMatchCount,
  filterBy,
}: logProps) {
  const filterMatches = allMatches.filter((match) => {
    return (
      (show1v1 && match.playlist === ONES_PLAYLIST) ||
      (show2v2 && match.playlist === TWOS_PLAYLIST)
    )
  })

  useUpdateMatchCount(setMatchCount, filterMatches)

  return (
    <div className="flex flex-col gap-2">
      {filterMatches.map((match: Game, index: number) => (
        <div
          key={index}
          style={{ animationDelay: `${index * 25}ms` }}
          className="motion-preset-fade motion-preset-slide-up-lg"
        >
          <Match matchData={match} filterBy={filterBy} />
        </div>
      ))}
    </div>
  )
}

function useUpdateMatchCount(
  setMatchCount: React.Dispatch<React.SetStateAction<number>>,
  matches: Array<Game>,
) {
  useEffect(() => {
    setMatchCount(matches.length)
  }, [matches])
}

type matchProps = {
  matchData: Game
  filterBy: FilterType
}

export function Match({ matchData, filterBy }: matchProps) {
  const players: Array<Player> = matchData.players
  const localPlayer: Player = players.find(
    (playerInfo) => playerInfo.uid === LOCAL_PLAYER_ID,
  )!

  const localTeam: number = localPlayer?.team
  const opponentTeam: number = localTeam === 0 ? 1 : 0

  const localTeamScore = 1 // temp
  const opponentTeamScore = 2 // temp
  const score: string = `${localTeamScore} - ${opponentTeamScore}`

  const hasLocalPlayerWon = (): boolean => {
    if (matchData.mmrAfter > matchData.mmrBefore) {
      return true
    } else if (matchData.mmrAfter< matchData.mmrBefore) {
      return false
    }
    return localTeamScore > opponentTeamScore
  }

  const opponents: Array<Player> = players.filter(
    (playerInfo) => playerInfo.team === opponentTeam,
  )
  const opponentNames: string = opponents
    .map((player) => player.name)
    .join(", ")

  return (
    <div
      className={`bg-card border-border flex flex-col rounded-md border-l-4 p-2 ${hasLocalPlayerWon() ? "border-l-green-300" : "border-l-red-300"}`}
    >
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`text-2xl ${hasLocalPlayerWon() ? "text-green-300" : "text-red-300"}`}
          >
            {hasLocalPlayerWon() ? "W" : "L"}
          </div>
          <div>{score}</div>
        </div>
        <div className="text-sm">vs. {opponentNames}</div>
        <div className="text-muted-foreground">
          {filterBy === "limit"
            ? matchData.date.toLocaleDateString()
            : matchData.date.toLocaleTimeString()}
        </div>
      </div>
      <div className="align-start text-muted-foreground relative flex flex-wrap justify-between text-sm">
        <div className="w-full">
          <MatchDetails matchData={matchData} filterBy={filterBy} />
        </div>
        <div className="absolute top-0 right-0">
          {matchData.playlist === ONES_PLAYLIST ? <OnesBadge /> : <TwosBadge />}
        </div>
      </div>
    </div>
  )
}
