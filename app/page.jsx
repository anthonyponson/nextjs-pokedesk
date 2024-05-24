import Link from "next/link"
import SearchBox from "./components/searchBox"
import { fetchData } from "./actions"
import InfiniteScrool from "./InfiniteScrool"

async function getData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1100")
  const data = await response.json()

  const promises = data.results.map(async (pokemon) => {
    const pokemonResponse = await fetch(pokemon.url)
    return pokemonResponse.json()
  })
  const pokemonList = await Promise.all(promises)
  return pokemonList
}

async function page({ searchParams }) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : ""

  const pokeData = await fetchData({ search })

  // Filter the pokeData based on the search parameter
  const filteredData = pokeData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-5">
      <div className="flex flex-wrap pt-10 mx-auto">
        <InfiniteScrool initialPokemon={pokeData} search={search} />
      </div>
    </div>
  )
}

export default page

// getPokemon() {
//   const getPokemon = async () => {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
//     const data = await response.json()
//     const promises = data.results.map(async pokemon => {
//       const pokemonResponse = await fetch(pokemon.url)
//       return pokemonResponse.json()
//     })
//     const pokemonList = await Promise.all(promises)
//     setPokemonData(pokemonList)
//   }

//   getPokemon()
// }, [])

// {
//   pokemonData.map((pokemon, index) => (
//     <div key={index}>
//       <h1>{pokemon.name}</h1>
//       <img src={pokemon.sprites.front_default} alt={pokemon.name} />
//     </div>
//   ))
// }
