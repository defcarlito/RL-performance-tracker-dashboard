"use client"

import Dashboard from "@/components/content/match/MatchDashboard"
import MatchFilterBar from "@/components/content/match/MatchFilterBar"
import { redirect } from "next/navigation"
import { use, useState } from "react"

export default function DatePage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date } = use(params)
  const dateParam = date

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
    <div className="0 flex h-screen flex-wrap xl:py-16">
      <div className="flex h-1/3 w-full flex-col items-center justify-center gap-4 xl:h-full xl:flex-1/3">
        {/* profile info section */}
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
        filterDate={parsedDate}
        filterBy={"date"}
        show1v1={show1v1}
        show2v2={show2v2}
      />
    </div>
  )
}
