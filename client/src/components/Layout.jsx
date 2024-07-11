import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Headers.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <div>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
