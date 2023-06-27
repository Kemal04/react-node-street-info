import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Api_Address from '../../../env';
import { toast } from 'react-toastify';

const StreetRead = () => {

    const { streetId } = useParams()

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
                        <div className='position-lg-fixed'>
                            <img src={street.street_img === undefined ? "" : `${Api_Address}/img/street/${street.street_img}`} alt="" className='img-fluid' />
                            <div className='text-center mt-4'>
                                <img src={street.street_qr === undefined ? "" : `${Api_Address}/img/street_qr/${street.street_qr}`} alt="" style={{ width: "200px" }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5'>
                        <div className='card border-0 rounded-0' style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                            <div className='card-body'>
                                <div className='card-text h2 mb-3'>{street.title}</div>
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