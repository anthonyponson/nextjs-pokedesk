import Image from 'next/image'

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
      <h2 className='text-center text-3xl font-semibold'>Poke Desk</h2>

      {pokemonData.map((poke, i) => (
        <div key={i}>
          <h1>{poke.name}</h1>
        </div>
      ))}
    </div>
  )
}
