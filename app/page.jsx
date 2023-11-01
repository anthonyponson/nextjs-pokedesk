import Image from 'next/image'
import PokemonGrid from './components/PokemonGrid'

export default async function Home() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return (
    <div>
      <PokemonGrid />
    </div>
  )
}
