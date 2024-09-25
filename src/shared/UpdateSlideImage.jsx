import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { authService } from '../Api/service/authService';
import axios from '../Api/axios/axios_config';

const UpdateSlideImage = ({ productSlug, onClose }) => {
    const [productName, setProductName] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = authService.getToken();

    useEffect(() => {
        if (!token) {
            toast.error('No auth token found! Please login first.');
            return;
        }

        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/api/slide-images/get/${productSlug}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    }
                });
                const product = response.data;
                setProductName(product.name || '');
                setProductTitle(product.title || '');
                setProductDescription(product.description || '');
            } catch (error) {
                console.error('Error fetching product details:', error.response?.data || error.message);
                toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
            }
        };

        fetchProductDetails();
    }, [productSlug, token]);

    const handleUpdateProduct = async () => {
        if (!productName || !productTitle || !productDescription) {
            toast.error('Please provide all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('title', productTitle);
        formData.append('description', productDescription);
        if (productImage) {
            formData.append('images', productImage);
        }

        setLoading(true);

        try {
            const response = await axios.put(`/api/slide-images/update/${productSlug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': token,
                }
            });

            if (response.status === 200) {
                toast.success('Product updated successfully!');

                // Immediately update state with new data if available
                const updatedProduct = response.data;
                setProductName(updatedProduct.name || '');
                setProductTitle(updatedProduct.title || '');
                setProductDescription(updatedProduct.description || '');
                setProductImage(null); // Clear image if update successful

                if (onClose) onClose(); // Close the modal after successful update
            } else {
                toast.error(`Failed to update product. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating product:', error.response?.data || error.message);
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setProductName('');
        setProductTitle('');
        setProductDescription('');
        setProductImage(null);
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Update Slide Image</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                        <div className='row'>
                            {/* Form Fields */}
                            {[{
                                value: productName,
                                setValue: setProductName,
                                placeholder: "Name",
                                type: "text"
                            },
                            {
                                value: productTitle,
                                setValue: setProductTitle,
                                placeholder: "Title",
                                type: "text"
                            },
                            {
                                value: productDescription,
                                setValue: setProductDescription,
                                placeholder: "Description",
                                type: "text"
                            }].map((field, index) => (
                                <div key={index} className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                    <input
                                        type={field.type}
                                        className="form-control"
                                        placeholder={field.placeholder}
                                        value={field.value}
                                        onChange={(e) => field.setValue(e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            ))}
                            <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => setProductImage(e.target.files[0])}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="btn btn-primary mr-2"
                            onClick={handleUpdateProduct}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateSlideImage;
