import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const NewsRead = () => {

    const { newsId } = useParams()

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
                                <div className='text-green fw-black'>{category.name_tm}</div>
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
                            {news.title_tm}
                        </div>
                        <p style={{ textAlign: "justify", lineHeight: "30px" }} dangerouslySetInnerHTML={{ __html: news.description_tm }}></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsRead