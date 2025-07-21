import { LOCAL_PLAYER_ID, ONES_PLAYLIST, TWOS_PLAYLIST } from "@/constants"
import { Game, Player } from "@/types/match"
import { useEffect } from "react"

type logProps = {
  allMatches: Array<Game>
  show1v1: boolean
  show2v2: boolean
  setMatchCount: React.Dispatch<React.SetStateAction<number>>
}

export default function Log({
  allMatches,
  show1v1,
  show2v2,
  setMatchCount,
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
        <Match matchData={match} key={index} />
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
}

export function Match({ matchData }: matchProps) {
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

  const mmrDifference = () => {
    const diff = matchData.LocalMMRAfter - matchData.LocalMMRBefore
    if (diff === 0) return "0 MMR"
    return diff > 0 ? `+${diff} MMR` : `-${Math.abs(diff)} MMR`
  }
  const playlist: string = matchData.Playlist === ONES_PLAYLIST ? "1v1" : "2v2"

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
        <div className="text-muted-foreground">{matchData.MatchDate.toLocaleDateString()}</div>
      </div>
      <div className="align-start flex flex-wrap justify-between text-sm text-muted-foreground">
        <div>{mmrDifference()}</div>
        <div>{playlist}</div>
      </div>
    </div>
  )
}
