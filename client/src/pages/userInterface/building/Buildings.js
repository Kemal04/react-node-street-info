import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Api_Address from '../../../env';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Buildings = () => {

    //STREETS
    const [buildings, setBuildings] = useState([])

    const [page, setPage] = useState(1)

    const [pages, setPages] = useState()

    const changePage = ({ selected }) => {
        console.log(selected);
        setPage((selected + 1))
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}/api/v1/building`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
                params: {
                    page: page
                }
            }).then((res) => {
                setBuildings(res.data.buildings)
                setPages(res.data.pagination.pages)
            })
        }
        fetchData()
    }, [page])

    return (
        <>

            <div className='container py-5'>
                <div className="text-center fw-bold my-5 display-5">Taryhy-medeni seýilgähler</div>
                <div className='row'>
                    {
                        buildings.map((building, index) => (
                            <Link to={`/seyilgah/${building.id}`} key={index} className='col-xl-3 col-lg-4 col-md-6 col-12 d-xl-block d-lg-block d-md-block d-none mb-4 text-decoration-none text-dark'>
                                <div className='card rounded-0 border-0 shadow h-100'>
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        <img src={`${Api_Address}/img/building/${building.building_img}`} alt="surat" className='img-fluid px-3' />
                                    </div>
                                    <div className='card-body'>
                                        <div className='card-text mb-3 h4'>{building.name}</div>
                                        <div className='card-text h5 mb-3 fst-italic text-secondary'>{building.title}</div>
                                        <p dangerouslySetInnerHTML={{ __html: building.description.substring(0, 70) + "..." }}></p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                    {
                        buildings.map((building, index) => (
                            <Link to={`/seyilgah/${building.id}`} key={index} className='col-xl-3 col-lg-4 col-md-6 col-12 d-xl-none d-lg-none d-md-none d-block mb-4 text-decoration-none text-dark'>
                                <div className='card mb-3 border-0 h-100'>
                                    <div className='row g-0 align-items-center h-100'>
                                        <div className="col-md-4 col-4 align-items-center">
                                            <img src={`${Api_Address}/img/building/${building.building_img}`} alt="surat" className='img-fluid rounded-start' />
                                        </div>
                                        <div className='col-md-8 col-8'>
                                            <div className='card-body'>
                                                <div className='card-text mb-3 h4'>{building.name}</div>
                                                <div className='card-text h5 mb-3 fst-italic text-secondary'>{building.title}</div>
                                                <p dangerouslySetInnerHTML={{ __html: building.description.substring(0, 70) + "..." }}></p>
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
            </div >
        </>
    )
}

export default Buildings