"use client"

import { db } from "@/firebase/config"
import { FilterType } from "@/types/filter"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { Separator } from "@/components/ui/separator"
import { Calendar, Car, Gamepad, Gamepad2 } from "lucide-react"
import { useEffect, useState } from "react"
import { FilterDate, FilterLimit, FilterPlaylist } from "./main-content/Filters"

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
  setShow1v1: any
  setShow2v2: any
}) {
  const [validDates, setValidDates] = useState<Set<string>>(new Set())

  useQueryValidDates(setValidDates)

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Filters</h1>
        <div className="flex flex-col gap-2">
          <div className="bg-card flex w-fit flex-col gap-4 rounded-md p-4 shadow-md">
            <div className="flex flex-col gap-2">
              {filterBy === "limit" ? (
                <h1 className="text-foreground flex items-center gap-2 font-medium">
                  <Gamepad2 className="size-6" /> By latest matches
                </h1>
              ) : (
                <h1 className="text-foreground flex items-center gap-2 font-medium">
                  <Gamepad2 className="size-6" /> By latest matches
                </h1>
              )}
              <FilterLimit fetchLimit={fetchLimit} filterBy={filterBy} />
            </div>
            <Separator className="bg-accent" />
            <div className="flex flex-col gap-2">
              {filterBy === "date" ? (
                <h1 className="text-foreground flex items-center gap-2 font-medium">
                  <Calendar className="size-6" />
                  By date
                </h1>
              ) : (
                <h1 className="text-muted-foreground flex items-center gap-2 font-medium">
                  <Calendar className="size-6" />
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
            <h1 className="text-foreground font-medium flex items-center gap-2">
              <Car className="size-6" />
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
