import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api_Address from '../../../env';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import img_icon from '../../../assets/icons/img.svg'

const AdminBuildingEdit = () => {

    const navigate = useNavigate()
    const { buildingId } = useParams()

    const [building, setBuilding] = useState({
        name: "",
        title: "",
        description: "",
    })
    const [img, setImg] = useState('')
    const [qr, setQr] = useState('')
    const [description, setDescription] = useState()
    const [prevImg, setPrevImg] = useState(null)
    const [prevQr, setPrevQr] = useState(null)

    //IMAGE SAVE
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPrevImg(URL.createObjectURL(e.target.files[0]));
        }
        setImg(e.target.files[0])
    }

    //QR SAVE
    const onImageChangeQr = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPrevQr(URL.createObjectURL(e.target.files[0]));
        }
        setQr(e.target.files[0])
    }

    const handleChange = (e) => {
        setBuilding((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/building/edit/${buildingId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setBuilding(res.data.building)
            setImg(res.data.building.building_img)
            setQr(res.data.building.building_qr)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [navigate, buildingId])

    const handleClick = async (e) => {
        e.preventDefault()


        if (!img) {
            toast.error("Surat ýerleşdiriň")
        }
        else if (!qr) {
            toast.error("QR ýerleşdiriň")
        }
        else if (!building.name) {
            toast.error("Adyny ýazyň")
        }
        else if (!building.title) {
            toast.error("Ýazgysy ýazyň")
        }
        else if (!description) {
            toast.error("Mazmuny ýazyň")
        }
        else {

            const formData = new FormData()
            formData.append('name', building.name)
            formData.append('title', building.title)
            formData.append('description', description)
            formData.append('building_img', img.pictureAsFile === undefined ? img : img.pictureAsFile)
            formData.append('building_qr', qr.qrAsFile === undefined ? qr : qr.qrAsFile)

            await axios.post(`${Api_Address}/api/v1/building/edit/${buildingId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((res) => {
                toast.success(res.data.success)
                navigate("/admin/seyilgahler")
            }).catch((res) => {
                toast.error(res.response.data.error)
            })
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Taryhy-medeni seýilgäh üýgetmek
                            </div>
                            <form className='row'>
                                <div className="col-lg-8 mb-3">
                                    {prevImg === null
                                        ?
                                        <>
                                            <label className='label text-center d-flex justify-content-center align-items-center flex-column' htmlFor="upload">
                                                <img src={img_icon} alt="" className='img-fluid mb-2' />
                                                <div className='text-success fw-normal'>{img ? "Surat Bar" : "Surat goş"}</div>
                                            </label>

                                            <input type="file" name="building_img" id="upload" hidden onChange={onImageChange} />
                                        </>
                                        :
                                        <img alt="" src={prevImg} className='img-fluid' />
                                    }
                                </div>

                                <div className="col-lg-4 mb-3">
                                    {prevQr === null
                                        ?
                                        <>
                                            <label className='label text-center d-flex justify-content-center align-items-center flex-column' htmlFor="uploadQr">
                                                <img src={img_icon} alt="" className='img-fluid mb-2' />
                                                <div className='text-success fw-normal'>{qr ? "QR Bar" : "QR goş"}</div>
                                            </label>
                                            <input type="file" name="building_qr" id="uploadQr" hidden onChange={onImageChangeQr} />
                                        </>
                                        :
                                        <img alt="" src={qr && prevQr} className='img-fluid' />
                                    }
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='name' value={building.name} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Yazgysy</label>
                                    <input name='title' value={building.title} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={building.description}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                        }}
                                    />
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} type="submit" className="btn btn-success">Üýgetmek</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminBuildingEdit