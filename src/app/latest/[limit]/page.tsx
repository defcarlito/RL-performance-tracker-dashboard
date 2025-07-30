"use client"

import { FilterPlaylist } from "@/components/content/match/main-content/Filters"
import Dashboard from "@/components/content/match/MatchDashboard"
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
      <div className="flex h-1/3 w-full flex-col items-center justify-center gap-4 xl:h-full xl:flex-1/3 bg-sidebar">
        {/* profile info section */}
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
        <div>
          <h1 className="text-5xl">BrickBoned</h1>
          <p className="text-muted-foreground">Last played # days ago</p>
        </div>
        <div>
          <p>1v1 - (current)</p>
          <p>2v2 - (current)</p>
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
