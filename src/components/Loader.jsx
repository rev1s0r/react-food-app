function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        {/* Spinning circle */}
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-indigo-600 dark:border-t-indigo-400"></div>
        
        {/* Inner spinning dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="ml-4">
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
          Načítavam jedlá...
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          Prosím počkajte
        </p>
      </div>
    </div>
  );
}

export default Loader;
