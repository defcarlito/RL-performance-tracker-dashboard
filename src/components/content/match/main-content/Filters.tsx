"use client"

import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroup,
} from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { OnesBadge, TwosBadge } from "@/components/ui/custom-badges"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FilterType } from "@/types/filter"
import { CalendarIcon, HashIcon } from "lucide-react"
import * as React from "react"

type FilterPlaylistProps = {
  show1v1: boolean
  setShow1v1: React.Dispatch<React.SetStateAction<boolean>>
  show2v2: boolean
  setShow2v2: React.Dispatch<React.SetStateAction<boolean>>
}

export function FilterPlaylist({
  show1v1,
  setShow1v1,
  show2v2,
  setShow2v2,
}: FilterPlaylistProps) {
  const selectedPlaylists = () => {
    if (show1v1 && show2v2)
      return (
        <>
          <OnesBadge /> <TwosBadge />
        </>
      )
    else if (show1v1) return <OnesBadge />
    else if (show2v2) return <TwosBadge />
    else return "None selected"
  }

  return (
    <>
      {show1v1 ? (
        <Badge
          asChild
          className="bg-chart-1/60 text-foreground hover:bg-chart-1 cursor-pointer border-2 text-lg"
        >
          <button onClick={() => setShow1v1(!show1v1)}>1v1</button>
        </Badge>
      ) : (
        <Badge
          asChild
          className="border-chart-1/60 text-chart-1 hover:border-chart-1 cursor-pointer border-2 bg-transparent text-lg"
        >
          <button onClick={() => setShow1v1(!show1v1)}>1v1</button>
        </Badge>
      )}
      {show2v2 ? (
        <Badge className="bg-chart-4/60 text-foreground hover:bg-chart-4 cursor-pointer border-2 text-lg">
          <button onClick={() => setShow2v2(!show2v2)}>2v2</button>
        </Badge>
      ) : (
        <Badge className="border-chart-4/60 text-chart-4 hover:border-chart-4 cursor-pointer border-2 bg-transparent text-lg">
          <button onClick={() => setShow2v2(!show2v2)}>2v2</button>
        </Badge>
      )}
    </>
  )
}

type FilterLimitProps = {
  fetchLimit: number
  filterBy: FilterType
}

export function FilterLimit({ fetchLimit, filterBy }: FilterLimitProps) {
  const router = useRouter()

  return (
    <div className="flex gap-2">
      {fetchLimit === 10 && filterBy === "limit" ? (
        <Badge
          asChild
          className="bg-accent/60 text-foreground cursor-pointer border-2 text-lg shadow-md"
        >
          <button onClick={() => router.push("/latest/10")}>10</button>
        </Badge>
      ) : (
        <Badge
          asChild
          className="border-accent/60 text-accent cursor-pointer border-2 bg-transparent text-lg shadow-md"
        >
          <button onClick={() => router.push("/latest/10")}>10</button>
        </Badge>
      )}
      {fetchLimit === 25 && filterBy === "limit" ? (
        <Badge
          asChild
          className="bg-accent/60 text-foreground cursor-pointer border-2 text-lg shadow-md"
        >
          <button onClick={() => router.push("/latest/25")}>25</button>
        </Badge>
      ) : (
        <Badge
          asChild
          className="border-accent/60 text-accent cursor-pointer border-2 bg-transparent text-lg shadow-md"
        >
          <button onClick={() => router.push("/latest/25")}>25</button>
        </Badge>
      )}
      {fetchLimit === 50 && filterBy === "limit" ? (
        <Badge
          asChild
          className="bg-accent/60 text-foreground cursor-pointer border-2 text-lg shadow-md"
        >
          <button onClick={() => router.push("/latest/50")}>50</button>
        </Badge>
      ) : (
        <Badge
          asChild
          className="border-accent/60 text-accent cursor-pointer border-2 bg-transparent text-lg shadow-md"
        >
          <button onClick={() => router.push("/latest/50")}>50</button>
        </Badge>
      )}
    </div>
  )
}

{
  /* <DropdownMenu>
  <DropdownMenuTrigger asChild>
    {filterBy === "limit" ? (
      <Button
        variant="ghost"
        className="text-md rounded-l-xl rounded-r-none"
      >
        Showing the last {fetchLimit} matches
      </Button>
    ) : (
      <Button
        variant="ghost"
        className="text-md text-border bg-muted rounded-l-xl rounded-r-none"
      >
        Filter by latest matches
      </Button>
    )}
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuRadioGroup
      value={String(fetchLimit)}
      onValueChange={(val) => {
        const limit = Number(val)
        router.push(`/latest/${limit}`)
      }}
    >
      <DropdownMenuRadioItem value="10">10 latest</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="25">25 latest</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="50">50 latest</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu> */
}

type FilterDateProps = {
  validDates: Set<string>
  filterBy: FilterType
  filterDate: Date | undefined
}

export function FilterDate({
  validDates,
  filterBy,
  filterDate,
}: FilterDateProps) {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  function formatDateToString(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {filterBy === "date" ? (
          <Badge
            asChild
            className="bg-accent/60 text-foreground cursor-pointer border-2 text-lg shadow-md"
          >
            <button>{filterDate?.toLocaleDateString()}</button>
          </Badge>
        ) : (
          <Badge
            asChild
            className="border-accent/60 text-accent cursor-pointer border-2 bg-transparent text-lg shadow-md"
          >
            <button>Pick a date</button>
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="single"
          selected={filterDate}
          captionLayout="dropdown"
          disabled={(date) => {
            if (!date) return true
            return !validDates.has(formatDateToString(date))
          }}
          onSelect={(date) => {
            if (date) {
              const iso = date.toISOString().split("T")[0]
              router.push(`/date/${iso}`)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
