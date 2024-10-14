import React, { useState } from 'react'
import '../App.css'
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const NavBar = () => {
    // asigning a state for toggling
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const navItems = [
      {path: "/home", title: "Search"},
      {path: "/jobs", title: "Jobs"},
      {path: "/edit-job", title: "Locations"},
      {path: "/post-job", title: "Post a Job"},
      {path: "/profile", title: "Profile"},
    ]
  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <nav className='flex justify-between items-center py-6'>
            <a href="/" className='flex items-center gap-2 text-2xl text-black'><img className='logo-img' src="./images/jobdey-logo.svg" alt="jobDey Logo" />
              <span className='text-blue'>JobDey</span>
            </a>
            {/* nav items for large devices */}
            <ul className='hidden md:flex gap-12'>
              {
                navItems.map(({path, title}) => (
                  <li key={path} className='text-base text-primary'>
                    <NavLink to={path}
                    className={({ isActive }) => isActive ? "active" : ""}>
                      {title}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
            {/* sign up and login btn */}
            <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
              <Link to="./login" className='py-2 px-5 border rounded'>Login</Link>
              <Link to="./signup" className='py-2 px-5 border rounded bg-blue text-white'>SignUp</Link>
              <Link to="./logout" className='py-2 px-5 border rounded bg-blue text-white'>Logout</Link>
            </div>

            {/* mobile menu  */}
            <div className='md:hidden block'>
              <button onClick={handleMenuToggler}>
                {
                  isMenuOpen ? <FaXmark /> : <FaBarsStaggered className='w-5 h-5 text-primary'/>
                } 
              </button>
            </div>
        </nav>
        {/* navitems for mobile */}
        <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
          <ul>
              {
                navItems.map(({path, title}) => (
                  <li key={path} className='text-base text-white first:text-white py-1'>
                    <NavLink to={path}
                    className={({ isActive }) => isActive ? "active" : ""}>
                      {title}
                    </NavLink>
                  </li>
                ))
              }
              <li className='text-white py-1'><Link to="./login">Login</Link></li>
              <li className='text-white py-1'><Link to="./signup">SignUp</Link></li>
              <li className='text-white py-1'><Link to="./logout">Logout</Link></li>
          </ul>
        </div>
    </header>
  )
}

export default NavBar