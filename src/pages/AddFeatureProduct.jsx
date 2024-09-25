import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { authService } from '../Api/service/authService';
import axios from '../Api/axios/axios_config';

const AddFeatureProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [weight, setWeight] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [inStock, setInStock] = useState(true);
    const [mrp, setMrp] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = authService.getToken();

    useEffect(() => {
        if (!token) {
            toast.error('No auth token found! Please login first.');
        }
    }, [token]);

    const handleAddProduct = async () => {
        if (!productName || !productImage || !price || !material || !weight || !category || !subCategory || !mrp) {
            toast.error('Please provide all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('material', material);
        formData.append('weight', weight);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('inStock', inStock);
        formData.append('mrp', mrp);
        formData.append('images', productImage);

        setLoading(true);

        try {
            const response = await axios.post('/api/featured-products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': token,
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Product added successfully:', response.data);
                toast.success('Product added successfully!');
                setProductName('');
                setDescription('');
                setPrice('');
                setMaterial('');
                setWeight('');
                setCategory('');
                setSubCategory('');
                setInStock(true);
                setMrp('');
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
                    <h6 className="m-0 font-weight-bold text-primary">Add Feature Product</h6>
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
                                    className="form-control"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0  mt-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0  mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Material"
                                    value={material}
                                    onChange={(e) => setMaterial(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0  mt-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0  mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0  mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="SubCategory"
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0  mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={inStock}
                                    onChange={(e) => setInStock(e.target.checked)}
                                    style={{ width: '30%' }}
                                /> In Stock
                            </div>
                            <div className="col-sm-6 mb-3 mb-sm-0  mt-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="MRP"
                                    value={mrp}
                                    onChange={(e) => setMrp(e.target.value)}
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
                                setDescription('');
                                setPrice('');
                                setMaterial('');
                                setWeight('');
                                setCategory('');
                                setSubCategory('');
                                setInStock(true);
                                setMrp('');
                                setProductImage(null);
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AddFeatureProduct;
