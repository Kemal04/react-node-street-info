import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Api_Address from '../../../env';
import axios from 'axios';
import moment from 'moment'
import ReactPaginate from 'react-paginate';

const Blogs = () => {

    //BLOGS
    const [blogs, setBlogs] = useState([])

    const [page, setPage] = useState(1)

    const [pages, setPages] = useState()

    const changePage = ({ selected }) => {
        console.log(selected);
        setPage((selected + 1))
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/v1/blog`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
                params: {
                    page: page
                }
            }).then((res) => {
                setBlogs(res.data.blogs)
                setPages(res.data.pagination.pages)
            })
        }
        fetchData()
    }, [page])

    return (
        <div className='bg-light'>
            <div className='container py-5'>
                <div className='row'>

                    <div className='col-xl-12 col-lg-12 col-md-12'>
                        <div className="text-center fw-bold my-5 display-6">Şahyrlar we Ýazyjylar</div>
                        <div className='row'>
                            {
                                blogs.map((blog, index) => (
                                    <Link to={`/şahyr/${blog.id}`} key={index} className='col-xl-4 mb-4 text-decoration-none text-dark'>
                                        <div className="card mb-3 border-0 h-100">
                                            <div className="row g-0 align-items-center h-100">
                                                <div className="col-md-4 col-4 align-items-center">
                                                    <img src={`${Api_Address}/img/blog/${blog.blog_img}`} className="img-fluid rounded-start" alt="..." />
                                                </div>
                                                <div className="col-md-8 col-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{blog.title}</h5>
                                                        <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 70) + "..." }}></p>
                                                        <p className="card-text"><small className="text-muted">{moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                            <nav className='col-xl-12 d-flex justify-content-center mt-5'>
                                {
                                    pages === 1
                                        ?
                                        null
                                        :
                                        <ReactPaginate
                                            previousLabel="Yza"
                                            nextLabel="Öňe"
                                            pageCount={pages}
                                            onPageChange={changePage}
                                            containerClassName={"pagination"}
                                            pageLinkClassName={"page-link text-success"}
                                            previousLinkClassName={"page-link text-success"}
                                            nextLinkClassName={"page-link text-success"}
                                            activeLinkClassName={"page-link active bg-green border-green text-white"}
                                            disabledLinkClassName={"page-link disabled"}
                                        />
                                }
                            </nav>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs