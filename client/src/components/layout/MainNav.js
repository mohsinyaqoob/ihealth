import React from 'react'
import { Link } from 'react-router-dom'

const MainNav = () => {

    return (
        <nav className="navbar navbar-expand navbar-dark navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link text-bold">
                        iHealth
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/developers" className="nav-link">
                        Developers
                    </Link>
                </li>
            </ul>
        </nav>

    )
}


export default MainNav
