"use client"

import { useState, useEffect } from "react"
import { fetchData } from "./actions"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

function InfiniteScrool({ initialPokemon, search }) {
  const [pokemon, setPokemon] = useState(initialPokemon)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  let start = Date.now()

  async function loadMoreData() {
    const next = page + 1
    console.log(next)
    const pokeData = await fetchData({ page: next, limit: 20 })
    if (pokeData) {
      console.log(next, "next")
      setPage(next)
      setPokemon((prev) => [...prev, ...pokeData])
    }
    console.log(pokeData)
  }

  let timeTaken = Date.now() - start
  console.log("total time taken" + " " + timeTaken + " " + "milliseconds")

  // Filter the pokemon based on the search parameter
  const filteredData = pokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (inView && search === "") {
      loadMoreData()
    }
  }, [inView])

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        {filteredData.map((pokemon, i) => (
          <div className="w-full sm:w-1/2 md:w-1/3 px-2" key={i}>
            <Link className="block" href={`/${pokemon.name}`}>
              <div className="bg-gray-200 p-2 rounded mb-4 dark:bg-teal-400">
                <h2 className="text-xl text-center text-blue-950 font-semibold">
                  {pokemon.name}
                </h2>
                <img
                  className="mx-auto"
                  height={150}
                  width={150}
                  src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {search === "" && (
        <div ref={ref} className="w-full flex justify-center mt-4">
          <div className="border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
        </div>
      )}
    </>
  )
}

export default InfiniteScrool
