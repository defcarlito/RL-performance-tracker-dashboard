"use client"

import Dashboard from "@/components/content/match/Dashboard"
import MatchFilterBar from "@/components/content/match/MatchFilterBar"
import RecentGoals from "@/components/content/match/RecentGoals"
import { redirect } from "next/navigation"
import { use, useState } from "react"

export default function DatePage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date } = use(params)
  const dateParam = date

  // check YYYY-MM-DD format
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam)
  if (!isValidDate) {
    redirect("/latest/25")
  }

  const [year, month, day] = dateParam.split("-").map(Number)
  const parsedDate = new Date(year, month - 1, day)
  if (isNaN(parsedDate.getTime())) {
    redirect("/latest/25")
  }

  const [show1v1, setShow1v1] = useState<boolean>(true)
  const [show2v2, setShow2v2] = useState<boolean>(true)

  return (
    <div className="0 flex h-screen flex-wrap">
      <div className="bg-sidebar flex h-1/3 w-full flex-row items-center justify-center gap-12 py-4 xl:h-full xl:flex-1/3 xl:flex-col xl:py-8">
        <div>
          <MatchFilterBar
            filterBy="date"
            filterDate={parsedDate}
            fetchLimit={undefined}
            show1v1={show1v1}
            show2v2={show2v2}
            setShow1v1={setShow1v1}
            setShow2v2={setShow2v2}
          />
        </div>
      </div>
      <Dashboard
        filterDate={parsedDate}
        filterBy={"date"}
        show1v1={show1v1}
        show2v2={show2v2}
      />
    </div>
  )
}
