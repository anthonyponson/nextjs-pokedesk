"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useParams } from "next/navigation"
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

function Page() {
  const [pokemon, setPokemon] = useState(null)
  const [abilities, setAbilities] = useState([])
  const [stats, setStats] = useState([])
  const router = useParams()
  const name = router

  const { theme, setTheme } = useTheme()

  const typeColors = {
    fire: 'from-orange-500 to-red-600',
    water: 'from-blue-500 to-blue-600',
    grass: 'from-green-500 to-green-600',
    electric: 'from-yellow-400 to-yellow-500',
    ice: 'from-blue-200 to-blue-300',
    fighting: 'from-red-600 to-red-700',
    poison: 'from-purple-500 to-purple-600',
    ground: 'from-yellow-600 to-yellow-700',
    flying: 'from-indigo-200 to-indigo-300',
    psychic: 'from-pink-500 to-pink-600',
    bug: 'from-green-600 to-green-700',
    rock: 'from-gray-600 to-gray-700',
    ghost: 'from-purple-800 to-purple-900',
    dragon: 'from-purple-600 to-purple-700',
    dark: 'from-gray-700 to-gray-800',
    steel: 'from-gray-400 to-gray-500',
    fairy: 'from-pink-300 to-pink-400',
    normal: 'from-gray-400 to-gray-500',
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.pokemon}`
        )
        const data = await response.json()
        setPokemon(data)
        setStats(data.stats)
        setAbilities(data.abilities)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPokemon()
  }, [name.pokemon])

  const getBackgroundColor = () => {
    if (!pokemon || !pokemon.types || pokemon.types.length === 0) return 'from-gray-200 to-gray-300'
    return typeColors[pokemon.types[0].type.name] || 'from-gray-200 to-gray-300'
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl`}>
        <div className={`md:flex`}>
          <div className={`md:flex-shrink-0`}>
            {pokemon && (
              <div className={`h-48 w-full md:w-48 bg-gradient-to-br ${getBackgroundColor()} flex items-center justify-center`}>
                <img
                  className="h-32 w-32 object-contain"
                  src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                />
              </div>
            )}
          </div>
          <div className="p-8">
            {pokemon && (
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {pokemon.types.map(type => type.type.name).join(', ')}
              </div>
            )}
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black capitalize">
              {name.pokemon}
            </h1>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Stats</h2>
              {stats.map((stat, i) => (
                <div className="mb-3" key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 capitalize">
                      {stat.stat.name}
                    </span>
                    <span className="text-sm font-medium text-blue-700">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Abilities</h2>
              <ul className="list-disc list-inside">
                {abilities.map((ability, index) => (
                  <li key={index} className="capitalize">{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page