import React from 'react'
import Header from '../components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* FULL WIDTH */}
      <Header />

      {/* Container SOLO para contenido */}
      <main className="flex-grow w-full">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RootLayout
