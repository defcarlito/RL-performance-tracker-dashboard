import Dashboard from "@/components/content/match/MatchDashboard"
import { redirect } from "next/navigation"

export default function DatePage({ params }: { params: { date: string } }) {
  
  const dateParam = params.date

  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam)
  if (!isValidDate) {
    redirect("/latest/25")
  }

  const [year, month, day] = dateParam.split("-").map(Number)
  const parsedDate = new Date(year, month - 1, day)
  if (isNaN(parsedDate.getTime())) {
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
      <Dashboard filterDate={parsedDate} filterBy={"date"} />
    </div>
  )
}
