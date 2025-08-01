import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

export default function Navbar() {
    return (
        <div className='navbar'>
            <img src={navlogo} alt="" className="nav-logo" />
            <img src={navProfile} alt="" className="nav-profile" />
        </div>
    )
}
