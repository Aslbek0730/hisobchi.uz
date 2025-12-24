import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useLanguage } from '../context/LanguageContext';

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState({ month: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const loadSummary = async (month) => {
    setLoading(true);
    const query = month ? `?month=${month}` : '';
    const { data } = await api.get(`/salary/report${query}`);
    setSummary(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await loadSummary(form.month ? Number(form.month) : null);
    } catch (err) {
      setError(err.response?.data?.message || 'Report generation failed');
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <p className="muted">View payroll totals by month.</p>
        </div>
         <button className="btn primary" type="button" onClick={() => window.print()}>
           {t('btn_export_pdf')}
        </button>
      </div>

      <div className="grid-two">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Run report</h3>
              <p className="muted">Filter the payroll summary by month.</p>
            </div>
          </div>
           <form onSubmit={handleSubmit}>
             <label className="field">
              <input
                name="month"
                type="number"
                value={form.month}
                onChange={handleChange}
                placeholder=" "
              />
               <span>{t('lbl_month')}</span>
            </label>
            {error && <div className="form-error">{error}</div>}
            <button className="btn primary" type="submit">
               {t('btn_generate_report')}
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Summary</h3>
              <p className="muted">Payroll totals and payment status.</p>
            </div>
          </div>
          {loading && <div className="skeleton" style={{ height: '160px' }} />}
          {!loading && summary ? (
            <div className="summary-grid">
              <div>
                <div className="muted">Total payroll</div>
                <div className="strong">UZS {summary.totalPayroll.toLocaleString()}</div>
              </div>
              <div>
                <div className="muted">Records</div>
                <div className="strong">{summary.recordCount}</div>
              </div>
              <div>
                <div className="muted">Paid</div>
                <div className="strong">{summary.paidCount}</div>
              </div>
            </div>
          ) : null}
          {!loading && !summary && <div className="muted">No report data yet.</div>}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3>Payroll trend</h3>
            <p className="muted">Visual overview of the current period.</p>
          </div>
          <span className="badge">Auto-refresh</span>
        </div>
        <div className="chart-placeholder">Chart will render here</div>
      </div>
    </div>
  );
};

export default Reports;
