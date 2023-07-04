import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import i18n from "i18next";

const NewsRead = () => {

    const { newsId } = useParams()
    const lang = i18n.language;

    const [news, setNews] = useState({})
    const [category, setCategory] = useState({})

    useEffect(() => {
        axios.get(`https://tmcell.tm/api/api/v1/home/news/${newsId}`).then((res) => {
            setNews(res.data.news[0])
            setCategory(res.data.news[0].category)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [newsId])

    return (
        <>
            <div className='container my-5'>
                <div className='row justify-content-center'>
                    <div className='col-xl-8 text-center p-0'>
                        <img src={'https://tmcell.tm/api/api/img/news/' + news.news_img} alt="" className='img-fluid w-100 rounded-top' />
                    </div>
                    <div className='col-xl-8 p-5 bg-light shadow rounded-bottom'>
                        <div className='d-flex align-items-center '>
                            <div className='border-end pe-3 small'>
                                Kategoriýa
                                <div className='text-green fw-black'>{lang === "tm" ? category.name_tm : lang === "en" ? category.name_en : lang === "ru" ? category.name_ru : ""}</div>
                            </div>
                            <div className='border-end px-3 small'>
                                Senesi
                                <div className='text-green fw-black'>{moment(news.createdAt).format('LL')}</div>
                            </div>
                            <div className='ps-3 small'>
                                Görülen sany
                                <div className='text-green fw-black'>{news.viewed}</div>
                            </div>
                        </div>
                        <div className='my-4 h4 text-green'>
                            {lang === "tm" ? news.title_tm : lang === "en" ? news.title_en : lang === "ru" ? news.title_ru : ""}
                        </div>
                        <p style={{ textAlign: "justify", lineHeight: "30px" }} dangerouslySetInnerHTML={{ __html: lang === "tm" ? news.description_tm : lang === "en" ? news.description_en : lang === "ru" ? news.description_ru : "" }}></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsRead