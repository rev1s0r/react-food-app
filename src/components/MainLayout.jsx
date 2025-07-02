import React from 'react'
import Navbar from './Navbar'

export function MainLayout({children}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}
