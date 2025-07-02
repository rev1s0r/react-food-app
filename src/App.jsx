import './App.css'
import MealCard from './components/MealCard'
import SearchForm from './components/SearchForm'
import { MainLayout } from './components/MainLayout'
import React, { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMeals(data.meals || []);
      }).catch(error =>
        console.error('Error fetching search results:', error)
      );
  }

  return (
    <MainLayout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <SearchForm
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      {meals.length === 0 && <h2 className='text-center'>No meals found</h2>}
      <div className="grid grid-cols*1 gap-4">
        {meals.map(meal => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))  }
      </div>
    </MainLayout>
  )
}

export default App
