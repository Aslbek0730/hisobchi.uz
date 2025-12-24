import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    try {
      await login(form.email, form.password);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow">Welcome back</span>
          <h2>Sign in to Hisobchi</h2>
          <p className="muted">Manage payroll, staff, and compliance in one place.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
            />
            <span>Email</span>
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
            {t('btn_sign_in')}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/reset-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>

      <div className="auth-side">
        <div className="auth-side-card">
          <h3>Payroll clarity</h3>
          <p className="muted">Track salaries, taxes, and approvals from one secure view.</p>
        </div>
        <div className="auth-side-card">
          <div className="muted">Trusted by teams</div>
          <div className="strong">48+ companies</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
