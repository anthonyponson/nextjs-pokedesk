import SearchBox from './components/searchBox'

async function getData() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
  const data = await response.json()

  const promises = data.results.map(async pokemon => {
    const pokemonResponse = await fetch(pokemon.url)
    return pokemonResponse.json()
  })
  const pokemonList = await Promise.all(promises)
  return pokemonList
}

async function page({ searchParams }) {
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : ''

  const pokeData = await getData()

  // Filter the pokeData based on the search parameter
  const filteredData = pokeData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <SearchBox />

      {filteredData.map((pokemon, i) => (
        <div key={i}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ))}
    </div>
  )
}

export default page
