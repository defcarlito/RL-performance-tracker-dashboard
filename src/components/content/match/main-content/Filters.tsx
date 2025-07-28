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
import { FilterType } from "@/types/filter"
import { CalendarIcon, HashIcon } from "lucide-react"
import * as React from "react"
import { OnesBadge, TwosBadge } from "@/components/ui/custom-badges"

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
    if (show1v1 && show2v2) return <><OnesBadge /> <TwosBadge /></>
    else if (show1v1) return <OnesBadge />
    else if (show2v2) return <TwosBadge />
    else return "None selected"
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-md rounded-xl">
            Show playlists {">"} {selectedPlaylists()}
          </Button>
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
  filterBy: FilterType
  setFilterBy: React.Dispatch<React.SetStateAction<FilterType>>
}

export function FilterLimit({
  fetchLimit,
  setFetchLimit,
  setFilterDate,
  filterBy,
  setFilterBy,
}: FilterLimitProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {filterBy === "limit" ? (
            <Button
              variant="ghost"
              className="text-md rounded-l-xl rounded-r-none"
            >
              Showing last {fetchLimit} matches
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="text-md text-border bg-muted rounded-l-xl rounded-r-none"
            >
              Showing last {fetchLimit} matches
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={String(fetchLimit)}
            onValueChange={(val) => {
              setFetchLimit(Number(val))
              setFilterDate(undefined)
              setFilterBy("limit")
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

type FilterDateProps = {
  setFilterDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  validDates: Set<string>
  filterBy: FilterType
  setFilterBy: React.Dispatch<React.SetStateAction<FilterType>>
}

export function FilterDate({
  validDates,
  setFilterDate,
  filterBy,
  setFilterBy,
}: FilterDateProps) {
  const [open, setOpen] = useState(false)

  const [date, setDate] = useState<Date>(new Date())

  function formatDateToString(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {filterBy === "date" ? (
          <Button
            id="date-picker"
            variant="ghost"
            className="text-md rounded-l-none rounded-r-xl"
          >
            {formatDateToString(date)} <CalendarIcon className="size-5" />
          </Button>
        ) : (
          <Button
            id="date-picker"
            variant="ghost"
            className="text-md text-border bg-muted rounded-l-none rounded-r-xl"
          >
            {formatDateToString(date)} <CalendarIcon className="size-5" />
          </Button>
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
              setFilterBy("date")
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
