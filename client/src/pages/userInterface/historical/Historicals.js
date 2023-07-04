import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Api_Address from '../../../env';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import FetchData from '../../../hooks/FetchData';
import i18n from "i18next";

const Historicals = () => {

    const { t } = useTranslation();
    const lang = i18n.language;

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage((selected + 1))
    }

    const [individs, loading, error, pages] = FetchData("/api/v1/individ", "individs", page);

    if (error) {
        toast.error(error.message);
    }

    return (
        <>
            <div className='container py-5'>
                <div className="text-center fw-bold my-5 display-5">{t('historicalTitle')}</div>
                <div className='row'>
                    {
                        loading ? (
                            <span className='col-6 text-end p-0'>
                                <div className="spinner-grow text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-grow text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </span>
                        ) : (
                            individs.map((individ, index) => (
                                <Link to={`/taryhy-sahslar/${individ.id}`} key={index} className='col-xl-3 col-lg-4 col-md-6 col-12 d-xl-block d-lg-block d-md-block d-none mb-4 text-decoration-none text-dark'>
                                    <div className='card rounded-0 border-0 shadow h-100'>
                                        <div className="d-flex justify-content-center align-items-center h-100">
                                            <img src={`${Api_Address}/img/individ/${individ.individ_img}`} alt="surat" className='img-fluid px-3' />
                                        </div>
                                        <div className='card-body'>
                                            <div className='card-text mb-3 h4'>{lang === "tm" ? individ.title : lang === "en" ? individ.title_en : lang === "ru" ? individ.title_ru : ""}</div>
                                            <p dangerouslySetInnerHTML={{ __html: lang === "tm" ? individ.description.substring(0, 70) + "..." : lang === "en" ? individ.description_en.substring(0, 70) + "..." : lang === "ru" ? individ.description_ru.substring(0, 70) + "..." : "" }}></p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                    {
                        loading ? (
                            <span className='col-6 p-0'>
                                <div className="spinner-grow text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </span>
                        ) : (
                            individs.map((individ, index) => (
                                <Link to={`/taryhy-sahslar/${individ.id}`} key={index} className='col-xl-3 col-lg-4 col-md-6 col-12 d-xl-none d-lg-none d-md-none d-block mb-4 text-decoration-none text-dark'>
                                    <div className="card mb-3 border-0 h-100">
                                        <div className="row g-0 align-items-center h-100">
                                            <div className="col-md-4 col-4 align-items-center">
                                                <img src={`${Api_Address}/img/individ/${individ.individ_img}`} alt="surat" className='img-fluid px-3' />
                                            </div>
                                            <div className="col-md-8 col-8">
                                                <div className='card-body'>
                                                    <div className='card-text mb-3 h4'>{lang === "tm" ? individ.title : lang === "en" ? individ.title_en : lang === "ru" ? individ.title_ru : ""}</div>
                                                    <p dangerouslySetInnerHTML={{ __html: lang === "tm" ? individ.description.substring(0, 70) + "..." : lang === "en" ? individ.description_en.substring(0, 70) + "..." : lang === "ru" ? individ.description_ru.substring(0, 70) + "..." : "" }}></p>
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
            </div >
        </>
    )
}

export default Historicals