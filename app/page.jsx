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

async function page() {
  const pokeData = await getData()
  console.log(pokeData, 'hello')
  return (
    <div>
      <h1>Hello World!</h1>
      {pokeData.map((pokemon, i) => (
        <div key={i}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ))}
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
