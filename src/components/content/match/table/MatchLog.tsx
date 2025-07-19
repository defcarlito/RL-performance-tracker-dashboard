import { Game } from "@/types/match"

type logProps = {
  allMatches: Array<Game>
}

export default function Log({ allMatches }: logProps) {
  return (
    <div className="flex flex-col gap-2 p-2">
      {allMatches.map((match: Game) => (
        <Match matchData={match} />
      ))}
    </div>
  )
}

type matchProps = {
  matchData: Game
}

export function Match({ matchData }: matchProps) {
  return (
    <div className="to-card border-border flex flex-col rounded-2xl border-2 bg-gradient-to-r from-green-400/50 to-15% p-2">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl">W</div>
          <div>3-2</div>
        </div>
        <div>vs. Brickboned & BrickBone's TM8</div>
        <div>{matchData.StartDate}</div>
      </div>
      <div className="align-start flex flex-wrap">
        <div className="flex gap-4 text-sm">
          <div>+9 MMR</div>
        </div>
      </div>
    </div>
  )
}
