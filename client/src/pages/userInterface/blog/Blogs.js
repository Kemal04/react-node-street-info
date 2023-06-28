import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Api_Address from '../../../env';
import moment from 'moment'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import FetchData from '../../../hooks/FetchData';

const Blogs = () => {

    const { t } = useTranslation();

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage((selected + 1))
    }

    const [blogs, loading, error, pages] = FetchData("/api/v1/blog", "blogs", page);

    if (error) {
        toast.error(error.message);
    }

    console.log(blogs);

    return (
        <div className='bg-light'>
            <div className='container py-5'>
                <div className='row'>

                    <div className='col-xl-12 col-lg-12 col-md-12'>
                        <div className="text-center fw-bold my-5 display-6">{t('poetTitle')}</div>
                        <div className='row'>
                            {
                                loading ? (
                                    <span className='col-12 text-center p-0'>
                                        <div className="spinner-grow text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-grow text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-grow text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </span>
                                ) : (
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                )
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