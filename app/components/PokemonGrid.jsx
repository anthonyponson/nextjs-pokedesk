'use client'
import Link from 'next/link'
import logo from '@/public/next.svg'
import loader from '@/public/loader.png'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'

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
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) // Set loading to true before fetching data

        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=20' // Fetch only 20 Pokémon initially
        )
        const data = await response.json()
        const results = data.results
        console.log(results)

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
    setSearchTerm(searchTerm) // Update the searchTerm state
    if (!searchTerm) {
      setPokemonData(allPokemonData)
    } else {
      const filteredPokemon = allPokemonData.filter(poke =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setPokemonData(filteredPokemon)
    }
  }

  // Function to load more Pokémon when the scroll reaches the bottom
  // ...

  const loadMorePokemon = async () => {
    try {
      // Fetch more Pokémon data
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
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

      setPokemonData(prevData => [...prevData, ...getPokemon])
      setAllPokemonData(prevData => [...prevData, ...getPokemon])
      setPage(prevPage => prevPage + 1)
    } catch (error) {
      console.error(error)
    }
  }

  // ...

  return (
    <div className='w-[90%] mx-auto'>
      <input
        className='text-black mt-4 border rounded-md p-2 focus:outline-none focus:border-teal-400'
        type='text'
        placeholder='Enter Pokémon Name'
        onChange={e => handleSearch(e.target.value)}
      />

      {loading ? ( // Show Loader component when loading is true
        <Loader />
      ) : (
        <InfiniteScroll
          loader={<Loader />}
          dataLength={pokemonData.length} // This is important to track the length of the data
          next={loadMorePokemon} // Function to load more Pokémon
          hasMore={true} // Set to true to enable infinite scrolling
          endMessage={<p className='text-center'>No more Pokémon to load.</p>} // Message to display when all Pokémon are loaded
        >
          <div className='flex flex-wrap pt-10 mx-auto'>
            {pokemonData.map((pokemon, i) => (
              <div className='w-full sm:w-1/2 md:w-1/3 px-2' key={i}>
                <Link className='block' href={`/${pokemon.name}`}>
                  <div className='bg-gray-200 p-2 rounded mb-4'>
                    <h2 className='text-xl text-center text-blue-950 font-semibold'>
                      {pokemon.name}
                    </h2>
                    <img
                      className='mx-auto'
                      height={150}
                      width={150}
                      src={pokemon.image}
                      alt={pokemon.name}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default PokemonGrid
