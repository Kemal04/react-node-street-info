import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Api_Address from '../../../env';
import { toast } from 'react-toastify';
import i18n from "i18next";

const HistoricalRead = () => {

    const { historicalId } = useParams()
    const lang = i18n.language;

    const [historical, setHistorical] = useState("")

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/individ/${historicalId}`).then((res) => {
            setHistorical(res.data.individ)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [historicalId])

    return (
        <div className='bg-light'>
            <div className='container py-5'>
                <div className='row justify-content-between'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5 h-lg-500'>
                        <div className='position-lg-fixed'>
                            <img src={historical.individ_img === undefined ? "" : `${Api_Address}/img/individ/${historical.individ_img}`} alt="" className='img-fluid' />
                            <div className='text-center mt-4'>
                                <img src={historical.individ_qr === undefined ? "" : `${Api_Address}/img/individ_qr/${historical.individ_qr}`} alt="" style={{ width: "200px" }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5'>
                        <div className='card border-0 rounded-0' style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                            <div className='card-body'>
                                <div className='card-text h2 mb-3'>{lang === "tm" ? historical.title : lang === "en" ? historical.title_en : lang === "ru" ? historical.title_ru : ""}</div>
                                <p dangerouslySetInnerHTML={{
                                    __html:
                                        lang === "tm" ? historical.description : lang === "en" ? historical.description_en : lang === "ru" ? historical.description_ru : ""
                                }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HistoricalRead