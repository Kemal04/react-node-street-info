import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import tm from '../../assets/icons/tm.png'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-light shadow" style={{ backgroundColor: "transparent" }}>
                <div className="container w-50">
                    <NavLink className="navbar-brand" to="/">
                        Baş Sahypa
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to="/sayollar" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Şaýollar</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/seyilgahler" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Seýilgähler</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link style={{ fontSize: "18px", letterSpacing: "0.6px" }} className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Şahyrlar
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/şahyrlar" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Şahyrlar</NavLink></li>
                                    <li><NavLink to="/artistler" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Artistler</NavLink></li>
                                    <li><NavLink to="/taryhy-sahslar" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Taryhy şahslar</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink to="/ylmy-isgarler" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Ylmy işgärler</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/galereya" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Galereýa</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tazelikler" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>Täzelikler</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to='/' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={tm} alt="" className='img-fluid' style={{ width: "30px" }} />
                                </Link>
                                <ul className="dropdown-menu text-center">
                                    <li><Link to='/' className="dropdown-item"><img src={tm} alt="" className='img-fluid' style={{ width: "30px" }} /></Link></li>
                                    <li><Link to='/' className="dropdown-item"><img src={tm} alt="" className='img-fluid' style={{ width: "30px" }} /></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar