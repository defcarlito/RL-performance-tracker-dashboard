import Log from "./main-content/match-log/MatchLog"

import { db } from "@/firebase/config"
import { FilterType } from "@/types/filter"
import { Game, Goal, Player } from "@/types/match"
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { useEffect, useMemo, useState } from "react"
import Details from "./details/Details"

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

  const { games, loading } = useQueryMatches(fetchLimit, filterDate)

  useQueryValidDates(setValidDates)

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
}

function useQueryValidDates(setValidDates: any): void {
  
}

function useQueryMatches(fetchLimit, filterDate){
  
}
