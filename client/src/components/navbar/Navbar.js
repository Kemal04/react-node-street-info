import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from "react-i18next";

const Navbar = () => {

    const { t, i18n } = useTranslation();

    //Creating a method to change the language onChnage from select box
    const changeLanguageHandler = (e) => {
        const languageValue = e.target.value
        i18n.changeLanguage(languageValue);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-light shadow" style={{ backgroundColor: "transparent" }}>
                <div className="container w-50">
                    <NavLink className="navbar-brand" to="/">
                        {t('home')}
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to="/sayollar" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('streets')}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/seyilgahler" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('parks')}</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link style={{ fontSize: "18px", letterSpacing: "0.6px" }} className="nav-link dropdown-toggle mx-3" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {t('famousPeople')}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/şahyrlar" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('poets')}</NavLink></li>
                                    <li><NavLink to="/artistler" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('artists')}</NavLink></li>
                                    <li><NavLink to="/taryhy-sahslar" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('historicalFigures')}</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink to="/ylmy-isgarler" className='nav-link link-underline mx-2' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('scientificStaff')}</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/galereya" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('gallery')}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tazelikler" className='nav-link link-underline mx-3' style={{ fontSize: "18px", letterSpacing: "0.6px" }}>{t('news')}</NavLink>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <Link to='/' className="nav-link dropdown-toggle mx-3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    
                                </Link>
                                <ul className="dropdown-menu text-center">
                                    <li><Link to='/' className="dropdown-item"><img src={tm} alt="" className='img-fluid' style={{ width: "30px" }} /></Link></li>
                                    <li><Link to='/' className="dropdown-item"><img src={en} alt="" className='img-fluid' style={{ width: "30px" }} /></Link></li>
                                    <li><Link to='/' className="dropdown-item"><img src={ru} alt="" className='img-fluid' style={{ width: "30px" }} /></Link></li>
                                </ul>
                            </li> */}
                            <select className="form-select border-0 bg-light" aria-label="Default select example" onChange={changeLanguageHandler}>
                                <option value="tm">TM</option>
                                <option value="en">EN</option>
                                <option value="ru">RU</option>
                            </select>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar