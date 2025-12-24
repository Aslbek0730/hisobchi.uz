import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.fullName || !form.companyName || !form.email || !form.password) {
      setError('Full name, company name, email, and password are required.');
      return;
    }
    try {
      await register(form);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card wide">
        <div className="auth-header">
          <span className="eyebrow">Create your workspace</span>
          <h2>Start managing payroll with confidence</h2>
          <p className="muted">Set up your company account in minutes.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Full name</span>
          </label>
          <label className="field">
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Company name</span>
          </label>
          <label className="field">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Work email</span>
          </label>
          <label className="field">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Password</span>
          </label>
          {error && <div className="form-error">{error}</div>}
          <button className="btn primary" type="submit">
            Create account
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>

      <div className="auth-side">
        <div className="auth-side-card">
          <h3>Built for finance teams</h3>
          <p className="muted">Automate approvals, reporting, and month-end checks.</p>
        </div>
        <div className="auth-side-card">
          <div className="muted">Compliance coverage</div>
          <div className="strong">Local tax rules</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
