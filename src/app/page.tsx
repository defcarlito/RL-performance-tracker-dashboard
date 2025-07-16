import Match from "@/components/other/match/Match"
import { Button } from "@/components/ui/button"

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
      <div className="flex h-2/3 w-full flex-col border border-blue-500 xl:h-full xl:flex-2/3 xl:flex-row">
        <div className="flex-1 overflow-scroll flex flex-col gap-2">
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
        </div>
        <div className="flex-1">
          <div>these are stats about the match</div>
        </div>
      </div>
    </div>
  )
}
