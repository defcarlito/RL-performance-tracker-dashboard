import { LOCAL_PLAYER_ID, ONES_PLAYLIST } from "@/constants"
import { Game, Player } from "@/types/match"

type logProps = {
  allMatches: Array<Game>
}

export default function Log({ allMatches }: logProps) {
  return (
    <>
      {allMatches.map((match: Game, index: number) => (
        <Match matchData={match} key={index} />
      ))}
    </>
  )
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

  const cardAccentColor = hasLocalPlayerWon() ? "green" : "red"
  const cardGradient = `from-${cardAccentColor}-400/50`

  const mmrDifference = () => {
    const diff = matchData.LocalMMRAfter - matchData.LocalMMRBefore
    if (diff === 0) return "0 MMR"
    return diff > 0 ? `+${diff} MMR` : `-${Math.abs(diff)} MMR`
  }
  const playlist: string = matchData.Playlist === ONES_PLAYLIST ? "1v1" : "2v2"

  const opponents: Array<Player> = players.filter(
    (playerInfo) => playerInfo.Team === opponentTeam
  )
  const opponentNames: string = opponents.map(player => player.Name).join(", ")

  const formatDate = (date: string): string => {
    const parts = date.split("-")
    return `${+parts[1]}/${+parts[2]}/${parts[0]}`
  }

  return (
    <div
      className={`to-card border-border flex flex-col rounded-2xl border-2 bg-gradient-to-r ${cardGradient} to-15% p-2`}
    >
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl">{hasLocalPlayerWon() ? "W" : "L"}</div>
          <div>{score}</div>
        </div>
        <div className="text-sm">vs. {opponentNames}</div>
        <div>{formatDate(matchData.StartDate)}</div>
      </div>
      <div className="align-start flex flex-wrap justify-between">
        <div>{mmrDifference()}</div>
        <div>{playlist}</div>
      </div>
    </div>
  )
}
