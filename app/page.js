import Image from 'next/image'
import Search from '../app/components/Search'

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
      <Search />
      {pokemonData.map((poke, i) => (
        <div key={i}></div>
      ))}
    </div>
  )
}
