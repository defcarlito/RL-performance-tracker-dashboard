import { Game } from "@/types/match"
import MMRChart from "./charts/MMRChart"
import { ONES_PLAYLIST, TWOS_PLAYLIST } from "@/constants"

type detailsProps = {
  allMatches: Array<Game>
  show1v1: boolean
  show2v2: boolean
}

export default function Details({ allMatches, show1v1, show2v2 }: detailsProps) {

  const onesMatchesOnly = allMatches.filter((game) => game.Playlist === ONES_PLAYLIST) 
  const twosMatchesOnly = allMatches.filter((game) => game.Playlist === TWOS_PLAYLIST) 

  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <div className="bg-accent flex flex-row gap-2 rounded-xl border-2 p-2 lg:flex-col">
        <MMRChart allMatches={onesMatchesOnly} playlist={ONES_PLAYLIST} />
        <MMRChart allMatches={twosMatchesOnly} playlist={TWOS_PLAYLIST} />
      </div>
    </div>
  )
}
