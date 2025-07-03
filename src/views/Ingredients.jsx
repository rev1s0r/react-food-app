import React, { useState, useEffect } from 'react'
import { MainLayout } from '../components/MainLayout'
import IngredientCard from '../components/IngredientCard'
import '../App.css'

const API_BASE_URL = import.meta.env.VITE_MEAL_API_BASE_URL;

export default function Ingredients() {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${API_BASE_URL}/list.php?i=list`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setIngredients(data.meals || []);

        } catch (error) {
            console.error('Error fetching ingredients:', error);
            setError('Chyba pri načítavaní ingrediencií. Skúste to znovu.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Načítavam ingrediencie...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <button
                        onClick={fetchIngredients}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Skúsiť znovu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Ingrediencie
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {ingredients.map(ingredient => (
                            <IngredientCard>
                                <div className="p-4">
                                    <h3>{ingredient.setIngredient}</h3>
                                </div>
                            </IngredientCard>
                        ))}
                    </div>

                    {ingredients.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                Žiadne ingrediencie neboli nájdené.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
