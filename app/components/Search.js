'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

function Search() {
  const [pokemonData, setPokemonData] = useState([])
  const [allPokemonData, setAllPokemonData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        )
        const data = await response.json()
        setPokemonData(data.results)
        setAllPokemonData(data.results)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  function handleSearch(searchTerm) {
    if (!searchTerm) {
      // If the search term is empty, display all Pokémon
      setPokemonData(allPokemonData)
    } else {
      // Filter Pokémon based on the entered name
      const filteredPokemon = allPokemonData.filter(poke =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setPokemonData(filteredPokemon)
    }
  }

  return (
    <div>
      <h2 className='text-center text-3xl font-semibold'>Poke Desk</h2>
      <input
        className='text-black'
        type='text'
        placeholder='Enter Pokémon Name'
        onChange={e => handleSearch(e.target.value)}
      />
      {/* Render the filtered or all Pokemon data here */}
      {pokemonData.map((pokemon, i) => (
        <Link href={`${pokemon.name}`}>
          <div className='flex flex-col justify-center md:flex-row md:flex-wrap'>
            <div className='lg:w-1/3 px-2' key={i}>
              <div className='bg-gray-200 p-2 rounded mb-4'>
                <h2 className='text-xl text-blue-950 font-semibold'>
                  {pokemon.name}
                </h2>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Search
