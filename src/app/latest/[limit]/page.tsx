"use client"

import Dashboard from "@/components/content/match/Dashboard"
import MatchFilterBar from "@/components/content/match/MatchFilterBar"
import { redirect } from "next/navigation"
import { use, useState } from "react"

export default function LatestMatchesPage({
  params,
}: {
  params: Promise<{ limit: string }>
}) {
  const { limit } = use(params)
  const fetchLimit = parseInt(limit)
  const validLimits = [10, 25, 50]

  if (!validLimits.includes(fetchLimit)) {
    redirect("/latest/25")
  }

  const [show1v1, setShow1v1] = useState<boolean>(true)
  const [show2v2, setShow2v2] = useState<boolean>(true)

  return (
    <div className="0 flex h-screen flex-wrap">
      <div className="bg-sidebar flex h-1/3 w-full flex-col items-center gap-4 xl:h-full xl:flex-1/3 xl:py-8 py-4">
        <div>
          <MatchFilterBar
            filterBy="limit"
            filterDate={undefined}
            fetchLimit={fetchLimit}
            show1v1={show1v1}
            show2v2={show2v2}
            setShow1v1={setShow1v1}
            setShow2v2={setShow2v2}
          />
        </div>
      </div>
      <Dashboard
        fetchLimit={fetchLimit}
        filterBy={"limit"}
        show1v1={show1v1}
        show2v2={show2v2}
      />
    </div>
  )
}
