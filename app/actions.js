'use server'

async function getData({ page }) {
  console.log(page, 'page')
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
  )
  const data = await response.json()

  const promises = data.results.map(async pokemon => {
    const pokemonResponse = await fetch(pokemon.url)
    return pokemonResponse.json()
  })
  const pokemonList = await Promise.all(promises)
  return pokemonList
}
export async function fetchData({ page }) {
  const pokeData = await getData({ page: page })
  return pokeData
}
