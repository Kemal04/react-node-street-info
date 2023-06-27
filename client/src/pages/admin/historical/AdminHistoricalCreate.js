import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { creatHistorical } from '../../../redux/slices/historicals';
import { useDispatch } from "react-redux";

const AdminHistoricalCreate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [img, setImg] = useState('')
    const [historical, setHistorical] = useState({
        title: "",
    })
    const [description, setDescription] = useState()

    const handleChange = (e) => {
        setHistorical((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('individ_img', img)
        formData.append('title', historical.title)
        formData.append('description', description)

        if (!historical.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!description) {
            toast.error("Mazmuny ýazyň")
        }
        else {
            dispatch(creatHistorical(formData))
            navigate("/admin/taryhy-sahslar")
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <div className='my-5 py-5'>
                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                Taryhy şahslar we beýlekileri Goşmak
                            </div>
                            <form className='row'>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='title' onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        name="description"
                                        editor={ClassicEditor}
                                        data=""
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                        }}
                                    />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Suraty</label>
                                    <div className="input-group mb-3">
                                        <input name='individ_img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
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

export default AdminHistoricalCreate