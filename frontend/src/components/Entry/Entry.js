import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Entry.css';

const Entry = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Page loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Form submission state
  const navigate = useNavigate();

  // Load admin credentials from environment variables
  const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

  // Simulate initial page loading (e.g., fetching resources or doing some background tasks)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 1.5 seconds, stop the loading animation and show the form
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (formData.username === adminUsername && formData.password === adminPassword) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

        // Set authentication state
        localStorage.setItem('authenticated', 'true');
        navigate('/', { replace: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="full-page-loader">
          {/* Full-page loader */}
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="layout-wrapper">
          <div className="content-area">
            <div className="login-container">
              <h2>Login</h2>
              {error && <p className="error-text">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-groups">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-groups password-group">
                  <label>Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="login-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Entry;
