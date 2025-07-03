import { useNavigate } from 'react-router-dom';

function MealCard({ children, meal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (meal && meal.idMeal) {
      navigate(`/meal/${meal.idMeal}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full h-full hover:shadow-xl dark:hover:shadow-gray-700/50 transition-all duration-300 dark:border dark:border-gray-700 cursor-pointer transform hover:scale-105"
    >
      {children}
    </div>
  );
}

export default MealCard;
