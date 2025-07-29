import { ONES_PLAYLIST, TWOS_PLAYLIST } from "@/constants"
import { Game } from "@/types/match"
import MMRChart from "./charts/MMRChart"

type detailsProps = {
  allMatches: Array<Game>
  show1v1: boolean
  show2v2: boolean
}

export default function Details({
  allMatches,
  show1v1,
  show2v2,
}: detailsProps) {
  const onesMatchesOnly = allMatches.filter(
    (game) => game.Playlist === ONES_PLAYLIST,
  )
  const twosMatchesOnly = allMatches.filter(
    (game) => game.Playlist === TWOS_PLAYLIST,
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
      <h1 className="text-2xl font-medium">MMR Changes</h1>
      <div className="bg-accent flex flex-row gap-2 rounded-xl border-2 p-2 lg:flex-col">
        <MMRChart allMatches={onesMatchesOnly} playlist={ONES_PLAYLIST} />
        <MMRChart allMatches={twosMatchesOnly} playlist={TWOS_PLAYLIST} />
      </div>
    </div>
  )
}
