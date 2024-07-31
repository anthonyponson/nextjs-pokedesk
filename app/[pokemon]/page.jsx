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
    fire: 'from-orange-100 to-orange-200',
    water: 'from-blue-100 to-blue-200',
    grass: 'from-green-100 to-green-200',
    electric: 'from-yellow-100 to-yellow-200',
    ice: 'from-cyan-100 to-cyan-200',
    fighting: 'from-red-100 to-red-200',
    poison: 'from-purple-100 to-purple-200',
    ground: 'from-amber-100 to-amber-200',
    flying: 'from-indigo-100 to-indigo-200',
    psychic: 'from-pink-100 to-pink-200',
    bug: 'from-lime-100 to-lime-200',
    rock: 'from-stone-100 to-stone-200',
    ghost: 'from-violet-100 to-violet-200',
    dragon: 'from-indigo-100 to-indigo-200',
    dark: 'from-gray-200 to-gray-300',
    steel: 'from-slate-100 to-slate-200',
    fairy: 'from-rose-100 to-rose-200',
    normal: 'from-neutral-100 to-neutral-200',
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
    if (!pokemon || !pokemon.types || pokemon.types.length === 0) return 'from-gray-100 to-gray-200'
    return typeColors[pokemon.types[0].type.name] || 'from-gray-100 to-gray-200'
  }

  const getTextColor = () => {
    if (!pokemon || !pokemon.types || pokemon.types.length === 0) return 'text-gray-800'
    const type = pokemon.types[0].type.name
    return type === 'dark' ? 'text-gray-800' : 'text-gray-700'
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className={`max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200`}>
        <div className={`md:flex bg-gradient-to-br ${getBackgroundColor()} p-6 md:p-8`}>
          <div className={`md:flex-shrink-0 flex items-center justify-center mb-6 md:mb-0 md:mr-8`}>
            {pokemon && (
              <img
                className="h-48 w-48 object-contain filter drop-shadow-lg transition-transform duration-300 hover:scale-110"
                src={pokemon.sprites.other.home.front_default}
                alt={pokemon.name}
              />
            )}
          </div>
          <div className="flex-grow">
            {pokemon && (
              <div className="flex flex-wrap gap-2 mb-4">
                {pokemon.types.map((type, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium bg-white/40 ${getTextColor()}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
            )}
            <h1 className={`text-3xl font-bold capitalize mb-4 ${getTextColor()}`}>
              {name.pokemon}
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${getTextColor()}`}>Stats</h2>
                {stats.map((stat, i) => (
                  <div className="mb-3" key={i}>
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm font-medium ${getTextColor()} capitalize`}>
                        {stat.stat.name}
                      </span>
                      <span className={`text-sm font-medium ${getTextColor()}`}>
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                      <div
                        className="bg-gray-600 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-4 ${getTextColor()}`}>Abilities</h2>
                <ul className="space-y-2">
                  {abilities.map((ability, index) => (
                    <li key={index} className={`${getTextColor()} capitalize flex items-center`}>
                      <span className="mr-2">•</span>
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed bottom-5 right-5 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
      >
        {theme === 'dark' ? <BsSunFill size={24} /> : <BsMoonFill size={24} />}
      </button>
    </div>
  )
}

export default Page