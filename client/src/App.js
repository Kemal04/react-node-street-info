import React, { useEffect, useState } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'

import { ArtistRead, Artists, BlogRead, Blogs, BuildingRead, Buildings, Galleries, HistoricalRead, Historicals, Home, News, NewsRead, ScienceRead, Sciences, StreetRead, Streets } from './pages/userInterface'

import { AdminNavbar, AdminSidebar, Footer, Navbar } from './components'

import { Admin, AdminArtistCreate, AdminArtistEdit, AdminArtists, AdminBlogCreate, AdminBlogEdit, AdminBlogs, AdminBuildingCreate, AdminBuildingEdit, AdminBuildings, AdminContacts, AdminHistoricalCreate, AdminHistoricalEdit, AdminHistoricals, AdminLogin, AdminScienceCreate, AdminScienceEdit, AdminSciences, AdminStreetCreate, AdminStreetEdit, AdminStreets } from './pages/admin'

//TOAST
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/scroll/ScrollToTop';
import axios from 'axios'
import Api_Address from './env'
import { AuthContext } from './context/AuthContext'
import AOS from "aos";
import "aos/dist/aos.css";
import NotFounded from './pages/errors/NotFounded'

const App = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    const [authState, setAuthState] = useState({
        email: "",
        id: 0,
        status: false,
        role: "User",
    });

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/auth/current_user`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            if (res.data.error) {
                setAuthState({ ...authState, status: false, role: "User" });
            } else {
                setAuthState({
                    email: res.data.email,
                    id: res.data.id,
                    status: true,
                    role: res.data.role,
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <ToastContainer />
                <ScrollToTop />

                <Routes>
                    <Route path="/" element={<WithNavbar />}>
                        <Route path='/' element={<Home />} />

                        <Route path='/galereya' element={<Galleries />}></Route>

                        <Route path='/tazelikler' element={<News />}></Route>
                        <Route path='/tazelik/:newsId' element={<NewsRead />}></Route>

                        <Route path='/sayollar' element={<Streets />}></Route>
                        <Route path='/sayol/:streetId' element={<StreetRead />}></Route>

                        <Route path='/seyilgahler' element={<Buildings />}></Route>
                        <Route path='/seyilgah/:buildingId' element={<BuildingRead />}></Route>

                        <Route path='/şahyrlar' element={<Blogs />}></Route>
                        <Route path='/şahyr/:blogId' element={<BlogRead />}></Route>

                        <Route path='/artistler' element={<Artists />}></Route>
                        <Route path='/artist/:artistId' element={<ArtistRead />}></Route>

                        <Route path='/taryhy-sahslar' element={<Historicals />}></Route>
                        <Route path='/taryhy-sahslar/:historicalId' element={<HistoricalRead />}></Route>

                        <Route path='/ylmy-isgarler' element={<Sciences />}></Route>
                        <Route path='/ylmy-isgar/:scienceId' element={<ScienceRead />}></Route>
                    </Route>

                    <Route path="/" element={<AdminWithNavbar />}>
                        {
                            authState.role === "Admin" && (
                                <>
                                    <Route path='/admin' element={<Admin />}></Route>

                                    <Route path='/admin/teswirler' element={<AdminContacts />}></Route>

                                    <Route path='/admin/sayollar' element={<AdminStreets />}></Route>
                                    <Route path='/admin/sayol-gos' element={<AdminStreetCreate />}></Route>
                                    <Route path='/admin/sayol-uytget/:streetId' element={<AdminStreetEdit />}></Route>

                                    <Route path='/admin/seyilgahler' element={<AdminBuildings />}></Route>
                                    <Route path='/admin/seyilgah-gos' element={<AdminBuildingCreate />}></Route>
                                    <Route path='/admin/seyilgah-uytget/:buildingId' element={<AdminBuildingEdit />}></Route>

                                    <Route path='/admin/şahyrlar' element={<AdminBlogs />}></Route>
                                    <Route path='/admin/şahyr-gos' element={<AdminBlogCreate />}></Route>
                                    <Route path='/admin/şahyr-uytget/:blogId' element={<AdminBlogEdit />}></Route>

                                    <Route path='/admin/artistler' element={<AdminArtists />}></Route>
                                    <Route path='/admin/artist-gos' element={<AdminArtistCreate />}></Route>
                                    <Route path='/admin/artist-uytget/:artistId' element={<AdminArtistEdit />}></Route>

                                    <Route path='/admin/ylmy-isgarler' element={<AdminSciences />}></Route>
                                    <Route path='/admin/ylmy-isgar-gos' element={<AdminScienceCreate />}></Route>
                                    <Route path='/admin/ylmy-isgar-uytget/:scienceId' element={<AdminScienceEdit />}></Route>

                                    <Route path='/admin/taryhy-sahslar' element={<AdminHistoricals />}></Route>
                                    <Route path='/admin/taryhy-sahs-gos' element={<AdminHistoricalCreate />}></Route>
                                    <Route path='/admin/taryhy-sahs-uytget/:historicalId' element={<AdminHistoricalEdit />}></Route>
                                </>
                            )
                        }
                    </Route>

                    <Route path='/admin/giris-etmek' element={<AdminLogin />}></Route>
                    <Route path='*' element={<NotFounded />} />

                </Routes>
            </AuthContext.Provider>
        </>
    )
}

const WithNavbar = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
}

const AdminWithNavbar = () => {
    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <AdminNavbar />
                <AdminSidebar />
                <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                    <div className='content'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App