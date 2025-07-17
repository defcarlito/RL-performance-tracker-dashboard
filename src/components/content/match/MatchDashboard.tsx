import Log from "./log/MatchLog";

export default function Dashboard() {
  return (
    <div className="flex h-2/3 w-full flex-col border border-blue-500 xl:h-full xl:flex-2/3 xl:flex-row">
      <div className="flex-1 overflow-scroll">
          <Log />
      </div>
      <div className="flex-1">
        <div>these are stats about the match</div>
      </div>
    </div>
  )
}