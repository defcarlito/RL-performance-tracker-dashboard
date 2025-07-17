import Dashboard from "@/components/content/match/MatchDashboard"

export default function Home() {
  return (
    <div className="flex h-screen flex-wrap">
      <div className="flex h-1/3 w-full flex-col items-center justify-center gap-4 border border-red-500 xl:h-full xl:flex-1/3">
        <div>
          <h1 className="text-5xl">BrickBoned</h1>
          <p>Last played # days ago</p>
        </div>
        <div>
          <p>1v1 - (current)</p>
          <p>2v2 - (current)</p>
        </div>
      </div>
      <Dashboard />
    </div>
  )
}
