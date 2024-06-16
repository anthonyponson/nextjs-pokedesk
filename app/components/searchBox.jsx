"use client"

import { usePathname, useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { BsSearch } from "react-icons/bs"

function SearchBox() {
  
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  useEffect(() => {
    router.push(`/?search=${searchTerm}`)
  }, [searchTerm, router])
  return (
    <div className="py-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-md dark:bg-neutral-700 focus:outline-none"
      />
    </div>
  )
}

export default SearchBox
