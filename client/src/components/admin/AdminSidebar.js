import React from 'react'
import { Link } from 'react-router-dom'
import { faAtom, faBookBookmark, faBuilding, faCommentAlt, faLandmarkAlt, faMicrophoneAlt, faRoad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminSidebar = () => {
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <Link to="/admin" className="d-block text-uppercase text-decoration-none">Administrasiya</Link>
                        </div>
                    </div>

                    <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
                        <div className="image">
                            <i className="fas fa-home text-white"></i>
                        </div>
                        <div className="info">
                            <Link to="/admin" className="d-block text-uppercase text-decoration-none">Esasy Sahypa</Link>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column nav-treeview" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item mb-2">
                                <Link to="/admin/sayollar" className="nav-link">
                                    <FontAwesomeIcon icon={faRoad} className="nav-icon me-2" />
                                    <p>Şaýollar</p>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/admin/şahyrlar" className="nav-link">
                                    <FontAwesomeIcon icon={faBookBookmark} className="nav-icon me-2" />
                                    <p>Şahyrlar we Ýazyjylar</p>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/admin/artistler" className="nav-link">
                                    <FontAwesomeIcon icon={faMicrophoneAlt} className="nav-icon me-2" />
                                    <p>Bagşy-sazandalar, artistler, türgenler</p>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/admin/ylmy-isgarler" className="nav-link">
                                    <FontAwesomeIcon icon={faAtom} className="nav-icon me-2" />
                                    <p>Ylmy işgärler</p>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/admin/taryhy-sahslar" className="nav-link">
                                    <FontAwesomeIcon icon={faLandmarkAlt} className="nav-icon me-2" />
                                    <p>Taryhy şahslar we beýlekiler</p>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/admin/seyilgahler" className="nav-link">
                                    <FontAwesomeIcon icon={faBuilding} className="nav-icon me-2" />
                                    <p>Taryhy-medeni seýilgähler</p>
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link to="/admin/teswirler" className="nav-link">
                                    <FontAwesomeIcon icon={faCommentAlt} className="nav-icon me-2" />
                                    <p>Teswirler</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default AdminSidebar