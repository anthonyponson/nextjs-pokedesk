// import { useState, useEffect,useMemo } from "react"
// import { fetchData } from "./actions"
// import { useInView } from "react-intersection-observer"
// import Link from "next/link"
// import debounce from "lodash.debounce"

// function InfiniteScrool({ initialPokemon, search }) {
//   const [displayedPokemon, setDisplayedPokemon] = useState(
//     initialPokemon.slice(0, 20)
//   )
//   const [pokemon, setPokemon] = useState(initialPokemon)
//   const [page, setPage] = useState(1)
//   const [debouncedSearch, setDebouncedSearch] = useState(search);
//   const [ref, inView] = useInView()

//    function loadMoreData() {
//     const next = page + 1
//     const newPokemon = pokemon.slice(page * 20, (page + 1) * 20)
//     setPage(next)
//     setDisplayedPokemon((prev) => [...prev, ...newPokemon])
//   }

//   useEffect(() => {
//     if (inView && search === "") {
//       loadMoreData()
//     }
//   }, [inView, search])

  
//   const filteredData = pokemon.filter((pokemon) =>
//     pokemon.name.toLowerCase().includes(search.toLowerCase())
//   )
//   const pokemonToShow = search ? filteredData : displayedPokemon
//   return (
//     <>
//       <div className="flex flex-wrap -mx-2">
//         {pokemonToShow.map((pokemon, i) => (
//           <div className="w-full sm:w-1/2 md:w-1/3 px-2" key={i}>
//             <Link className="block" href={`/${pokemon.name}`}>
//               <div className="bg-gray-200 p-2 rounded mb-4 dark:bg-teal-400">
//                 <h2 className="text-xl text-center text-blue-950 font-semibold">
//                   {pokemon.name}
//                 </h2>
//                 <img
//                   className="mx-auto"
//                   height={150}
//                   width={150}
//                   src={pokemon.sprites.other.home.front_default}
//                   alt={pokemon.name}
//                 />
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>

//       {search === "" && (
//         <div ref={ref} className="w-full flex justify-center mt-4">
//           <div className="border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
//         </div>
//       )}
//     </>
//   )
// }

// export default InfiniteScrool






// import Link from "next/link"
// import SearchBox from "./components/searchBox"
// import { fetchData } from "./actions"
// import InfiniteScrool from "./InfiniteScrool"
// import Navbar from "./components/Navbar"

// async function getData() {
//   const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1100")
//   const data = await response.json()

//   const promises = data.results.map(async (pokemon) => {
//     const pokemonResponse = await fetch(pokemon.url)
//     return pokemonResponse.json()
//   })
//   const pokemonList = await Promise.all(promises)
//   return pokemonList
// }

// async function page({ searchParams }) {
//   const search =
//     typeof searchParams.search === "string" ? searchParams.search : ""

//   const pokeData = await getData()

//   const filteredData = pokeData.filter((pokemon) =>
//     pokemon.name.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <div className="px-5">
      
//       <div className="flex flex-wrap pt-10 mx-auto">
//         <InfiniteScrool initialPokemon={pokeData} search={search} />
//       </div>
//     </div>
//   )
// }

// export default page