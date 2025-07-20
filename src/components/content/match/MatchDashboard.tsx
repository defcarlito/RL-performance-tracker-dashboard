"use client"

import Log from "./table/MatchLog"

import { db } from "@/firebase/config"
import { Game, Goal, Player } from "@/types/match"
import { collection, getDocs, query, where, limit, orderBy } from "firebase/firestore"

import { useEffect, useState } from "react"
import Filter from "./table/Filter"

export default function Dashboard() {
  let matchFetchLimit: number = 20
  const {games: recentMatches, loading: loadingGames } = useFetchRecentMatches(matchFetchLimit)

  return (

    <div className="flex h-2/3 w-full flex-col xl:h-full xl:flex-2/3 xl:flex-row">
      <div className="flex-1 overflow-scroll flex flex-col gap-4 px-2">
        <div>
          <Filter />
        </div>
        <div className="flex flex-col gap-2">
          <Log allMatches={recentMatches}/>
        </div>
      </div>
      <div className="flex-1">
        pretend this is match info
      </div>
    </div>
  )
}

function useFetchRecentMatches(fetchLimit: number) {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const matchDatesRef = query(
      collection(db, "matches"),
      where("FormatVersion", "==", "8.0"),
      orderBy("StartEpoch", "desc"),
      limit(fetchLimit)
    )

    getDocs(matchDatesRef).then((snapshot) => {
      const allGameData: Array<Game> = snapshot.docs.map((match) => {
        const data = match.data()

        const gameGoals: Array<Goal> = data.Goals.map((goal: any) => {
          const gameGoal: Goal = {
            GoalClip: goal.GoalClip ?? null,
            GoalTimeSeconds: goal.GoalTimeSeconds,
            ScorerName: goal.ScorerName ?? null,
            ScorerTeam: goal.ScorerTeam
          }

          return gameGoal
        })

        const gamePlayers: Array<Player> = data.MatchPlayerInfo.map((player: any) => {
          const gamePlayer: Player = {
            Name: player.Name,
            Platform: player.Platform,
            EpicAccountId: player.EpicAccountId ?? null,
            OnlineID: player.OnlineID ?? null,
            Score: player.Score,
            Goals: player.Goals,
            Assists: player.Assists,
            Saves: player.Saves,
            Shots: player.Shots,
            Team: player.Team
          }
          return gamePlayer
        })
        
        const gameData: Game = {
          FormatVersion: data.FormatVersion,
          Goals: gameGoals,
          LocalMMRAfter: data.LocalMMRAfter,
          LocalMMRBefore: data.LocalMMRBefore,
          MatchPlayerInfo: gamePlayers,
          Playlist: data.Playlist,
          StartDate: data.StartDate,
          StartEpoch: data.StartEpoch,
          StartTime: data.StartTime,
          Team0Score: data.Team0Score,
          Team1Score: data.Team1Score,
          bForfeit: data.bForfeit,
          hasClips: data.hasClips ?? false,
        }
        return gameData
      })
      setGames(allGameData)
      setLoading(false)
    })
  }, [])
  return { games, loading }
}
