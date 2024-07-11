import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
        <Link className='site-logo' to='/'>#VanLife</Link>
        <nav>
            <NavLink to='/host'>
                Host
            </NavLink>
            <NavLink to='/about'>
                About
            </NavLink>
            <NavLink to='/vans'>
                Vans
            </NavLink>
            <Link to='login'>
                login
            </Link>
        </nav>
    </header>
  )
}
