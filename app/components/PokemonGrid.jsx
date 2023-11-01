'use client'
import Link from 'next/link'
import logo from '@/public/next.svg'
import loader from '@/public/loader.png'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// Loader component

function Loader() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-4'>
        <Image src={loader} height={100} width={100} alt='img' />
      </div>
      <p className='mt-2 text-gray-600 text-lg'>Loading...</p>
    </div>
  )
}

function PokemonGrid() {
  const [pokemonData, setPokemonData] = useState([])
  const [allPokemonData, setAllPokemonData] = useState([])
  const [loading, setLoading] = useState(true) // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000))
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=10',
          {
            next: {
              revalidate: 60,
            },
          }
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
        setLoading(false) // Set loading to false when data is fetched
      } catch (error) {
        console.error(error)
        setLoading(false) // Set loading to false on error
      }
    }

    fetchData()
  }, [])

  function handleSearch(searchTerm) {
    if (!searchTerm) {
      setPokemonData(allPokemonData)
    } else {
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

      {loading ? (
        // Show the loader while data is being fetched
        <Loader />
      ) : (
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
      )}
    </div>
  )
}

export default PokemonGrid
