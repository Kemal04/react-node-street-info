import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Api_Address from '../../../env';
import { toast } from 'react-toastify';
import moment from 'moment';

const BlogRead = () => {

    const { blogId } = useParams()

    const [blog, setBlog] = useState("")

    useEffect(() => {
        axios.get(`${Api_Address}/api/v1/blog/${blogId}`).then((res) => {
            setBlog(res.data.blog)
        }).catch((res) => {
            toast.error(res.response.data.error)
        })

    }, [blogId])

    return (
        <div className='bg-light'>
            <div className='container py-5'>
                <div className='row justify-content-between'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5 h-lg-500'>
                        <div className='position-lg-fixed'>
                            <img src={blog.blog_img === undefined ? "" : `${Api_Address}/img/blog/${blog.blog_img}`} alt="" className='img-fluid' />
                            <div className='text-center mt-4'>
                                <img src={blog.blog_qr === undefined ? "" : `${Api_Address}/img/blog_qr/${blog.blog_qr}`} alt="" style={{ width: "200px" }} />
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-5'>
                        <div className='card border-0 rounded-0' style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                            <div className='card-body'>
                                <div className='card-text h2 mb-3'>{blog.title}</div>
                                <p dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogRead