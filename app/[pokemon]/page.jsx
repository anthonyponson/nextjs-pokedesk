'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

function Page() {
  const [pokemon, setPokemon] = useState(null)
  const router = useParams()
  const name = router

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name.pokemon}`
        )
        const data = await response.json()
        setPokemon(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPokemon()
  }, [])

  return (
    <div>
      <h2>Hello</h2>
      {pokemon && (
        <div>
          <h3>{pokemon.name}</h3>
          <img className='h-20'
            src={pokemon.sprites.front_shiny}
            alt={pokemon.name}
          />
        </div>
      )}
    </div>
  )
}

export default Page
