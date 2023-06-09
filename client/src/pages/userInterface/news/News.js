import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import i18n from "i18next";

const News = () => {

    const { t } = useTranslation();
    const lang = i18n.language;

    const [news, setNews] = useState([])

    const [popularNews, setPopularNews] = useState([])

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

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`https://tmcell.tm/api/api/v1/home/news/most`).then((res) => {
                setPopularNews(res.data.news)
            })
        }
        fetchData()
    }, [])

    return (
        <>
            <div className='container my-5 py-5'>
                <div className="text-center fw-bold my-5 display-5">{t('news')}</div>
                <div className='row g-5'>
                    <div className='col-xl-8'>
                        <div className='row'>
                            {
                                news.map((news, index) => (
                                    <Link to={`/tazelik/${news.id}`} className='col-xl-6 mb-4 text-decoration-none' key={index}>
                                        <div className='card border-0 shadow h-100 position-relative'>
                                            <div className='text-center' style={{ height: "250px" }}>
                                                <img src={'https://tmcell.tm/api/api/compress/news/' + news.news_img} alt="" className='img-fluid h-100 w-100' style={{ objectFit: "cover" }} />
                                            </div>
                                            <div className='card-body pb-5 pt-5 position-relative'>
                                                <div className='bg-green d-inline p-2 rounded-5 position-absolute small' style={{ top: "-20px" }}>
                                                    {lang === "tm" ? news.category.name_tm : lang === "en" ? news.category.name_en : lang === "ru" ? news.category.name_ru : ""}
                                                </div>
                                                <div className="h5 mb-3 text-green">
                                                    {lang === "tm" ? news.title_tm : lang === "en" ? news.title_en : lang === "ru" ? news.title_ru : ""}
                                                </div>
                                                <p className='text-dark' style={{ lineHeight: "30px" }} dangerouslySetInnerHTML={{
                                                    __html:
                                                        lang === "tm" ? news.description_tm.substring(0, 150) + "..." : lang === "en" ? news.description_en.substring(0, 150) + "..." : lang === "ru" ? news.description_ru.substring(0, 150) + "..." : ""
                                                }}></p>
                                            </div>
                                            <div className='d-flex align-items-center position-absolute border-top pt-3 small text-dark' style={{ bottom: "20px", left: "25px", width: "86%" }}>
                                                <FontAwesomeIcon icon={faCalendarAlt} className=' text-green' />
                                                <div className='ms-2'>{moment(news.createdAt).format('LL')}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                            <nav className='col-xl-12 d-flex justify-content-center mt-5'>
                                {
                                    pages === 1
                                        ?
                                        null
                                        :
                                        <ReactPaginate
                                            previousLabel="Yza"
                                            nextLabel="Öňe"
                                            pageCount={pages}
                                            onPageChange={changePage}
                                            containerClassName={"pagination"}
                                            pageLinkClassName={"page-link text-success"}
                                            breakClassName={'page-link text-success'}
                                            previousLinkClassName={"page-link text-success"}
                                            nextLinkClassName={"page-link text-success"}
                                            activeLinkClassName={"page-link active bg-green border-green text-white"}
                                            disabledLinkClassName={"page-link disabled"}
                                        />
                                }
                            </nav>
                        </div>
                    </div>
                    <div className='col-xl-4 px-3'>

                        <div>
                            <div className='h4 text-green border-bottom pb-3'>Meşhur täzelikler</div>
                            <div>
                                {
                                    popularNews.map((news, index) => (
                                        <Link to={`/tazelik/${news.id}`} className='text-decoration-none' key={index}>
                                            <div className='row align-items-center pb-4'>
                                                <div className='col-xl-4'>
                                                    <img src={'https://tmcell.tm/api/api/compress/news/' + news.news_img} alt="" className='img-fluid rounded-3' style={{ width: "150px", height: "75px", objectFit: "cover" }} />
                                                </div>
                                                <div className='col-xl-8'>
                                                    <div className='fs-17 fw-black text-green mb-1'>{news.title_tm}</div>
                                                    <div className='small text-dark'>{moment(news.createdAt).format('LL')}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News