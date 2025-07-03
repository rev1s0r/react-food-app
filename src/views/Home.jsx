import React from 'react'
import '../App.css'
import MealCard from '../components/MealCard'
import SearchForm from '../components/SearchForm'
import Loader from '../components/Loader'
import { MainLayout } from '../components/MainLayout'
import { useState, useEffect } from 'react';

// Environment variables
const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function Home() {
    const [search, setSearch] = useState('');
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState('');
    const [heading, setHeading] = useState('Random meals');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRandomMeals();
    }, []);

    const fetchRandomMeals = async () => {
        try {
            setLoading(true);
            setError('');
            setHeading('Random meals');
            const randomMeals = [];
            for (let i = 0; i < 6; i++) {
                const response = await fetch(`${API_BASE_URL}/random.php`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.meals && data.meals[0]) {
                    randomMeals.push(data.meals[0]);
                }
            }
            setMeals(randomMeals);
        } catch (error) {
            console.error('Error fetching random meals:', error);
            setError('Chyba pri načítaní náhodných jedál. Skúste obnoviť stránku.');
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = (query) => {
        console.log('Searching for:', query);

        // Ak je vyhľadávací reťazec prázdny, zobraz random meals
        if (!query || query.trim() === '') {
            fetchRandomMeals();
            return;
        }

        setError('');
        setMeals([]);
        setLoading(true);
        try {
            const url = `${API_BASE_URL}/search.php?s=${query}`;
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setHeading(`Výsledky vyhľadávania pre: "${query}"`);
                    setMeals(data.meals || []);
                }).catch(error => {
                    console.error('Error fetching search results:', error);
                    setError('Chyba pri vyhľadávaní jedál. Skúste to znovu.');
                }).finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error fetching meals:', error);
            setError('Chyba pri vyhľadávaní jedál. Skúste to znovu.');
            setLoading(false);
        }
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

            <div className="container mx-auto px-4">
                <h2 className='text-2xl py-4 font-bold text-gray-800 dark:text-white'>{heading}</h2>
            </div>

            {error && (
                <div className="text-center mb-8">
                    <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg max-w-md mx-auto">
                        <p className="font-medium">{error}</p>
                    </div>
                </div>
            )}

            {loading && <Loader />}

            {!loading && meals.length === 0 && !error && (
                <div className="text-center">
                    <h2 className='text-gray-600 dark:text-gray-400'>Žiadne jedlá sa nenašli</h2>
                </div>
            )}

            {!loading && (
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {meals.map(meal => (
                            <MealCard>
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                                <div className="p-4">
                                    <h3>{meal.strMeal}</h3>
                                </div>
                            </MealCard>
                        ))}
                    </div>
                </div>
            )}
        </MainLayout>
    )
}
