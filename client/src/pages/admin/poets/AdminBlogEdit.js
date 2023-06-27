import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api_Address from '../../../env';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import img_icon from '../../../assets/icons/img.svg'

const AdminBlogEdit = () => {

    const navigate = useNavigate()
    const { blogId } = useParams()

    const [blog, setBlog] = useState({
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
        setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/blog/edit/${blogId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setBlog(res.data.blog)
            setImg(res.data.blog.blog_img)
            setQr(res.data.blog.blog_qr)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [navigate, blogId])

    const handleClick = async (e) => {
        e.preventDefault()


        if (!img) {
            toast.error("Surat ýerleşdiriň")
        }
        else if (!qr) {
            toast.error("QR ýerleşdiriň")
        }
        else if (!blog.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!description) {
            toast.error("Mazmuny ýazyň")
        }
        else {
            const formData = new FormData()
            formData.append('title', blog.title)
            formData.append('description', description)
            formData.append('blog_img', img.pictureAsFile === undefined ? img : img.pictureAsFile)
            formData.append('blog_qr', qr.qrAsFile === undefined ? qr : qr.qrAsFile)

            await axios.post(`${Api_Address}/api/v1/blog/edit/${blogId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/admin/şahyrlar")
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
                                Şahyrlar we Ýazyjylary üýgetmek
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

                                            <input type="file" name="blog_img" id="upload" hidden onChange={onImageChange} />
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
                                            <input type="file" name="blog_qr" id="uploadQr" hidden onChange={onImageChangeQr} />
                                        </>
                                        :
                                        <img alt="" src={qr && prevQr} className='img-fluid' />
                                    }
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Ady</label>
                                    <input name='title' value={blog.title} onChange={handleChange} type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className='col-xl-12 mb-3'>
                                    <label className="form-label fw-bold">Beyany</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={blog.description}
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

export default AdminBlogEdit