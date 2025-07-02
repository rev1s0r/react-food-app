import './App.css'
import MealCard from './components/MealCard'
import SearchForm from './components/SearchForm'
import { MainLayout } from './components/MainLayout'

function App() {
  // Sample meal data
  const sampleMeal = {
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    title: "Delicious Pasta Carbonara",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Creamy and rich, this comfort food is perfect for any dinner occasion."
  }

  return (
    <MainLayout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Search Form */}
          <div className="mb-12">
            <SearchForm />
          </div>
          
          {/* Meal Cards */}
          <div className="flex justify-center mb-8">
            <MealCard 
              image={sampleMeal.image}
              title={sampleMeal.title}
              description={sampleMeal.description}
            />
          </div>
          <div className="flex justify-center">
            <MealCard 
              image={sampleMeal.image}
              title={sampleMeal.title}
              description={sampleMeal.description}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default App
