"use client"
import { useState, useEffect } from "react"
import { fetchData } from "./actions"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

function getTypeStyle(type) {
  const typeStyles = {
    normal: 'bg-gray-400/30 backdrop-blur-sm',
    fire: 'bg-red-500/30 backdrop-blur-sm',
    water: 'bg-blue-500/30 backdrop-blur-sm',
    electric: 'bg-yellow-400/30 backdrop-blur-sm',
    grass: 'bg-green-500/30 backdrop-blur-sm',
    ice: 'bg-cyan-300/30 backdrop-blur-sm',
    fighting: 'bg-orange-700/30 backdrop-blur-sm',
    poison: 'bg-purple-600/30 backdrop-blur-sm',
    ground: 'bg-yellow-600/30 backdrop-blur-sm',
    flying: 'bg-indigo-400/30 backdrop-blur-sm',
    psychic: 'bg-pink-500/30 backdrop-blur-sm',
    bug: 'bg-lime-500/30 backdrop-blur-sm',
    rock: 'bg-yellow-700/30 backdrop-blur-sm',
    ghost: 'bg-indigo-600/30 backdrop-blur-sm',
    dragon: 'bg-indigo-700/30 backdrop-blur-sm',
    dark: 'bg-gray-700/30 backdrop-blur-sm',
    steel: 'bg-gray-400/30 backdrop-blur-sm',
    fairy: 'bg-pink-300/30 backdrop-blur-sm'
    // Add more types as needed
  }
  return typeStyles[type] || 'bg-gray-200/30 backdrop-blur-sm' // default style
}

function InfiniteScrool({ initialPokemon, search }) {
  const [pokemon, setPokemon] = useState(initialPokemon)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [ref, inView] = useInView()

  async function loadMoreData() {
    const next = page + 1
    const pokeData = await fetchData({ page: next, limit: 20, search })
    if (pokeData && pokeData.length > 0) {
      setPage(next)
      setPokemon((prev) => [...prev, ...pokeData])
    } else {
      setHasMore(false)
    }
  }

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreData()
    }
  }, [inView, hasMore])

  useEffect(() => {
    // Reset when search changes
    setPokemon(initialPokemon)
    setPage(0)
    setHasMore(true)
  }, [search, initialPokemon])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {pokemon.map((pokemon, i) => (
          <div className="w-full px-2" key={i}>
            <Link className="block" href={`/${pokemon.name}`}>
              <div className={`p-2 rounded mb-4 ${getTypeStyle(pokemon.types[0].type.name)} shadow-lg`}>
                <h2 className="text-xl text-center text-blue-950 font-semibold">
                  {pokemon.name}
                </h2>
                <img
                  className="mx-auto"
                  height={150}
                  width={150}
                  src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="w-full flex justify-center mt-4">
          <div className="border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
        </div>
      )}
    </>
  )
}

export default InfiniteScrool