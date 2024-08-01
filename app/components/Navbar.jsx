"use client"

import React, { useState } from "react"
import { useTheme } from "next-themes"
import { BsMoonFill, BsSunFill } from "react-icons/bs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import SearchBox from "./searchBox"

function Navbar() {
  const pathname = usePathname()
  const shouldHideNavbar = /^\/[a-zA-Z]+$/.test(pathname)
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <div className="w-full p-4 dark:bg-teal-400">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-neutral-50">
            <Link href="/">PokeDesk</Link>
          </h1>
          {!shouldHideNavbar && <SearchBox />}
  
        </nav>
      </div>
    </div>
  )
}

export default Navbar
