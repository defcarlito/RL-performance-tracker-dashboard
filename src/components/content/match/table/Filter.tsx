"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

type FilterProps = {
  show1v1: boolean
  setShow1v1: React.Dispatch<React.SetStateAction<boolean>>
  show2v2: boolean
  setShow2v2: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Filter({ show1v1, setShow1v1, show2v2, setShow2v2 }: FilterProps) {
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
