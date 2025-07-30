import Dashboard from "@/components/content/match/MatchDashboard"
import { redirect } from "next/navigation"

export default function LatestMatchesPage({
  params,
}: {
  params: { limit: string }
}) {
  const fetchLimit = parseInt(params.limit)
  const validLimits = [10, 25, 50]

  if (!validLimits.includes(fetchLimit)) {
    redirect("/latest/25")
  }

  return (
    <div className="0 flex h-screen flex-wrap xl:py-16">
      <div className="flex h-1/3 w-full flex-col items-center justify-center gap-4 xl:h-full xl:flex-1/3">
        {/* profile info section */}
        <div>
          <h1 className="text-5xl">BrickBoned</h1>
          <p>Last played # days ago</p>
        </div>
        <div>
          <p>1v1 - (current)</p>
          <p>2v2 - (current)</p>
        </div>
      </div>
      <Dashboard fetchLimit={fetchLimit} filterBy={"limit"} />
    </div>
  )
}
