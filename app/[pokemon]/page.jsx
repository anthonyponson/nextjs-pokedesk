import { useParams } from 'next/navigation'

async function getData({ params }) {
  try {
    const id = params
    const response = await fetch(`https://pokeapi.co/api/v2/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

async function page({ params }) {
  const id = params

  const pokemonData = await getData()

  return (
    <div>
      <h2></h2>
    </div>
  )
}

export default page
