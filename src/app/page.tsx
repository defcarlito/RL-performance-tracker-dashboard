import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex h-screen flex-wrap">
      <div className="flex h-1/3 w-full flex-col items-center justify-center gap-4 border border-red-500 lg:h-full lg:flex-1/3">
        <div>
          <h1 className="text-5xl">BrickBoned</h1>
          <p>Last played # days ago</p>
        </div>
        <div>
          <p>1v1 - (current)</p>
          <p>2v2 - (current)</p>
        </div>
      </div>
      <div className="flex h-2/3 w-full flex-col border border-blue-500 lg:h-full lg:flex-2/3 lg:flex-row">
        <div className="flex-1 overflow-scroll">
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
          <div>match</div>
        </div>
        <div className="flex-1 bg-gray-200">
          <div>these are stats about the match</div>
        </div>
      </div>
    </div>
  )
}
