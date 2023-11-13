'use client'
import React, { useEffect, useState } from 'react'

function PokemonTransformInfo({ basePokemon, transformName }) {
  const [transformedForm, setTransformedForm] = useState(null)

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch data for the base Pokémon
        const baseResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${basePokemon}`
        )
        const baseData = await baseResponse.json()

        // Find the URL of the transformed form
        const transformFormUrl = baseData.forms.find(
          form => form.name === transformName
        ).url

        // Fetch data for the transformed form
        const transformResponse = await fetch(transformFormUrl)
        const transformData = await transformResponse.json()

        setTransformedForm(transformData)
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      }
    }

    fetchPokemonData()
  }, [basePokemon, transformName])

  if (!transformedForm) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Transformed Form Name: {transformedForm.name}</h2>
      <p>Transformed Form ID: {transformedForm.id}</p>
      <p>
        Transformed Form Abilities:{' '}
        {transformedForm.abilities
          .map(ability => ability.ability.name)
          .join(', ')}
      </p>
      <p>
        Transformed Form Types:{' '}
        {transformedForm.types.map(type => type.type.name).join(', ')}
      </p>
    </div>
  )
}

export default PokemonTransformInfo
