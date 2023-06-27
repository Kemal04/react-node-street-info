import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Api_Address from '../../../env';
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import { deleteArtist, getAllArtists } from '../../../redux/slices/artists';

const AdminArtists = () => {

    const dispatch = useDispatch();

    const { artists, isLoading, pages } = useSelector(state => state.artists)

    const [page, setPage] = useState(1)

    const changePage = ({ selected }) => {
        setPage((selected + 1))
    }

    useEffect(() => {
        dispatch(getAllArtists(page))
    }, [dispatch, page])

    const handleDelete = async (id) => {
        dispatch(deleteArtist(id))
    }

    return (
        <>
            <div className='container py-5'>
                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                    Bagşy-sazandalar, artistler, türgenler bölümi
                    <Link to="/admin/artist-gos"><FontAwesomeIcon className='text-dark' icon={faPlus} /></Link>
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <table className="table">
                            <thead className='table-dark'>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Suraty</th>
                                    <th scope="col">Ady</th>
                                    <th scope="col">Mazmuny</th>
                                    <th scope="col">QR</th>
                                    <th scope="col">Düzetmek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading === false &&
                                    artists.slice().sort((a, b) => (a.id < b.id) ? 1 : -1).map((artist, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><img src={`${Api_Address}/img/artist/${artist.artist_img}`} alt="" style={{ width: "100px" }} /></td>
                                            <td>{artist.title}</td>
                                            <td dangerouslySetInnerHTML={{ __html: artist.description.substring(0, 40) + "..." }}></td>
                                            <td><img src={`${Api_Address}/img/artist_qr/${artist.artist_qr}`} alt="" style={{ width: "100px" }} /></td>
                                            <td>
                                                <Link className='me-3 btn btn-sm btn-outline-warning mx-1' to={`/admin/artist-uytget/${artist.id}`}><FontAwesomeIcon icon={faPencil} /></Link>
                                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(artist.id)}><FontAwesomeIcon icon={faTrash} /></button>
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

export default AdminArtists