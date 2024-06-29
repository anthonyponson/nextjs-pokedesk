'use client';

import { useState } from 'react';
import InfiniteScroll from '../InfiniteScrool';
import SearchBox from './SearchBox';

function ClientComponent({ pokeData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(pokeData);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <div className="flex flex-wrap pt-10 mx-auto">
        <InfiniteScroll initialPokemon={filteredData} search={searchTerm} />
      </div>
    </div>
  );
}

export default ClientComponent;
