import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Api/axios/axios_config';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/admin/auth/login', {
        email,
        password,
      });

      if (response.data && response.data.success) {
        toast.success('Login successful!');
        login(response.data.authtoken);
        navigate('/');
      } else {
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/user/auth/recover-password', {
        email: recoverEmail,
      });

      if (response.data && response.data.success) {
        toast.success('Password recovery email sent!');
        setShowRecoverPassword(false); // Hide the recovery form after submission
      } else {
        toast.error(response.data.message || 'Failed to send recovery email. Please try again.');
      }
    } catch (error) {
      console.error('Error recovering password:', error);
      toast.error('An error occurred while sending recovery email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRecoverPassword = () => {
    setShowRecoverPassword(!showRecoverPassword);
  };

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      {showRecoverPassword ? (
                        <form onSubmit={handleRecoverPasswordSubmit} className="user">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              placeholder="Enter Email Address..."
                              value={recoverEmail}
                              name='email'
                              onChange={(e) => setRecoverEmail(e.target.value)}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                            disabled={loading}
                          >
                            {loading ? 'Sending...' : 'Recover Password'}
                          </button>
                          <hr />
                          <div className="text-center">
                            <button onClick={toggleRecoverPassword} className="btn btn-link small">
                              Back to Login
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handleLoginSubmit} className="user">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              placeholder="Enter Email Address..."
                              value={email}
                              name='email'
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              placeholder="Password"
                              name='password'
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input type="checkbox" className="custom-control-input" id="customCheck" />
                              <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                            disabled={loading}
                          >
                            {loading ? 'Logging in...' : 'Login'}
                          </button>
                          <hr />
                          <button className="btn btn-google btn-user btn-block">
                            <i className="fab fa-google fa-fw"></i> Login with Google
                          </button>
                          <button className="btn btn-facebook btn-user btn-block">
                            <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                          </button>
                        </form>
                      )}
                      <hr />
                      {!showRecoverPassword && (
                        <div className="text-center">
                          <button onClick={toggleRecoverPassword} className="btn btn-link small">
                            Forgot Password?
                          </button>
                        </div>
                      )}
                      <div className="text-center">
                        <Link to="/register" className="small">Create an Account!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;









