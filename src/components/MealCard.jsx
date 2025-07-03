function MealCard({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto hover:shadow-xl dark:hover:shadow-gray-700/50 transition-shadow duration-300 dark:border dark:border-gray-700">
    {children}
    </div>
  );
}

export default MealCard;
