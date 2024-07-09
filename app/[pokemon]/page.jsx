"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useParams, usePathname } from "next/navigation"
import Navbar from "../components/Navbar"
import Link from 'next/link'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

function Page() {
  const [pokemon, setPokemon] = useState(null)
  const [abilities, setAbilities] = useState([])
  const [stats, setStats] = useState([])
  const [evolutionChain, setEvolutionChain] = useState([])
  const router = useParams()

  const name = router

  const { theme, setTheme } = useTheme()

  const typeColors = {
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-200',
    psychic: 'bg-pink-500',
    bug: 'bg-green-700',
    rock: 'bg-gray-700',
    ghost: 'bg-purple-900',
    dragon: 'bg-purple-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
    normal: 'bg-gray-400',
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
  }, [])

  const getBackgroundColor = () => {
    if (!pokemon || !pokemon.types || pokemon.types.length === 0) return 'bg-gray-200'
    return typeColors[pokemon.types[0].type.name] || 'bg-gray-200'
  }

  return (
    <>
      <div className={`flex ${getBackgroundColor()} min-h-screen`}>
        <div className="w-[80%] flex flex-col justify-center items-center mx-auto">
          <div>
            {pokemon && (
              <div>
                <h3 className="text-3xl font-bold">{pokemon.name}</h3>
                <img
                  className=""
                  height={150}
                  width={200}
                  src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                />
              </div>
            )}
            <div className="w-full bg-gray-150 rounded-lg shadow-lg p-4">
              {stats.map((stat, i) => (
                <div className="mb-4" key={i}>
                  <h2 className="text-xl font-bold text-gray-800">
                    {stat.stat.name}: {stat.base_stat}
                  </h2>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                      <div
                        style={{ width: `${(stat.base_stat / 120) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-300"
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
