import React, { useEffect, useState, useRef } from 'react';


export function SearchForm({search, setSearch, handleSearch}) {
  const inputRef = useRef(null);

  useEffect(() => {
  }, [search]);

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(search);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  },[]
  )



  return (
 
    <form onSubmit={onSearch} className="max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          name="search"
          value={search}
          onInput={(e) => setSearch(e.target.value)}
          placeholder="Search for recipes, ingredients, or cuisines..."
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
