import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { creatPark } from '../../../redux/slices/parks';

const AdminBuildingCreate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [img, setImg] = useState('')
    const [park, setPark] = useState({
        name: "",
        name_en: "",
        name_ru: "",
        title: "",
        title_en: "",
        title_ru: "",
    })
    const [description, setDescription] = useState()
    const [descriptionEn, setDescriptionEn] = useState()
    const [descriptionRu, setDescriptionRu] = useState()

    const handleChange = (e) => {
        setPark((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('building_img', img)
        formData.append('name', park.name)
        formData.append('name_en', park.name_en)
        formData.append('name_ru', park.name_ru)
        formData.append('title', park.title)
        formData.append('title_en', park.title_en)
        formData.append('title_ru', park.title_ru)
        formData.append('description', description)
        formData.append('description_en', descriptionEn)
        formData.append('description_ru', descriptionRu)

        if (!park.name) {
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
            dispatch(creatPark(formData))
            navigate("/admin/seyilgahler")
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Taryhy-medeni seýilgäh Goşmak
                            </div>
                            <form className='row'>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='name' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Yazgysy</label>
                                    <input name='title' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady (EN)</label>
                                    <input name='name_en' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Yazgysy (EN)</label>
                                    <input name='title_en' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Ady (RU)</label>
                                    <input name='name_ru' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label className="form-label fw-bold">Yazgysy (RU)</label>
                                    <input name='title_ru' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data=""
                                        name='description'
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
                                        <input name='building_img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
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

export default AdminBuildingCreate