"use client"

import {
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroup,
} from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, HashIcon } from "lucide-react"
import * as React from "react"

type Checked = DropdownMenuCheckboxItemProps["checked"]

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
    if (show1v1 && show2v2) return "1v1, 2v2"
    else if (show1v1) return "1v1"
    else if (show2v2) return "2v2"
    else return "None"

  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-md rounded-xl">Playlist {">"} {selectedPlaylists()}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={show1v1}
            onCheckedChange={() => {
              setShow1v1((prev) => !prev)
            }}
          >
            1v1
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={show2v2}
            onCheckedChange={() => {
              setShow2v2((prev) => !prev)
            }}
          >
            2v2
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

type FilterLimitProps = {
  fetchLimit: number
  setFetchLimit: React.Dispatch<React.SetStateAction<number>>
  setFilterDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export function FilterLimit({ fetchLimit, setFetchLimit, setFilterDate }: FilterLimitProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-xl text-md">Showing last {fetchLimit} matches</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={String(fetchLimit)}
            onValueChange={(val) => {
              setFetchLimit(Number(val))
              setFilterDate(undefined)
            }}
          >
            <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="25">25</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

type FilterDateProps = {
  setFilterDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  validDates: Set<string>
}

export function FilterDate({ validDates, setFilterDate }: FilterDateProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01"),
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

  function formatDateToString(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id="date-picker" variant="ghost" size="icon" className="rounded-xl">
          <CalendarIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          disabled={(date) => {
            if (!date) return true
            return !validDates.has(formatDateToString(date))
          }}
          onSelect={(date) => {
            if (date) {
              setFilterDate(date)
              setDate(date)
              setOpen(false)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
