import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './components/admin-login/Login';
import Register from './components/admin-login/admin-register/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import AddFeatureProduct from './pages/AddFeatureProduct';
import AllFeatureProduct from './pages/AllFeatureProduct';
import Silver from './pages/Silver';
import AddTrendingProduct from './pages/AddTrendingProduct';
import AllTrendingProduct from './pages/AllTrendingProduct';
import AllSampleProduct from './pages/AlllSampleProduct';
import AddSampleProduct from './pages/AddSampleProduct';
import AddProduct from './pages/AddProduct';
import AllProduct from './pages/AllProduct';

import AllSilver from './pages/AllSilver';
import SlideImage from './pages/SlideImage';
import AllSlideImage from './pages/AllSlideImage'
import AddGoldenBangles from './pages/AddGoldenBangles';
import AllGoldenBangles from './pages/AllGoldenBangles';

import AddCollections from './pages/AddCollections';
import AllCollections from './pages/AlllCollections';



function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/add-feature-product" element={<AddFeatureProduct/>} />
                <Route path="/all-feature-product" element={<AllFeatureProduct/>} />
                <Route path="/add-Trending-product" element={<AddTrendingProduct/>} />
                <Route path="/all-Trending-product" element={<AllTrendingProduct/>} />
                <Route path="/all-products" element={<AllProduct/>} />
                <Route path="/add-products" element={<AddProduct/>} />

                <Route path="/add-Sample-product" element={<AddSampleProduct/>} />
                <Route path="/all-Sample-product" element={<AllSampleProduct/>} />
                <Route path="/add-silver-product" element={<Silver/>} />
                <Route path="/all-silver-product" element={<AllSilver/>} />
                <Route path="/add-SlideImage" element={<SlideImage/>} />
                <Route path="/all-SlideImage" element={<AllSlideImage/>} />
                <Route path="/all-golden-bangles" element={<AllGoldenBangles/>} />
                <Route path="/add-golden-bangles" element={<AddGoldenBangles/>} />
                <Route path="/add-collections" element={<AddCollections/>} />
                <Route path="/all-collections" element={<AllCollections/>} />




              </Routes>
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
