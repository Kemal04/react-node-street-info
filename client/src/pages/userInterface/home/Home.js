import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '@splidejs/react-splide/css';
import { toast } from 'react-toastify'
import Api_Address from '../../../env';
import './home.css'
import 'aos';

import card_1 from "../../../assets/cards/1.png"
import card_2 from "../../../assets/cards/2.png"
import icon_1 from '../../../assets/icons/wifi.svg'
import icon_2 from '../../../assets/icons/world.svg'
import icon_3 from '../../../assets/icons/car.svg'
import icon_4 from '../../../assets/icons/e-gov-tm.svg'
import moment from "moment";
import ScrollButton from "../../../components/scroll/ScrollButton";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Home = () => {

    const { t } = useTranslation();
    const lang = i18n.language;

    //CONTACT
    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        comment: "",
    })

    const handleChange = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if (!contact.name) {
            toast.error("Adyňyzy ýazyň")
        }
        else if (!contact.email) {
            toast.error("E-mail adresiňizi ýazyň")
        }
        else if (!contact.subject) {
            toast.error("Temaňyzy ýazyň")
        }
        else if (!contact.comment) {
            toast.error("Teswiriňizi ýazyň")
        }
        else if (contact.comment.length < 25) {
            toast.error("Teswiriňizi 25 harpdan yokary bolmaly")
        }
        else {
            await axios.post(`${Api_Address}/api/v1/contact/create`, contact)
                .then((res) => {
                    toast.success(res.data.success)
                    setContact({
                        name: "",
                        email: "",
                        subject: "",
                        comment: "",
                    })
                }).catch((res) => {
                    toast.error(res.response.data.error)
                });
        }
    }

    const [news, setNews] = useState([])

    const [page, setPage] = useState(1)

    const [pages, setPages] = useState()

    const changePage = ({ selected }) => {
        console.log(selected);
        setPage((selected + 1))
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`https://tmcell.tm/api/api/v1/home/news`, {
                params: {
                    page: page
                }
            }).then((res) => {
                setNews(res.data.news)
                setPages(res.data.pagination.pages)
            })
        }
        fetchData()
    }, [page])

    return (
        <>
            <ScrollButton />
            <div className='home-bg-fixed pt-5 d-flex align-items-center'>
                <div className='container d-flex justify-content-center'>
                    <div className='row w-75 align-items-center mb-5 pb-5'>
                        <div className='col-xl-12 col-12 mt-5'>
                            <div className='banner-header text-white fw-bold text-uppercase' data-aos={"fade-up"}>
                                {t('bannerTitle')}
                            </div>
                        </div>
                        <div className='col-xl-12 mt-5 d-xl-block d-lg-block d-md-block d-none'>
                            <p data-aos={"fade-up"} className='h5 text-white fw-normal' style={{ wordSpacing: "3px", letterSpacing: "0.6px" }}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t('bannerDescription')}
                            </p>
                        </div>
                        <div data-aos={"fade-up"} className="col-xl-12 my-5 text-xl-start text-lg-start text-md-start text-center">
                            <Link to="/" className="btn btn-primary">{t('bannerBtn')}</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 pt-2">
                <div data-aos={"fade-up"} className="text-center fw-bold my-5 display-5">{t('serviceTitle')}</div>
                <div className="row pt-5">
                    <div data-aos={"fade-up"} className="col-xl-3 col-lg-3 col-md-3 col-12 mb-5 text-center">
                        <img src={icon_1} alt="icon" className="img-fluid mb-4" style={{ width: "150px" }} />
                        <div className="h4">{t('serviceWifi')}</div>
                    </div>
                    <div data-aos={"fade-up"} className="col-xl-3 col-lg-3 col-md-3 col-12 mb-5 text-center">
                        <img src={icon_2} alt="icon" className="img-fluid mb-4" style={{ width: "180px" }} />
                        <div className="h4">{t('serviceAir')}</div>
                    </div>
                    <div data-aos={"fade-up"} className="col-xl-3 col-lg-3 col-md-3 col-12 mb-5 text-center">
                        <img src={icon_3} alt="icon" className="img-fluid mb-4" style={{ width: "400px", height: "150px" }} />
                        <div className="h4">{t('serviceCars')}</div>
                    </div>
                    <div data-aos={"fade-up"} className="col-xl-3 col-lg-3 col-md-3 col-12 mb-5 text-center">
                        <Link to="https://e.gov.tm/" target="_blank" className="text-decoration-none text-dark">
                            <img src={icon_4} alt="icon" className="img-fluid mb-4" style={{ width: "150px" }} />
                            <div className="h4">{t('servicePortal')}</div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="jumbotron jumbotron-fluid feature-first mb-0">
                <div className="container mb-5 mt-3">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-xl-start text-lg-start text-md-start text-center">
                            <div data-aos={"fade-right"} className="h1">{t('shortInfoTitle')}</div>
                            <p data-aos={"fade-right"} className="my-4">
                                {t('shortInfoDescription')}
                            </p>
                            <Link data-aos={"fade-right"} to="/sayollar" className="btn btn-secondary">{t('shortInfoBtn')}</Link>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-end mt-5" data-aos={"fade-right"}>
                            <img src={card_1} alt="" className="img-fluid" style={{ width: "400px" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="jumbotron jumbotron-fluid feature feature-last text-white">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-start mb-5" data-aos={"fade-right"}>
                            <img src={card_2} alt="" className="img-fluid" style={{ width: "400px" }} />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12 text-xl-end text-lg-end text-md-end text-center">
                            <div data-aos={"fade-right"} className="h1">{t('shortInfo2Title')}</div>
                            <div data-aos={"fade-right"} className="d-flex justify-content-end">
                                <p className="my-4">
                                    {t('shortInfo2Description')}
                                </p>
                            </div>
                            <Link data-aos={"fade-right"} to="/sayollar" className="btn btn-secondary">{t('shortInfoBtn')}</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row gx-5">
                    <div className='col-xl-12 mb-4'>
                        <div className="text-center">
                            <div className='h1 mb-0' data-aos={"fade-up"}>{t('news')}</div>
                            <div className='d-flex justify-content-center'>
                                <hr style={{ borderBottom: "1px solid black", width: "80px" }} />
                            </div>
                            <p data-aos={"fade-up"}>
                                {t('newsDescription')}
                            </p>
                        </div>
                    </div>
                    {
                        news.slice(0, 6).map((news, index) => (
                            <div className="col-xl-4 col-12 mb-4" key={index}>
                                <Link to={`/tazelik/${news.id}`} className="card border-0 text-decoration-none text-dark" style={{ boxShadow: "none" }}>
                                    <img src={'https://tmcell.tm/api/api/compress/news/' + news.news_img} alt={news.title_tm} className="img-fluid rounded-4" style={{ height: "230px", objectFit: "cover" }} />
                                    <div className="card-body px-0">
                                        <span className="small me-4">{moment(news.createdAt).format('LL')}</span>
                                        <span className="bg-light py-1 px-2 rounded-3 fs-13 shadow-sm fw-black">
                                            {lang === "tm" ? news.category.name_tm : lang === "en" ? news.category.name_en : lang === "ru" ? news.category.name_ru : ""}
                                        </span>
                                        <div className="my-3 h5">
                                            {lang === "tm" ? news.title_tm : lang === "en" ? news.title_en : lang === "ru" ? news.title_ru : ""}
                                        </div>
                                        <p className='text-secondary fs-15' style={{ lineHeight: "30px" }} dangerouslySetInnerHTML={{
                                            __html:
                                                lang === "tm" ? news.description_tm.substring(0, 150) + "..." : lang === "en" ? news.description_en.substring(0, 150) + "..." : lang === "ru" ? news.description_ru.substring(0, 150) + "..." : ""
                                        }}></p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                    <div data-aos={"fade-up"} className="col-xl-12 mb-5 text-center">
                        <Link to="/tazelikler" className="btn btn-primary px-5">{t('bannerBtn')}</Link>
                    </div>
                </div>
            </div>

            <div className='bg-light py-5'>
                <div className='container mt-5 mb-5'>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12 mb-4'>
                            <div className="text-center">
                                <div className='h1 mb-0' data-aos={"fade-up"}>{t('contact')}</div>
                                <div className='d-flex justify-content-center'>
                                    <hr style={{ borderBottom: "1px solid black", width: "80px" }} />
                                </div>
                                <p data-aos={"fade-up"}>
                                    {t('contactDescription')}
                                </p>
                            </div>
                        </div>
                        <div className='col-xl-10'>
                            <form className='row justify-content-center' onSubmit={handleClick}>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-4">
                                    <input data-aos={"fade-up"} value={contact.name} onChange={handleChange} name='name' type="text" className="form-control rounded-0" placeholder={t('name')} autoComplete='off' />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-4">
                                    <input data-aos={"fade-up"} value={contact.email} onChange={handleChange} name='email' type="email" className="form-control rounded-0" placeholder={t('email')} autoComplete='off' />
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-12 mb-4">
                                    <input data-aos={"fade-up"} value={contact.subject} onChange={handleChange} name='subject' type="text" className="form-control rounded-0" placeholder={t('subject')} autoComplete='off' />
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-12 mb-4">
                                    <textarea data-aos={"fade-up"} value={contact.comment} onChange={handleChange} name='comment' typeof='string' className="form-control rounded-0" rows="6" placeholder={t('comment')}></textarea>
                                </div>
                                <div className="col-xl-8 mb-4 text-center d-grid">
                                    <button data-aos={"fade-up"} className='btn btn-primary px-5 py-1'>{t('send')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home