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
      <div className="flex flex-col gap-1">
        <h1>Show last matches OR filter by date</h1>
        <div className="bg-secondary flex w-fit items-center rounded-xl border-2 flex-col">
          <div>
            <FilterPlaylist
              show1v1={show1v1}
              setShow1v1={setShow1v1}
              show2v2={show2v2}
              setShow2v2={setShow2v2}
            />
          </div>
          <div className="bg-secondary flex w-fit items-center rounded-xl border-2">
            <FilterLimit fetchLimit={fetchLimit} filterBy={filterBy} />
            <Separator orientation="vertical" className="border-1" />
            <FilterDate
              filterDate={filterDate}
              validDates={validDates}
              filterBy={filterBy}
            />
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
