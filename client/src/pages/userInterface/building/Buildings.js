import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Api_Address from '../../../env';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import FetchData from '../../../hooks/FetchData';
import i18n from "i18next";

const Buildings = () => {

    const { t } = useTranslation();
    const lang = i18n.language;

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage((selected + 1))
    }

    const [buildings, loading, error, pages] = FetchData("/api/v1/building", "buildings", page);

    if (error) {
        toast.error(error.message);
    }

    return (
        <>

            <div className='container py-5'>
                <div className="text-center fw-bold my-5 display-5">{t('parkTitle')}</div>
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
                            buildings.map((building, index) => (
                                <Link to={`/seyilgah/${building.id}`} key={index} className='col-xl-3 col-lg-4 col-md-6 col-12 d-xl-block d-lg-block d-md-block d-none mb-4 text-decoration-none text-dark'>
                                    <div className='card rounded-0 border-0 shadow h-100'>
                                        <div className="d-flex justify-content-center align-items-center h-100">
                                            <img src={`${Api_Address}/img/building/${building.building_img}`} alt="surat" className='img-fluid px-3' />
                                        </div>
                                        <div className='card-body'>
                                            <div className='card-text mb-3 h4'>{lang === "tm" ? building.name : lang === "en" ? building.name_en : lang === "ru" ? building.name_ru : ""}</div>
                                            <div className='card-text h5 mb-3 fst-italic text-secondary'>{lang === "tm" ? building.title : lang === "en" ? building.title_en : lang === "ru" ? building.title_ru : ""}</div>
                                            <p dangerouslySetInnerHTML={{ __html: lang === "tm" ? building.description.substring(0, 70) + "..." : lang === "en" ? building.description_en.substring(0, 70) + "..." : lang === "ru" ? building.description_ru.substring(0, 70) + "..." : "" }}></p>
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
                            buildings.map((building, index) => (
                                <Link to={`/seyilgah/${building.id}`} key={index} className='col-xl-3 col-lg-4 col-md-6 col-12 d-xl-none d-lg-none d-md-none d-block mb-4 text-decoration-none text-dark'>
                                    <div className='card mb-3 border-0 h-100'>
                                        <div className='row g-0 align-items-center h-100'>
                                            <div className="col-md-4 col-4 align-items-center">
                                                <img src={`${Api_Address}/img/building/${building.building_img}`} alt="surat" className='img-fluid rounded-start' />
                                            </div>
                                            <div className='col-md-8 col-8'>
                                                <div className='card-body'>
                                                    <div className='card-text mb-3 h4'>{lang === "tm" ? building.name : lang === "en" ? building.name_en : lang === "ru" ? building.name_ru : ""}</div>
                                                    <div className='card-text h5 mb-3 fst-italic text-secondary'>{lang === "tm" ? building.title : lang === "en" ? building.title_en : lang === "ru" ? building.title_ru : ""}</div>
                                                    <p dangerouslySetInnerHTML={{ __html: lang === "tm" ? building.description.substring(0, 70) + "..." : lang === "en" ? building.description_en.substring(0, 70) + "..." : lang === "ru" ? building.description_ru.substring(0, 70) + "..." : "" }}></p>
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

export default Buildings