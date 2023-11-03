'use client'

import React, { useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'

function Navbar() {
  const [dark, setDark] = useState(false)

  const toggleDarkMode = () => {
    setDark(!dark) // Toggle the dark mode state
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='w-full bg-neutral-100 p-4 dark:bg-gray-900'>
        <nav className='container mx-auto flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-teal-400'>PokeDesk</h1>
          <BsFillMoonStarsFill
            className='cursor-pointer text-gray-900 dark:text-teal-400'
            onClick={toggleDarkMode}
          />
        </nav>
      </div>
    </div>
  )
}

export default Navbar
