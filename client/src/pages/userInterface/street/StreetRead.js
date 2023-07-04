import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Api_Address from '../../../env';
import { toast } from 'react-toastify';
import i18n from "i18next";

const StreetRead = () => {

    const { streetId } = useParams()
    const lang = i18n.language;

    const [street, setStreet] = useState("")

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/street/${streetId}`).then((res) => {
            setStreet(res.data.street)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [streetId])

    return (
        <div className='bg-light'>
            <div className='container py-5'>
                <div className='row justify-content-between'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5 h-lg-500'>
                        <div className='position-lg-fixed text-center'>
                            <img src={street.street_img === undefined ? "" : `${Api_Address}/img/street/${street.street_img}`} alt="" className='w-75' />
                            <div className='mt-4'>
                                <img src={street.street_qr === undefined ? "" : `${Api_Address}/img/street_qr/${street.street_qr}`} alt="" style={{ width: "200px" }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5'>
                        <div className='card border-0 rounded-0' style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                            <div className='card-body'>
                                <div className='card-text h2 mb-3'>{lang === "tm" ? street.title : lang === "en" ? street.title_en : lang === "ru" ? street.title_ru : ""}</div>
                                <p dangerouslySetInnerHTML={{ __html: street.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StreetRead