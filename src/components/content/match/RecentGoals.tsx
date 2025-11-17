import { useEffect, useState } from "react"

export default function RecentGoals() {

  const [recentGoalUrls, setRecentGoalUrls] = useState<string[]>([])

  useEffect(() => {
    fetch("/api/get-recent-goals", {method: "GET"})
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setRecentGoalUrls(data)
      })
  }, [])
  
  return (
    <div
      id="recent-goals"
      className="grid max-h-full grid-cols-2 gap-4 overflow-y-scroll"
    >
      {recentGoalUrls.map((url, index) => (
        <video src={url} key={index}></video>
      ))}
    </div>
  )
}
