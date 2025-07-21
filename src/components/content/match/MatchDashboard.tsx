"use client"

import Log from "./main-content/MatchLog"

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

import { Dispatch, useEffect, useMemo, useState } from "react"
import { FilterDate, FilterLimit, FilterPlaylist } from "./main-content/Filters"

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export default function Dashboard() {
  const [show1v1, setShow1v1] = useState<boolean>(true)
  const [show2v2, setShow2v2] = useState<boolean>(true)

  const [validDates, setValidDates] = useState<Set<string>>(new Set())

  const defaultFetchLimit: number = 10
  const [fetchLimit, setFetchLimit] = useState<number>(defaultFetchLimit)
  const [matchCount, setMatchCount] = useState(fetchLimit)

  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined)

  const { games, loading } = useQueryMatches(fetchLimit, filterDate)
  useQueryValidDates(setValidDates)

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
          <FilterDate validDates={validDates} setFilterDate={setFilterDate} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground flex justify-between text-sm">
            <div>placeholder</div>
            <div>{matchCount} matches</div>
          </div>
          <Log
            allMatches={games}
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

function useQueryValidDates(setValidDates: any): void {
  useEffect(() => {
    const fetchAvaliableDates = async () => {
      const snapshot = await getDocs(collection(db, "match_dates"))
      const fetchedDates = new Set<string>(snapshot.docs.map((doc) => doc.id))
      setValidDates(fetchedDates)
    }
    fetchAvaliableDates()
  }, [])
}

function useQueryMatches(
  fetchLimit: number,
  filterDate?: Date,
): {
  games: Array<Game>
  loading: boolean
} {
  const matchQuery = useMemo(() => {
    if (filterDate) {
      return query(
        collection(db, "matches"),
        where("StartDate", "==", formatDateToYYYYMMDD(filterDate)),
        orderBy("StartEpoch", "desc"),
      )
    } else {
      return query(
        collection(db, "matches"),
        where("FormatVersion", "==", "8.0"),
        orderBy("StartEpoch", "desc"),
        limit(fetchLimit),
      )
    }
  }, [fetchLimit, filterDate])

  return useMatchesFromQuery(matchQuery)
}

function mapMatchDocToGame(data: any): Game {
  const gameGoals: Array<Goal> = data.Goals.map((goal: any) => ({
    GoalClip: goal.GoalClip ?? null,
    GoalTimeSeconds: goal.GoalTimeSeconds,
    ScorerName: goal.ScorerName ?? null,
    ScorerTeam: goal.ScorerTeam,
  }))

  const gamePlayers: Array<Player> = data.MatchPlayerInfo.map(
    (player: any) => ({
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
    }),
  )

  return {
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
}

function useMatchesFromQuery(matchQuery: any): {
  games: Array<Game>
  loading: boolean
} {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    getDocs(matchQuery).then((snapshot) => {
      const allGameData = snapshot.docs.map((doc) =>
        mapMatchDocToGame(doc.data()),
      )
      setGames(allGameData)
      setLoading(false)
    })
  }, [matchQuery])

  return { games, loading }
}
