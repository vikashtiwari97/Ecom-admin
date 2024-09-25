import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { authService } from '../Api/service/authService';
import axios from '../Api/axios/axios_config';

const SlideImage = () => {
    const [productName, setProductName] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDiscription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = authService.getToken();

    useEffect(() => {
        if (!token) {
            toast.error('No auth token found! Please login first.');
        }
    }, [token]);

    const handleAddProduct = async () => {
        if (!productName || !productImage || !productDescription || !productTitle) {
            toast.error('Please provide all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('images', productImage);
        formData.append('title', productTitle);
        formData.append('description', productDescription);
        setLoading(true);

        try {
            const response = await axios.post('/api/slide-images/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': token,
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Product added successfully:', response.data);
                toast.success('Product added successfully!');
                setProductName('');
                setProductTitle('');
                setProductDiscription('');
                setProductImage(null);
            } else {
                toast.error(`Failed to add product. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
            toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Add Slide Image</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'hidden' }}>
                        <div className='row'>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    placeholder="Name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => setProductImage(e.target.files[0])}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    placeholder="Title"
                                    value={productTitle}
                                    onChange={(e) => setProductTitle(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0 mt-2">
                                <input
                                    type="text"
                                    className="form-control form-control-user"
                                    placeholder="Description"
                                    value={productDescription}
                                    onChange={(e) => setProductDiscription(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="btn btn-primary mr-2"
                            onClick={handleAddProduct}
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setProductName('');
                                setProductImage(null);
                            }}
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

export default SlideImage;
