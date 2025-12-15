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
  // get linter to stop complaining
  console.log(show1v1)
  console.log(show2v2)

  const onesMatchesOnly = allMatches.filter(
    (game) => game.playlist === ONES_PLAYLIST,
  )
  const twosMatchesOnly = allMatches.filter(
    (game) => game.playlist === TWOS_PLAYLIST,
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
      <div className="flex h-full w-full flex-row justify-center gap-2 p-8 xl:flex-col xl:p-0 xl:py-8 xl:pr-8">
        <MMRChart allMatches={onesMatchesOnly} playlist={ONES_PLAYLIST} />
        <MMRChart allMatches={twosMatchesOnly} playlist={TWOS_PLAYLIST} />
      </div>
    </div>
  )
}
