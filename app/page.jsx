import Image from 'next/image'
import PokemonGrid from './components/PokemonGrid'

async function getData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const pokemonData = await getData()
  return (
    <div>
      <PokemonGrid />
      {pokemonData.map((pokemon, i) => (
        <div key={i}>

        </div>
      ))}
    </div>
  )
}
