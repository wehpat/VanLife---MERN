import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import avatar from "../assets/images/avatar-icon.png"


export default function Header() {
  return (
    <header>
        <Link className='site-logo' to='/'>#VanLife</Link>
        <nav>
            <NavLink to='/host'>Host</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/vans'>Vans</NavLink>
            <Link to='login'>
                <img src={avatar} className='login-icon'/>
            </Link>
        </nav>
    </header>
  )
}
