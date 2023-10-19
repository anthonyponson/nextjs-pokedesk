import Image from 'next/image'
import PokemonGrid from './components/PokemonGrid'
import PokemonList from './components/PokemonList'

async function getData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await response.json()
    const results = data.results
    const getPokemon = await Promise.all(
      results.map(async pokemon => {
        const id = pokemon.url.split('/')[6]
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return {
          id,
          name: pokemon.name,
          image,
        }
      })
    )
    console.log(getPokemon, 'pokemon data')
    return getPokemon
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const pokemonData = await getData()
  return (
    <div>
      {/* {pokemonData.map((pokemon, i) => (
        <div key={i}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.image} width={100} height={100} />
        </div>
      ))} */}
      {/* <PokemonList /> */}
      <PokemonGrid />
    </div>
  )
}
