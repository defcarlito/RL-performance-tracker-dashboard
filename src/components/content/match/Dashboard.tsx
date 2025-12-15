import Log from "./main-content/match-log/MatchLog"

import { FilterType } from "@/types/filter"
import { Game, Goal, Player } from "@/types/match"
import { Dispatch, useEffect, useState } from "react"
import Details from "./details/Details"

import { supabase } from "../../../../supabase/supabase"

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
  console.log(validDates) // temp so the linter stops complaining

  const [matchCount, setMatchCount] = useState(fetchLimit)

  const games = useGetMatchesFromSupabase(fetchLimit, filterDate)

  useGetDatesFromSupabase(setValidDates)

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

  function useGetDatesFromSupabase(
    setValidDates: Dispatch<React.SetStateAction<Set<string>>>,
  ) {
    useEffect(() => {
      async function load() {
        const { data: times, error } = await supabase
          .from("matches")
          .select("startEpoch")

        console.log(error) // temp so the linter stops complaining

        const allTimes = new Set<string>()

        times?.forEach((time) => {
          allTimes.add(
            new Date(time.startEpoch * 1000).toISOString().slice(0, 10),
          )
        })
        setValidDates(allTimes)
      }
      load()
    }, [setValidDates])
  }

  function useGetMatchesFromSupabase(limit?: number, date?: Date) {
    const [games, setGames] = useState<Game[]>([])
    useEffect(() => {
      async function load() {
        let games
        if (date) {
          // if picking date
          const { start, end } = epochRangeForDate(date)
          const { data, error } = await supabase
            .from("matches")
            .select(
              `
                *,
                players (*),
                goals (*)
              `,
            )
            .gte("startEpoch", start)
            .lte("startEpoch", end)
            .order("startEpoch", { ascending: false })

          if (error) {
            console.log("Error: ", error)
            return
          }
          games = data
        } else if (limit) {
          // if filtering my limit
          const { data, error } = await supabase
            .from("matches")
            .select(
              `
                *,
                players (*),
                goals (*)
              `,
            )
            .limit(limit)
            .order("startEpoch", { ascending: false })

          if (error) {
            console.log("error: ", error)
            return
          }
          games = data
        }

        if (!games) return

        const allGames: Array<Game> = games?.map((match) => {
          const allPlayers: Array<Player> = match.players.map(
            (player: Player) => {
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
            },
          )

          const allGoals: Array<Goal> = match.goals.map((goal: Goal) => {
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
          return currentGame
        })
        setGames(allGames)
      }
      load()
    }, [date, limit])
    return games
  }
}
function epochRangeForDate(date: Date) {
  const start = Math.floor(new Date(date.setHours(0, 0, 0, 0)).getTime() / 1000)
  const end = Math.floor(
    new Date(date.setHours(23, 59, 59, 999)).getTime() / 1000,
  )
  return { start, end }
}
