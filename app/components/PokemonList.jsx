'use client'

import React, { useState, useEffect } from 'react'

function PokemonList() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=10'
        )
        const data = await response.json().then(data => data.results)

        const pokemonData = await Promise.all(
          data.map(async pokemon => {
            const id = pokemon.url.split('/')[6]
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

            return {
              id,
              name: pokemon.name,
              image,
            }
          })
        )

        setPokemons(pokemonData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            <span>{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
