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

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>Playlist</DropdownMenuTrigger>
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
}

export function FilterLimit({fetchLimit, setFetchLimit}: FilterLimitProps) {

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>Limit</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={String(fetchLimit)} onValueChange={(val) => setFetchLimit(Number(val))}>
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
}

export function FilterDate({ setFilterDate }: FilterDateProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
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
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
                setFilterDate(date)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
