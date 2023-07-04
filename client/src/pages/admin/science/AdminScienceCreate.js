import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { creatScience } from '../../../redux/slices/sciences';

const AdminScienceCreate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [img, setImg] = useState('')
    const [science, setScience] = useState({
        title: "",
        title_en: "",
        title_ru: "",
    })
    const [description, setDescription] = useState()
    const [descriptionEn, setDescriptionEn] = useState()
    const [descriptionRu, setDescriptionRu] = useState()

    const handleChange = (e) => {
        setScience((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('staff_img', img)
        formData.append('title', science.title)
        formData.append('title_en', science.title_en)
        formData.append('title_ru', science.title_ru)
        formData.append('description', description)
        formData.append('description_en', descriptionEn)
        formData.append('description_ru', descriptionRu)

        if (!science.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!science.title_en) {
            toast.error("Adyny (EN) ýazyň")
        }
        else if (!science.title_ru) {
            toast.error("Adyny (RU) ýazyň")
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
            dispatch(creatScience(formData))
            navigate("/admin/ylmy-isgarler")
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Ylmy işgärleri Goşmak
                            </div>
                            <form className='row'>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='title' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Ady (EN)</label>
                                    <input name='title_en' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Ady (RU)</label>
                                    <input name='title_ru' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                        }}
                                    />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany (EN)</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescriptionEn(data)
                                        }}
                                    />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany (RU)</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescriptionRu(data)
                                        }}
                                    />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Suraty</label>
                                    <div className="input-group mb-3">
                                        <input name='staff_img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} type="submit" className="btn btn-success rounded-0">Goşmak</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminScienceCreate