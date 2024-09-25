// import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
// import { authService } from '../Api/service/authService';
// import { toast } from 'react-toastify';
// import axios from '../Api/axios/axios_config';
// import { ToastContainer } from 'react-toastify';
// import UpdateProduct from '../shared/UpdateProduct';

// const AllProduct = () => {
//   const [productData, setProductData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedImage, setSelectedImage] = useState(null); // For holding the selected image
//   const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility
//   const rowsPerPage = 10;
//   const token = authService.getToken();
//   const [userData, setUserData] = useState([]);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [productToEdit, setProductToEdit] = useState(null);

//   const fetchProducts = () => {
//     if (!token) {
//         toast.error('No auth token found! Please login first.');
//         return;
//     }

//     axios.get('/api/products/get', {
//         headers: {
//             'Content-Type': 'application/json',
//             "auth-token": token,
//         },
//     })
//     .then(response => {
//         if (response.data) {
//             setUserData(response.data);
//         } else {
//             toast.error('Failed to fetch user data.');
//         }
//     })
//     .catch(error => {
//         console.error('There was an error fetching the user data:', error);
//         toast.error('An error occurred while fetching user data.');
//     });
// };

//   useEffect(() => {
//     console.log("This useEffect is running");

//     if (!token) {
//       toast.error('No auth token found! Please login first.');
//       console.log('No auth token found! Please login first.');
//       return;
//     }

//     axios.get('/api/products/get', {
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": token,
//       },
//     })
//       .then(response => {
//         if (response.data) {
//           console.log('Product data:', response.data); 
//           setProductData(response.data); 
//         } else {
//           toast.error('Failed to fetch product data.');
//         }
//       })
//       .catch(error => {
//         console.error('There was an error fetching the product data:', error);
//         toast.error('An error occurred while fetching product data.');
//       });
      
//   }, [token]);

//   // Updated function to convert buffer to base64 using ArrayBuffer and btoa
//   const convertBufferToBase64 = (buffer) => {
//     const binary = new Uint8Array(buffer).reduce((data, byte) => {
//       return data + String.fromCharCode(byte);
//     }, '');
//     return `data:image/png;base64,${window.btoa(binary)}`;
//   };
  
//   const handleImageClick = (imageBuffer) => {
//     const base64Image = convertBufferToBase64(imageBuffer);
//     setSelectedImage(base64Image); // Set the selected image in state
//     setIsModalOpen(true); // Open the modal
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//     setSelectedImage(null); // Clear the selected image
//   };

//   const currentRows = productData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//   };

//   // Updated function to handle DELETE API call
//   const handleDeleteClick = (slug) => {
//     if (!token) {
//       toast.error('No auth token found! Please login first.');
//       return;
//     }

//     const deleteUrl = `/api/products/delete/${slug}`;

//     axios.delete(deleteUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": token,
//       },
//     })
//     .then(response => {
//       toast.success('Product deleted successfully!');
//       // Update the productData state to reflect the deletion
//       setProductData(productData.filter(product => product.slug !== slug)); // Remove the deleted product from the list
//     })
//     .catch(error => {
//       console.error('Error deleting the product:', error);
//       toast.error('Failed to delete the product.');
//     });
//   };

//   const handleEditClick = (product) => {
//     setProductToEdit(product);
//     setIsEditModalOpen(true);
// };

// const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setProductToEdit(null);
//     fetchProducts(); // Refresh the product list after closing the edit modal
// };

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { authService } from '../Api/service/authService';
import { toast } from 'react-toastify';
import axios from '../Api/axios/axios_config';
import { ToastContainer } from 'react-toastify';
import UpdateProduct from '../shared/UpdateProduct';
import DeleteConfirmation from './DeleteConfirmation'; // Import the DeleteConfirmation component

const AllProduct = () => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [productToDelete, setProductToDelete] = useState(null); // Product to delete
  const rowsPerPage = 10;
  const token = authService.getToken();

  const fetchProducts = () => {
    if (!token) {
      toast.error('No auth token found! Please login first.');
      return;
    }

    axios.get('/api/products/get', {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token,
      },
    })
    .then(response => {
      if (response.data) {
        setProductData(response.data);
      } else {
        toast.error('Failed to fetch product data.');
      }
    })
    .catch(error => {
      console.error('There was an error fetching the product data:', error);
      toast.error('An error occurred while fetching product data.');
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const convertBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    return `data:image/png;base64,${window.btoa(binary)}`;
  };
  
  const handleImageClick = (imageBuffer) => {
    const base64Image = convertBufferToBase64(imageBuffer);
    setSelectedImage(base64Image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const currentRows = productData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleDeleteClick = (slug) => {
    setProductToDelete(slug);
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const confirmDelete = () => {
    if (!token) {
      toast.error('No auth token found! Please login first.');
      return;
    }

    const deleteUrl = `/api/products/delete/${productToDelete}`;

    axios.delete(deleteUrl, {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token,
      },
    })
    .then(() => {
      toast.success('Product deleted successfully!');
      setProductData(productData.filter(product => product.slug !== productToDelete));
      setIsDeleteModalOpen(false); // Close the delete confirmation modal
      setProductToDelete(null); // Clear the product to delete
    })
    .catch(error => {
      console.error('Error deleting the product:', error);
      toast.error('Failed to delete the product.');
    });
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
    setProductToDelete(null); // Clear the product to delete
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
          <h6 className="m-0 font-weight-bold text-primary">Product Details</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Rating</th>
                  <th>Material</th>
                  <th>Color</th>
                  <th>Weight</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>In Stock</th>
                  <th>Best Seller</th>
                  <th>Recommended</th>
                  <th>Trending</th>
                  <th>Tags</th>
                  <th>Images</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.description}</td>
                      <td>{row.price}</td>
                      <td>{row.mrp}</td>
                      <td>{row.rating}</td>
                      <td>{row.material}</td>
                      <td>{row.color}</td>
                      <td>{row.weight}</td>
                      <td>{row.category}</td>
                      <td>{row.subCategory}</td>
                      <td>{row.inStock ? 'Yes' : 'No'}</td>
                      <td>{row.bestSeller ? 'Yes' : 'No'}</td>
                      <td>{row.recommended ? 'Yes' : 'No'}</td>
                      <td>{row.trending ? 'Yes' : 'No'}</td>
                      <td>{row.tags.join(', ')}</td> {/* Render tags as a comma-separated string */}
                      <td className='text-center'>
                        {row.images && row.images.length > 0 ? (
                          <button 
                            className="btn btn-info btn-sm" 
                            onClick={() => handleImageClick(row.images[0].data.data)}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        ) : 'No image available'}
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


                        {/* <button className="btn btn-info btn-sm mx-2 mt-2 border-0"><i className="fa-solid fa-pen-to-square"></i></button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="16">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(productData.length / rowsPerPage)}
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
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
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
                        <UpdateProduct 
                            productSlug={productToEdit.slug} // Pass the productSlug to UpdateFeatureProduct
                            onClose={closeEditModal} // Close modal after update and refresh list
                        />
                    </div>
                </div>
            )}


      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmation 
          onConfirm={confirmDelete} 
          onCancel={cancelDelete} 
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
          max-width: 600px;
          max-height: 400px;
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

export default AllProduct;
