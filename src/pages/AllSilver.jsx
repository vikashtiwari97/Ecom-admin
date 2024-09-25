import React, { useState, useEffect } from 'react'; 
import ReactPaginate from 'react-paginate';
import { authService } from '../Api/service/authService';
import { toast } from 'react-toastify';
import axios from '../Api/axios/axios_config';
import { ToastContainer } from 'react-toastify';
import UpdateSilverProduct from '../shared/UpdateSilverProduct';
import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component

const AllSilver = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [userData, setUserData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const rowsPerPage = 10;
    const token = authService.getToken();

    const fetchProducts = () => {
        if (!token) {
            toast.error('No auth token found! Please login first.');
            return;
        }

        axios.get('/api/silver-temple/get', {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token,
            },
        })
        .then(response => {
            if (response.data) {
                setUserData(response.data);
            } else {
                toast.error('Failed to fetch user data.');
            }
        })
        .catch(error => {
            console.error('There was an error fetching the user data:', error);
            toast.error('An error occurred while fetching user data.');
        });
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const convertBufferToBase64 = (buffer) => {
        if (!buffer || buffer.length === 0) return null;
        const binary = new Uint8Array(buffer).reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, '');
        return `data:image/png;base64,${window.btoa(binary)}`;
    };

    const currentRows = userData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleImageClick = (imageBuffer) => {
        const base64Image = convertBufferToBase64(imageBuffer);
        setSelectedImage(base64Image);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
    };

    const handleDeleteClick = (slug) => {
        setProductToDelete(slug);
        setIsDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        if (!token) {
            toast.error('No auth token found! Please login first.');
            return;
        }

        const deleteUrl = `/api/silver-temple/delete/${productToDelete}`;

        axios.delete(deleteUrl, {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token,
            },
        })
        .then(() => {
            toast.success('Product deleted successfully!');
            setUserData(userData.filter(product => product.slug !== productToDelete));
            setIsDeleteConfirmationOpen(false);
        })
        .catch(error => {
            console.error('Error deleting the product:', error);
            toast.error('Failed to delete the product.');
        });
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null);
        fetchProducts(); // Refresh the product list after closing the edit modal
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">All Silver Product</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Material</th>
                                    <th>Weight</th>
                                    <th>Category</th>
                                    <th>Sub Category</th>
                                    <th>In Stock</th>
                                    <th>Image</th>
                                    <th>Hover Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.description}</td>
                                            <td>{row.price}</td>
                                            <td>{row.material}</td>
                                            <td>{row.weight}</td>
                                            <td>{row.category}</td>
                                            <td>{row.subCategory}</td>
                                            <td>{row.inStock ? 'Yes' : 'No'}</td>
                                            <td className='text-center'>
                                                {row.images && row.images.length > 0 ? (
                                                    <button 
                                                        className="btn btn-info btn-sm border-0" 
                                                        onClick={() => handleImageClick(row.images[0].data.data)}
                                                    >
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                ) : 'No image available'}
                                            </td>
                                            <td className='text-center'>
                                                {row.hoverImage && row.hoverImage.data?.data?.length > 0 ? (
                                                    <button 
                                                        className="btn btn-info btn-sm border-0" 
                                                        onClick={() => handleImageClick(row.hoverImage.data.data)}
                                                    >
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                ) : 'No hover image available'}
                                            </td>
                                            <td className='text-center'>
                                                <button 
                                                    className="btn btn-info btn-sm bg-danger border-0"
                                                    onClick={() => handleDeleteClick(row.slug)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-info btn-sm mx-2 border-0"
                                                    onClick={() => handleEditClick(row)}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(userData.length / rowsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            </div>

            {/* Modal for displaying image */}
            {isImageModalOpen && (
                <div className="modal-overlay" onClick={closeImageModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeImageModal}>&times;</span>
                        {selectedImage && (
                            <img src={selectedImage} alt="Featured product" style={{ width: '500px', height: '500px' }} />
                        )}
                    </div>
                </div>
            )}

            {/* Modal for Edit Product */}
            {isEditModalOpen && productToEdit && (
                <div className="modal-overlay" onClick={closeEditModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeEditModal}>&times;</span>
                        <UpdateSilverProduct 
                            productSlug={productToEdit.slug}
                            onClose={closeEditModal}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmationOpen && (
                <DeleteConfirmation 
                    onConfirm={confirmDelete} 
                    onCancel={() => setIsDeleteConfirmationOpen(false)} 
                />
            )}

            {/* Modal styling */}
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                    max-width: 90%;
                    max-height: 100%;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                }
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 30px;
                    cursor: pointer;
                }
            `}</style>
            <ToastContainer />
        </div>
    );
};

export default AllSilver;
