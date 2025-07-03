import React, { useState, useEffect } from 'react'
import { MainLayout } from '../components/MainLayout'
import IngredientCard from '../components/IngredientCard'
import Loader from '../components/Loader'
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

    return (
        <MainLayout>
            {loading && <Loader />}

            {error && (
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg max-w-md mx-auto">
                            <p className="font-medium">{error}</p>
                            <button
                                onClick={fetchIngredients}
                                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Skúsiť znovu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!loading && !error && (
                <div className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            Ingrediencie
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {ingredients.map((ingredient, index) => (
                                <IngredientCard 
                                    key={ingredient.idIngredient || index}
                                    ingredient={ingredient.strIngredient}
                                >
                                    {ingredient.strIngredient}
                                </IngredientCard>
                            ))}
                        </div>

                        {ingredients.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400">
                                    Žiadne ingrediencie neboli nájdené.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
