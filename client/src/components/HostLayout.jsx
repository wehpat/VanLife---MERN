import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function HostLayout() {
  return (
    <>
        <nav className='host-nav'>
            <NavLink to='.'end>Dashboard</NavLink>
            <NavLink to='income'>Income</NavLink>
            <NavLink to='vans'>Vans</NavLink>
            <NavLink to='reviews'>Reviews</NavLink>
        </nav>
        <Outlet/>
    </>
  )
}
