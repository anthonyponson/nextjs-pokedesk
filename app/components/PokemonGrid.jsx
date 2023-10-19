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
        const results = data.results

        const getPokemon = await Promise.all(
          results.map(async pokemon => {
            const id = pokemon.url.split('/')[6]
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

            return {
              id,
              name: pokemon.name,
              image,
            }
          })
        )
        setPokemonData(getPokemon)
        setAllPokemonData(getPokemon) // Store all Pokémon data here
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
      // Filter Pokémon based on the entered name, including images
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
                <img src={pokemon.image} alt={pokemon.name} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonGrid
