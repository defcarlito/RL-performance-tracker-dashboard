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
      (show1v1 && match.Playlist === ONES_PLAYLIST) ||
      (show2v2 && match.Playlist === TWOS_PLAYLIST)
    )
  })

  useUpdateMatchCount(setMatchCount, filterMatches)

  return (
    <>
      {filterMatches.map((match: Game, index: number) => (
        <Match matchData={match} key={index} filterBy={filterBy} />
      ))}
    </>
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
  const players: Array<Player> = matchData.MatchPlayerInfo
  const localPlayer: Player = players.find(
    (playerInfo) => playerInfo.EpicAccountId === LOCAL_PLAYER_ID,
  )!

  const localTeam: number = localPlayer?.Team
  const opponentTeam: number = localTeam === 0 ? 1 : 0

  const localTeamScore =
    localTeam === 0 ? matchData.Team0Score : matchData.Team1Score
  const opponentTeamScore =
    localTeam === 0 ? matchData.Team1Score : matchData.Team0Score
  const score: string = `${localTeamScore} - ${opponentTeamScore}`

  const hasLocalPlayerWon = (): boolean => {
    if (matchData.LocalMMRAfter > matchData.LocalMMRBefore) {
      return true
    } else if (matchData.LocalMMRAfter < matchData.LocalMMRBefore) {
      return false
    }
    return localTeamScore > opponentTeamScore
  }

  const opponents: Array<Player> = players.filter(
    (playerInfo) => playerInfo.Team === opponentTeam,
  )
  const opponentNames: string = opponents
    .map((player) => player.Name)
    .join(", ")

  return (
    <div
      className={`bg-card border-border flex flex-col rounded-2xl border-2 p-2 ${hasLocalPlayerWon() ? "border-l-green-300" : "border-l-red-300"}`}
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
            ? matchData.MatchDate.toLocaleDateString()
            : matchData.MatchDate.toLocaleTimeString()}
        </div>
      </div>
      <div className="align-start text-muted-foreground flex flex-wrap justify-between text-sm relative">
        <div className="w-full">
          <MatchDetails matchData={matchData} filterBy={filterBy} />
        </div>
        <div className="absolute top-0 right-0">
          {matchData.Playlist === ONES_PLAYLIST ? <OnesBadge /> : <TwosBadge />}
        </div>
      </div>
    </div>
  )
}
