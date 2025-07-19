import { LOCAL_PLAYER_ID } from "@/constants"
import { Game, Player } from "@/types/match"
import { useEffect, useState } from "react"

type logProps = {
  allMatches: Array<Game>
}

export default function Log({ allMatches }: logProps) {
  return (
    <div className="flex flex-col gap-2 p-2">
      {allMatches.map((match: Game, index: number) => (
        <Match matchData={match} key={index} />
      ))}
    </div>
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

  const localTeamScore = localTeam === 0 ? matchData.Team0Score : matchData.Team1Score
  const opponentTeamScore = localTeam === 0 ? matchData.Team1Score : matchData.Team0Score

  const score: string = `${localTeamScore} - ${opponentTeamScore}`

  const hasLocalPlayerWon = (): boolean => {
    if (matchData.LocalMMRAfter > matchData.LocalMMRBefore){
      return true
    } else if (matchData.LocalMMRAfter < matchData.LocalMMRBefore) {
      return false
    }
    return localTeamScore > opponentTeamScore
  }

  const cardAccentColor = hasLocalPlayerWon() ? "green" : "red"
  const cardGradient = `from-${cardAccentColor}-400/50`
  
  const mmrDifference = matchData.LocalMMRAfter - matchData.LocalMMRBefore
  const playlist = matchData.Playlist === 10 ? "1v1" : "2v2"

  return (
    <div className={`to-card border-border flex flex-col rounded-2xl border-2 bg-gradient-to-r ${cardGradient} to-15% p-2`}>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl">
            {hasLocalPlayerWon() ? "W" : "L"}
          </div>
          <div>{score}</div>
        </div>
        <div>{localPlayer.Name}</div>
        <div>{matchData.StartDate}</div>
      </div>
      <div className="align-start flex flex-wrap justify-between">
        <div>(mmr diff)</div>
        <div>{playlist}</div>
      </div>
    </div>
  )
}
