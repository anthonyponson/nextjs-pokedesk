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
    fire: 'from-orange-500/80 to-red-600/80',
    water: 'from-cyan-400/80 to-cyan-500/80',
    grass: 'from-green-500/80 to-green-600/80',
    electric: 'from-yellow-400/80 to-yellow-500/80',
    ice: 'from-blue-200/80 to-blue-300/80',
    fighting: 'from-red-600/80 to-red-700/80',
    poison: 'from-purple-500/80 to-purple-600/80',
    ground: 'from-yellow-600/80 to-yellow-700/80',
    flying: 'from-indigo-200/80 to-indigo-300/80',
    psychic: 'from-pink-500/80 to-pink-600/80',
    bug: 'from-green-600/80 to-green-700/80',
    rock: 'from-gray-600/80 to-gray-700/80',
    ghost: 'from-purple-800/80 to-purple-900/80',
    dragon: 'from-purple-600/80 to-purple-700/80',
    dark: 'from-gray-700/80 to-gray-800/80',
    steel: 'from-gray-400/80 to-gray-500/80',
    fairy: 'from-pink-300/80 to-pink-400/80',
    normal: 'from-gray-400/80 to-gray-500/80',
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
    if (!pokemon || !pokemon.types || pokemon.types.length === 0) return 'from-gray-200/80 to-gray-300/80'
    return typeColors[pokemon.types[0].type.name] || 'from-gray-200/80 to-gray-300/80'
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-3xl mx-auto bg-white/30 backdrop-blur-md rounded-xl shadow-lg overflow-hidden md:max-w-2xl`}>
        <div className={`md:flex bg-gradient-to-br ${getBackgroundColor()}`}>
          <div className={`md:flex-shrink-0`}>
            {pokemon && (
              <div className={`h-48 w-full md:w-48 flex items-center justify-center`}>
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
              <div className="uppercase tracking-wide text-sm text-white font-semibold">
                {pokemon.types.map(type => type.type.name).join(', ')}
              </div>
            )}
            <h1 className="block mt-1 text-lg leading-tight font-medium text-white capitalize">
              {name.pokemon}
            </h1>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2 text-white">Stats</h2>
              {stats.map((stat, i) => (
                <div className="mb-3" key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-white capitalize">
                      {stat.stat.name}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200/50 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2 text-white">Abilities</h2>
              <ul className="list-disc list-inside text-white">
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