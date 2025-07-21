"use client"

import Log from "./table/MatchLog"

import { db } from "@/firebase/config"
import { Game, Goal, Player } from "@/types/match"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { useEffect, useState } from "react"
import { FilterDate, FilterLimit, FilterPlaylist } from "./table/Filters"

export default function Dashboard() {
  const [show1v1, setShow1v1] = useState<boolean>(true)
  const [show2v2, setShow2v2] = useState<boolean>(true)

  const [isFilterByLimit, setIsFilterByLimit] = useState<boolean>(true)
  const defaultFetchLimit: number = 10
  const [fetchLimit, setFetchLimit] = useState<number>(defaultFetchLimit)
  const [matchCount, setMatchCount] = useState(fetchLimit)

  const [isFilterByDate, setIsFilterByDate] = useState<boolean>(false)
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined)

  const { games: recentMatches, loading: loadingGames } =
    useFetchRecentMatches(fetchLimit)
  
  useEffect(() => {
    console.log(filterDate)
  }, [filterDate])

  return (
    <div className="flex h-2/3 w-full flex-col xl:h-full xl:flex-2/3 xl:flex-row">
      <div className="flex flex-1 flex-col gap-8 overflow-scroll px-2">
        <div className="bg-secondary flex justify-between rounded-xl border-2 p-2">
          <FilterPlaylist
            show1v1={show1v1}
            setShow1v1={setShow1v1}
            show2v2={show2v2}
            setShow2v2={setShow2v2}
          />
          <FilterLimit fetchLimit={fetchLimit} setFetchLimit={setFetchLimit} />
          <FilterDate setFilterDate={setFilterDate} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground self-end text-sm">
            {matchCount} matches
          </div>
          <Log
            allMatches={recentMatches}
            show1v1={show1v1}
            show2v2={show2v2}
            setMatchCount={setMatchCount}
          />
        </div>
      </div>
      <div className="flex-1">pretend this is match info</div>
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
      limit(fetchLimit),
    )

    getDocs(matchDatesRef).then((snapshot) => {
      const allGameData: Array<Game> = snapshot.docs.map((match) => {
        const data = match.data()

        const gameGoals: Array<Goal> = data.Goals.map((goal: any) => {
          const gameGoal: Goal = {
            GoalClip: goal.GoalClip ?? null,
            GoalTimeSeconds: goal.GoalTimeSeconds,
            ScorerName: goal.ScorerName ?? null,
            ScorerTeam: goal.ScorerTeam,
          }

          return gameGoal
        })

        const gamePlayers: Array<Player> = data.MatchPlayerInfo.map(
          (player: any) => {
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
              Team: player.Team,
            }
            return gamePlayer
          },
        )

        const gameData: Game = {
          FormatVersion: data.FormatVersion,
          Goals: gameGoals,
          LocalMMRAfter: data.LocalMMRAfter,
          LocalMMRBefore: data.LocalMMRBefore,
          MatchPlayerInfo: gamePlayers,
          Playlist: data.Playlist,
          MatchDate: new Date(data.StartEpoch * 1000),
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
  }, [fetchLimit])
  return { games, loading }
}
