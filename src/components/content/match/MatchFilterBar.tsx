"use client"

import { Calendar, Car, Gamepad2 } from "lucide-react"
import { Dispatch, useEffect, useState } from "react"
import { FilterDate, FilterLimit, FilterPlaylist } from "./main-content/Filters"
import { supabase } from "../../../../supabase/supabase"
import { FilterType } from "@/types/filter"

export default function MatchFilterBar({
  fetchLimit = 25,
  filterDate,
  filterBy,
  show1v1,
  show2v2,
  setShow1v1,
  setShow2v2,
}: {
  fetchLimit?: number
  filterDate?: Date
  filterBy: FilterType
  show1v1: boolean
  show2v2: boolean
  setShow1v1: Dispatch<React.SetStateAction<boolean>>
  setShow2v2: Dispatch<React.SetStateAction<boolean>>
}) {
  const [validDates, setValidDates] = useState<Set<string>>(new Set())

  useGetDatesFromSupabase(setValidDates)

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="pl-2 text-2xl font-semibold">Filters</h1>
        <div className="flex gap-2 xl:flex-col">
          <div className="bg-card flex w-fit flex-col gap-4 rounded-md p-4 shadow-md">
            <div className="flex flex-col gap-2">
              {filterBy === "limit" ? (
                <h1 className="text-foreground flex items-center gap-2 font-medium">
                  <div className="bg-accent/75 rounded-lg p-1 shadow-md">
                    <Gamepad2 className="size-6" />
                  </div>
                  By latest matches
                </h1>
              ) : (
                <h1 className="text-muted-foreground flex items-center gap-2 font-medium">
                  <div className="bg-accent/75 rounded-lg p-1 shadow-md">
                    <Gamepad2 className="size-6" />
                  </div>
                  By latest matches
                </h1>
              )}
              <FilterLimit fetchLimit={fetchLimit} filterBy={filterBy} />
            </div>
            <div className="text-accent flex items-center justify-evenly gap-2">
              <span className="border-accent w-full border-1" />
              OR
              <span className="border-accent w-full border-1" />
            </div>
            <div className="flex flex-col gap-2">
              {filterBy === "date" ? (
                <h1 className="text-foreground flex items-center gap-2 font-medium">
                  <div className="bg-accent/75 rounded-lg p-1 shadow-md">
                    <Calendar className="size-6" />
                  </div>
                  By date
                </h1>
              ) : (
                <h1 className="text-muted-foreground flex items-center gap-2 font-medium">
                  <div className="bg-accent/75 rounded-lg p-1 shadow-md">
                    <Calendar className="size-6" />
                  </div>
                  By date
                </h1>
              )}
              <FilterDate
                filterDate={filterDate}
                validDates={validDates}
                filterBy={filterBy}
              />
            </div>
          </div>
          <div className="bg-card flex w-full flex-col gap-2 rounded-md p-4 shadow-md">
            <h1 className="text-foreground flex items-center gap-2 font-medium">
              <div className="bg-accent/75 rounded-lg p-1 shadow-md">
                <Car className="size-6" />
              </div>
              Show playlists
            </h1>
            <div className="flex gap-2">
              <FilterPlaylist
                show1v1={show1v1}
                setShow1v1={setShow1v1}
                show2v2={show2v2}
                setShow2v2={setShow2v2}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function useGetDatesFromSupabase(
  setValidDates: Dispatch<React.SetStateAction<Set<string>>>,
) {
  useEffect(() => {
    async function load() {
      const { data: times, error } = await supabase
        .from("matches")
        .select("startEpoch")

      console.log(error) // get linter to stop complaining

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

