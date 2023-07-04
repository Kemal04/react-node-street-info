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

    const [park, setPark] = useState({
        name: "",
        name_en: "",
        name_ru: "",
        title: "",
        title_en: "",
        title_ru: "",
        description: "",
        description_en: "",
        description_ru: "",
    })
    const [img, setImg] = useState('')
    const [qr, setQr] = useState('')
    const [description, setDescription] = useState()
    const [descriptionEn, setDescriptionEn] = useState()
    const [descriptionRu, setDescriptionRu] = useState()
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
        setPark((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/building/edit/${buildingId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setPark(res.data.building)
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
        else if (!park.name) {
            toast.error("Adyny ýazyň")
        }
        else if (!park.name_en) {
            toast.error("Adyny (EN) ýazyň")
        }
        else if (!park.name_ru) {
            toast.error("Adyny (RU) ýazyň")
        }
        else if (!park.title) {
            toast.error("Yazgysyny ýazyň")
        }
        else if (!park.title_en) {
            toast.error("Yazgysyny (EN) ýazyň")
        }
        else if (!park.title_ru) {
            toast.error("Yazgysyny (RU) ýazyň")
        }
        else if (!description) {
            toast.error("Mazmuny ýazyň")
        }
        else if (!descriptionEn) {
            toast.error("Mazmuny (EN) ýazyň")
        }
        else if (!descriptionRu) {
            toast.error("Mazmuny (RU) ýazyň")
        }
        else {

            const formData = new FormData()
            formData.append('name', park.name)
            formData.append('name_en', park.name_en)
            formData.append('name_ru', park.name_ru)
            formData.append('title', park.title)
            formData.append('title_en', park.title_en)
            formData.append('title_ru', park.title_ru)
            formData.append('description', description)
            formData.append('description_en', descriptionEn)
            formData.append('description_ru', descriptionRu)
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
                                    <input name='name' value={park.name} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Yazgysy</label>
                                    <input name='title' value={park.title} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady (EN)</label>
                                    <input name='name_en' value={park.name_en} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Yazgysy (EN)</label>
                                    <input name='title_en' value={park.title_en} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady (RU)</label>
                                    <input name='name_ru' value={park.name_ru} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Yazgysy (RU)</label>
                                    <input name='title_ru' value={park.title_ru} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={park.description}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                        }}
                                    />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={park.description_en}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescriptionEn(data)
                                        }}
                                    />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={park.description_ru}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescriptionRu(data)
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