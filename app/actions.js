// 'use server'

async function getData({ page, limit, search }) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=1100`
  )
  const data = await response.json()

  let filteredResults = data.results
  if (search) {
    filteredResults = data.results.filter(pokemon => 
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  const startIndex = page * limit
  const endIndex = startIndex + limit
  const paginatedResults = filteredResults.slice(startIndex, endIndex)

  const promises = paginatedResults.map(async pokemon => {
    const pokemonResponse = await fetch(pokemon.url)
    return pokemonResponse.json()
  })
  const pokemonList = await Promise.all(promises)
  return pokemonList
}

export async function fetchData({ page, limit, search }) {
  const pokeData = await getData({ page, limit, search })
  return pokeData
}
