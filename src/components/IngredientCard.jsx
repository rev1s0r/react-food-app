import { useNavigate } from 'react-router-dom';

function IngredientCard({ ingredient, children }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (ingredient) {
      navigate(`/meals-by-ingredient/${encodeURIComponent(ingredient)}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-200 dark:border-gray-700 cursor-pointer transform hover:scale-105"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        {children}
      </h3>
    </div>
  );
}

export default IngredientCard;
