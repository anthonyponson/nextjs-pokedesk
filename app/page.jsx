import Image from 'next/image'
import PokemonGrid from './components/PokemonGrid'
import Navbar from './components/Navbar'

export default async function Home() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return (
    <div >
      
      <PokemonGrid />
    </div>
  )
}
