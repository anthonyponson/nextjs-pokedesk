'use client'
import Link from 'next/link'
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
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
            (page - 1) * 20
          }`,
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

        setPokemonData(prevData => [...prevData, ...getPokemon])
        setAllPokemonData(prevData => [...prevData, ...getPokemon])
        setTotalPages(Math.ceil(data.count / 20))
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [page])

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

  function fetchMoreData() {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1)
    }
  }

  return (
    <div className='w-[90%] mx-auto'>
      <h2 className='text-center text-3xl font-semibold'>Poke Desk</h2>
      {/* <input
        className='text-black border-2 border-solid border-teal-400'
        type='text'
        placeholder='Enter Pokémon Name'
        onChange={e => handleSearch(e.target.value)}
      /> */}
      <div class='relative rounded-md mt-3'>
        <input
          type='text'
          class='w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base'
          placeholder='Search...'
          onChange={e => handleSearch(e.target.value)}
        />
        <div class='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <svg
            class='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-4-4'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 11a4 4 0 11-8 0 4 4 0 018 0z'
            />
          </svg>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={pokemonData.length}
          next={fetchMoreData}
          hasMore={page < totalPages}
          loader={<Loader />}
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
