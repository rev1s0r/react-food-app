function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Food App</h1>
          <p className="text-blue-100 dark:text-blue-200 text-lg">
            Discover delicious recipes from around the world
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
