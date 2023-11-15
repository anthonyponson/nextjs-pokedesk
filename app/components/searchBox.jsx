'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    router.push(`/?search=${searchTerm}`)
  }, [searchTerm, router])

  return (
    <div>
      <input
        type='text'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500'
      />
    </div>
  )
}

export default SearchBox
