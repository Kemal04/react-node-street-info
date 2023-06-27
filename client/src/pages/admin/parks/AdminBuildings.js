import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Api_Address from '../../../env';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { deletePark, getAllParks } from '../../../redux/slices/parks';

const AdminBuildings = () => {

    const dispatch = useDispatch();

    const { parks, isLoading, pages } = useSelector(state => state.parks)

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage((selected + 1))
    }

    useEffect(() => {
        dispatch(getAllParks(page))
    }, [dispatch, page])

    const handleDelete = async (id) => {
        dispatch(deletePark(id))
    }

    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Taryhy-medeni seýilgähler bölümi
                    <Link to="/admin/seyilgah-gos"><FontAwesomeIcon className='text-dark' icon={faPlus} /></Link>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Suraty</th>
                                    <th scope="col">Ady</th>
                                    <th scope="col">Yazgysy</th>
                                    <th scope="col">Mazmuny</th>
                                    <th scope="col">QR</th>
                                    <th scope="col">Düzetmek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === false &&
                                    parks.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((building, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={`${Api_Address}/img/building/${building.building_img}`} alt="" style={{ width: "100px" }} /></td>
                                            <td>{building.name}</td>
                                            <td>{building.title}</td>
                                            <td dangerouslySetInnerHTML={{ __html: building.description.substring(0, 40) + "..." }}></td>
                                            <td><img src={`${Api_Address}/img/building_qr/${building.building_qr}`} alt="" style={{ width: "100px" }} /></td>
                                            <td>
                                                <Link className='me-3 btn btn-sm btn-outline-warning mx-1' to={`/admin/seyilgah-uytget/${building.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(building.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-center text-center'>
                            {isLoading === true &&
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </div>
                    </div>
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
                </div>
            </div>
        </>
    )
}

export default AdminBuildings