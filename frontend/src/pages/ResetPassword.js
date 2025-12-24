import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('Email is required.');
      return;
    }
    try {
      const { data } = await api.post('/auth/reset-password', { email });
      setMessage(data.message || 'Request received.');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow">Account recovery</span>
          <h2>Reset your password</h2>
          <p className="muted">We will send a reset link to your email.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder=" "
            />
            <span>Email</span>
          </label>
          {error && <div className="form-error">{error}</div>}
          {message && <div className="form-success">{message}</div>}
          <button className="btn primary" type="submit">
            Send reset link
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">Back to login</Link>
        </div>
      </div>

      <div className="auth-side">
        <div className="auth-side-card">
          <h3>Secure by design</h3>
          <p className="muted">All recovery requests are monitored for unusual activity.</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
