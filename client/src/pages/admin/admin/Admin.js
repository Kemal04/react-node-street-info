import React, { useState } from 'react'
import '../../../App.css'
import Api_Address from '../../../env'
import axios from 'axios'

const Admin = () => {

    const [url, setUrl] = useState('')
    const [QrImage, setQrImage] = useState('')

    const generateQR = (e) => {
        e.preventDefault()

        axios.post(`${Api_Address}/api/v1/street/qr`, { url: url })
            .then((res) => {
                setQrImage(res.data)
            })
    }

    return (
        <div className='container'>
            <div className='text-center'>
                <div className='h2'>
                    QR kodyny ýasamak
                </div>
                <div className='row justify-content-center mt-4'>
                    <div className='col-xl-6'>
                        <input type="text" className='form-control' onChange={(e) => setUrl(e.target.value)} value={url} placeholder='URL giriziň' />
                        <div className='d-grid mt-3'>
                            <button className='btn btn-success' onClick={generateQR}>QR doret</button>
                        </div>
                    </div>
                    <div className='mt-5 pt-5'>
                        {
                            url.length > 0 && QrImage
                                ?
                                <>
                                    <a href={QrImage.url} download><img src={QrImage.url} alt="QRIMAGE" className='img-fluid' style={{ width: "200px" }} /></a>
                                    <p className='mt-3 h5'>Ýüklemek üçin QR koduň üstüne basyň</p>
                                </>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin