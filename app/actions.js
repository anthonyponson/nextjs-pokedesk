'use server'

async function getData() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
  const data = await response.json()

  const promises = data.results.map(async pokemon => {
    const pokemonResponse = await fetch(pokemon.url)
    return pokemonResponse.json()
  })
  const pokemonList = await Promise.all(promises)
  return pokemonList
}
export async function fetchData() {
  const pokeData = await getData()
  console.log(pokeData, 'this is pokedata')
  return pokeData
}
