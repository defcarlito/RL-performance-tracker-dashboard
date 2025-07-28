import { Game } from "@/types/match"
import MMRChart from "./charts/MMRChart"

type detailsProps = {
  allMatches: Array<Game>
}

export default function Details({allMatches}: detailsProps) {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div>
        <MMRChart allMatches={allMatches}/>
      </div>
    </div>
  )

}