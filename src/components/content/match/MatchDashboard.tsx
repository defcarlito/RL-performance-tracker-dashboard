"use client"

import Log from "./log/MatchLog"

import { db } from "@/firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"

import { useEffect } from "react"

export default function Dashboard() {
  useEffect(() => {
    const matchDatesRef = query(
      collection(db, "matches"),
      where("FormatVersion", "==", "8.0"),
    )

    getDocs(matchDatesRef).then((snapshot) => {
      console.log(snapshot.docs.map((match) => match.data()))
    })
  }, [])

  return (
    <div className="flex h-2/3 w-full flex-col border border-blue-500 xl:h-full xl:flex-2/3 xl:flex-row">
      <div className="flex-1 overflow-scroll">
        <Log />
      </div>
      <div className="flex-1">pretend theres match info here</div>
    </div>
  )
}
