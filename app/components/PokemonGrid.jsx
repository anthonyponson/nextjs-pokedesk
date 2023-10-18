'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

function PokemonGrid() {
  const [pokemonData, setPokemonData] = useState([])
  const [allPokemonData, setAllPokemonData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1000'
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
    <div className='w-[90%] mx-auto'>
      <h2 className='text-center text-3xl font-semibold'>Poke Desk</h2>
      <input
        className='text-black'
        type='text'
        placeholder='Enter Pokémon Name'
        onChange={e => handleSearch(e.target.value)}
      />

      <div className='flex flex-wrap -mx-2'>
        {pokemonData.map((pokemon, i) => (
          <div className='w-full sm:w-1/2 md:w-1/3 px-2' key={i}>
            <Link className='block' href={`/${pokemon.name}`}>
              <div className='bg-gray-200 p-2 rounded mb-4'>
                <h2 className='text-xl text-center text-blue-950 font-semibold'>
                  {pokemon.name}
                </h2>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    i + 1
                  }.png`}
                  alt={pokemon.name}
                  className='mx-auto'
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonGrid
