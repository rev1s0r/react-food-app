function MealCard({ image, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto hover:shadow-xl dark:hover:shadow-gray-700/50 transition-shadow duration-300 dark:border dark:border-gray-700">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

export default MealCard;
