import Log from "./main-content/match-log/MatchLog"

import { FilterType } from "@/types/filter"
import { Game, Goal, Player } from "@/types/match"
import { useEffect, useState } from "react"
import Details from "./details/Details"

import { supabase } from "../../../../supabase/supabase"

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function Dashboard({
  fetchLimit = 25,
  filterDate,
  filterBy,
  show1v1,
  show2v2,
}: {
  fetchLimit?: number
  filterDate?: Date
  filterBy: FilterType
  show1v1: boolean
  show2v2: boolean
}) {
  const [validDates, setValidDates] = useState<Set<string>>(new Set())

  const [matchCount, setMatchCount] = useState(fetchLimit)

  const games = useGetMatchesFromSupabase()

  useGetDatesFromSupabase(setValidDates)
  useGetMatchesFromSupabase()

  return (
    <div className="flex h-2/3 w-full flex-col shadow-[-5px_0_15px_5px_rgba(0,0,0,0.2)] xl:h-full xl:flex-2/3 xl:flex-row">
      <div className="flex flex-1 flex-col gap-8 px-2">
        <div className="flex flex-col gap-2 overflow-scroll p-2 sm:p-4">
          <div className="text-muted-foreground flex justify-end text-sm">
            {matchCount} matches
          </div>
          <Log
            allMatches={games}
            show1v1={show1v1}
            show2v2={show2v2}
            setMatchCount={setMatchCount}
            filterBy={filterBy}
          />
        </div>
      </div>
      <div className="flex-1">
        <Details allMatches={games} show1v1={show1v1} show2v2={show2v2} />
      </div>
    </div>
  )

  function useGetDatesFromSupabase(setValidDates) {
    useEffect(() => {
      async function load() {
        const { data: times, error } = await supabase
          .from("matches")
          .select("startEpoch")

        const allTimes = new Set<string>()

        times?.forEach((time) => {
          allTimes.add(
            new Date(time.startEpoch * 1000).toISOString().slice(0, 10),
          )
        })
        console.log(allTimes)
        // set valid dates
        setValidDates(allTimes)
      }
      load()
    }, [])
  }

  function useGetMatchesFromSupabase() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
      async function load() {
        const { data: games, error } = await supabase.from("matches").select(`
         *,
        players (*),
        goals (*)
          `)

        console.log("Supabase games:")
        console.log(games)
        if (error) {
          console.log("Error: ", error)
          return
        }

        if (!games) return

        const allGames: Array<Game> = games?.map((match) => {
          const allPlayers: Array<Player> = match.players.map((player) => {
            const currentPlayer: Player = {
              id: player.id,
              uid: player.uid,
              platform: player.platform,
              team: player.team,
              name: player.name,
              isLocal: player.isLocal,
              score: player.score,
              goals: player.goals,
              assists: player.assists,
              shots: player.shots,
              saves: player.saves,
            }
            return currentPlayer
          })

          const allGoals: Array<Goal> = match.goals.map((goal) => {
            const currentGoal: Goal = {
              id: goal.id,
              uid: goal.uid,
              time: goal.time,
            }
            return currentGoal
          })

          const currentGame: Game = {
            startEpoch: match.startEpoch,
            date: new Date(match.startEpoch * 1000),
            playlist: match.playlist,
            mmrBefore: match.mmrBefore,
            mmrAfter: match.mmrAfter,
            endedOnForfeit: match.endedOnForfeit,
            players: allPlayers,
            goals: allGoals,
          }
          console.log(currentGame)
          return currentGame
        })
        setGames(allGames)
      }
      // return all games
      load()
    }, [])
    return games
  }
}
