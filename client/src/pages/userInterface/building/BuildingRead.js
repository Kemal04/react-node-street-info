import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Api_Address from '../../../env';
import { toast } from 'react-toastify';

const BuildingRead = () => {

    const { buildingId } = useParams()

    const [building, setBuilding] = useState("")

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/building/${buildingId}`).then((res) => {
            setBuilding(res.data.building)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [buildingId])

    return (
        <div className='bg-light'>
            <div className='container py-5'>
                <div className='row justify-content-between'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5 h-lg-500'>
                        <div className='position-lg-fixed'>
                            <img src={building.building_img === undefined ? "" : `${Api_Address}/img/building/${building.building_img}`} alt="" className='img-fluid' />
                            <div className='text-center mt-4'>
                                <img src={building.building_qr === undefined ? "" : `${Api_Address}/img/building_qr/${building.building_qr}`} alt="" style={{ width: "200px" }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5'>
                        <div className='card border-0 rounded-0' style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                            <div className='card-body'>
                                <div className='card-text h2 mb-3'>{building.title}</div>
                                <p dangerouslySetInnerHTML={{ __html: building.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuildingRead