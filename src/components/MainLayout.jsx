import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'

export function MainLayout({children}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
