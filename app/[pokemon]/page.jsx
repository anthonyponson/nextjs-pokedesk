'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Page() {
  const [pokemon, setPokemon] = useState(null)
  const router = useRouter()
  const { name } = router

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        )
        const data = await response.json()
        setPokemon(data)
        console.log(response,'vbjbvjbvj')
      } catch (error) {
        console.log(error)
      }
    }
    if (name) {
      fetchPokemon()
    }
  }, [name])

  return (
    <div>
      <h2>Hello</h2>
      {pokemon && (
        <div>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          {/* Display other Pokémon details as needed */}
        </div>
      )}
    </div>
  )
}

export default Page
