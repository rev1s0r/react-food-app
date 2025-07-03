import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import Loader from '../components/Loader';

const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function MealDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchMealDetails(id);
        }
    }, [id]);

    const fetchMealDetails = async (mealId) => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.meals && data.meals[0]) {
                setMeal(data.meals[0]);
            } else {
                setError('Jedlo sa nenašlo.');
            }

        } catch (error) {
            console.error('Error fetching meal details:', error);
            setError('Chyba pri načítaní detailov jedla. Skúste to znovu.');
        } finally {
            setLoading(false);
        }
    };

    // Extract ingredients and measurements
    const getIngredients = (meal) => {
        if (!meal) return [];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    name: ingredient.trim(),
                    measure: measure ? measure.trim() : ''
                });
            }
        }
        return ingredients;
    };

    const ingredients = getIngredients(meal);

    return (
        <MainLayout>
            {loading && <Loader />}

            {error && (
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg max-w-md mx-auto">
                            <p className="font-medium">{error}</p>
                            <button
                                onClick={() => fetchMealDetails(id)}
                                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Skúsiť znovu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!loading && !error && !meal && (
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Jedlo sa nenašlo
                        </h2>
                    </div>
                </div>
            )}

            {!loading && !error && meal && (
                <div className="container mx-auto px-4 py-8">
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Späť
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image */}
                        <div className="space-y-4">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                            
                            {/* Meal info */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {meal.strMeal}
                                </h1>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {meal.strCategory && (
                                        <div>
                                            <span className="font-semibold text-gray-600 dark:text-gray-400">Kategória:</span>
                                            <p className="text-gray-900 dark:text-white">{meal.strCategory}</p>
                                        </div>
                                    )}
                                    {meal.strArea && (
                                        <div>
                                            <span className="font-semibold text-gray-600 dark:text-gray-400">Kuchyňa:</span>
                                            <p className="text-gray-900 dark:text-white">{meal.strArea}</p>
                                        </div>
                                    )}
                                    {meal.strTags && (
                                        <div className="col-span-2">
                                            <span className="font-semibold text-gray-600 dark:text-gray-400">Tagy:</span>
                                            <p className="text-gray-900 dark:text-white">{meal.strTags}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            {/* Ingredients */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Ingrediencie
                                </h2>
                                <ul className="space-y-2">
                                    {ingredients.map((ingredient, index) => (
                                        <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                            <span className="text-gray-900 dark:text-white">{ingredient.name}</span>
                                            <span className="text-gray-600 dark:text-gray-400 font-medium">{ingredient.measure}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Instructions */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Postup prípravy
                                </h2>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {meal.strInstructions}
                                    </p>
                                </div>
                            </div>

                            {/* YouTube video */}
                            {meal.strYoutube && (
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        Video návod
                                    </h2>
                                    <div className="aspect-video">
                                        <iframe
                                            src={meal.strYoutube.replace('watch?v=', 'embed/')}
                                            className="w-full h-full rounded-lg"
                                            frameBorder="0"
                                            allowFullScreen
                                            title="Recipe Video"
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Source link */}
                            {meal.strSource && (
                                <div className="text-center">
                                    <a
                                        href={meal.strSource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Zobrazit pôvodný recept
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
