'use server'

async function getData({ page, limit }) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page * limit}`
  )
  const data = await response.json()

  const promises = data.results.map(async pokemon => {
    const pokemonResponse = await fetch(pokemon.url)
    return pokemonResponse.json()
  })
  const pokemonList = await Promise.all(promises)
  return pokemonList
}

export async function fetchData({ page, limit }) {
  const pokeData = await getData({ page, limit })
  return pokeData
}
