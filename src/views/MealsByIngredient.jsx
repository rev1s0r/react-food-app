import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import MealCard from '../components/MealCard';
import Loader from '../components/Loader';

const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function MealsByIngredient() {
    const { ingredient } = useParams();
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (ingredient) {
            fetchMealsByIngredient(ingredient);
        }
    }, [ingredient]);

    const fetchMealsByIngredient = async (ingredientName) => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredientName)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMeals(data.meals || []);

        } catch (error) {
            console.error('Error fetching meals by ingredient:', error);
            setError('Chyba pri načítaní jedál pre túto ingredienciu. Skúste to znovu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="py-8">
                <div className="container mx-auto px-4">
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Späť na ingrediencie
                    </button>

                    {/* Page header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Jedlá s ingredienciou
                        </h1>
                        <h2 className="text-2xl text-indigo-600 dark:text-indigo-400 font-semibold">
                            "{ingredient}"
                        </h2>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="text-center mb-8">
                            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg max-w-md mx-auto">
                                <p className="font-medium">{error}</p>
                                <button
                                    onClick={() => fetchMealsByIngredient(ingredient)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Skúsiť znovu
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading */}
                    {loading && <Loader />}

                    {/* No meals found */}
                    {!loading && meals.length === 0 && !error && (
                        <div className="text-center py-12">
                            <div className="max-w-md mx-auto">
                                <div className="text-6xl mb-4">🍽️</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Žiadne jedlá neboli nájdené
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Pre ingredienciu "{ingredient}" sa nenašli žiadne recepty.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Meals grid */}
                    {!loading && meals.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {meals.map(meal => (
                                <MealCard key={meal.idMeal} meal={meal}>
                                    <div className="h-48 w-full overflow-hidden">
                                        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4 h-24 flex flex-col justify-between">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">{meal.strMeal}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Kliknite pre viac detailov</p>
                                    </div>
                                </MealCard>
                            ))}
                        </div>
                    )}

                    {/* Results count */}
                    {!loading && meals.length > 0 && (
                        <div className="text-center mt-8">
                            <p className="text-gray-600 dark:text-gray-400">
                                Nájdené: {meals.length} {meals.length === 1 ? 'jedlo' : meals.length < 5 ? 'jedlá' : 'jedál'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
