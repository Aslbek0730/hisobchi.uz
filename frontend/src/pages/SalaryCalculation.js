import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import { useLanguage } from '../context/LanguageContext';

const TAX_RATE = 0.12;

const SalaryCalculation = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: '',
    month: '',
    bonus: '',
    penalty: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [downloadMessage, setDownloadMessage] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    api.get('/employees').then((res) => setEmployees(res.data.employees || []));
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee._id === form.employeeId),
    [employees, form.employeeId]
  );

  const salaryPreview = useMemo(() => {
    const baseSalary = Number(selectedEmployee?.salary || 0);
    const bonus = Number(form.bonus || 0);
    const penalty = Number(form.penalty || 0);
    const tax = Math.round(baseSalary * TAX_RATE);
    const total = baseSalary + bonus - penalty - tax;
    return { baseSalary, bonus, penalty, tax, total };
  }, [form.bonus, form.penalty, selectedEmployee]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setDownloadMessage('');
    if (!form.employeeId || !form.month) {
      setError('Employee and month are required.');
      return;
    }
    try {
      const payload = {
        employeeId: form.employeeId,
        month: Number(form.month),
        bonus: Number(form.bonus || 0),
        penalty: Number(form.penalty || 0)
      };
      await api.post('/salary/calculate', payload);
      setMessage('Salary calculated and saved.');
      setForm({ employeeId: '', month: '', bonus: '', penalty: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed');
    }
  };

  const downloadSummary = () => {
    setError('');
    setDownloadMessage('');
    if (!selectedEmployee) {
      setError('Select an employee to download a summary.');
      return;
    }
    const rows = [
      ['Employee', selectedEmployee.fullName],
      ['Month', form.month || 'Not selected'],
      ['Base salary', salaryPreview.baseSalary],
      ['Bonus', salaryPreview.bonus],
      ['Penalty', salaryPreview.penalty],
      ['Tax', salaryPreview.tax],
      ['Net total', salaryPreview.total]
    ];
    const content = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'salary-summary.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setDownloadMessage('Summary downloaded.');
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Salary calculation</h2>
          <p className="muted">Calculate salaries with bonuses and penalties.</p>
        </div>
        <button className="btn ghost" type="button" onClick={downloadSummary}>
          {t('btn_download_salary_summary')}
        </button>
      </div>

      <div className="grid-two">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Calculation form</h3>
              <p className="muted">Use updated employee salaries.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="grid-form">
             <label className="field">
              <select name="employeeId" value={form.employeeId} onChange={handleChange}>
                <option value="">Select employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.fullName}
                  </option>
                ))}
              </select>
               <span>{t('lbl_employee')}</span>
            </label>
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
            <label className="field">
              <input
                name="bonus"
                type="number"
                value={form.bonus}
                onChange={handleChange}
                placeholder=" "
              />
               <span>{t('lbl_bonus')}</span>
            </label>
            <label className="field">
              <input
                name="penalty"
                type="number"
                value={form.penalty}
                onChange={handleChange}
                placeholder=" "
              />
               <span>{t('lbl_penalty')}</span>
            </label>
            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}
            {downloadMessage && <div className="form-success">{downloadMessage}</div>}
            <button className="btn primary" type="submit">
               {t('btn_calculate_salary')}
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Salary preview</h3>
              <p className="muted">Estimate totals before saving.</p>
            </div>
          </div>
          <div className="summary-grid">
            <div>
              <div className="muted">Base salary</div>
              <div className="strong">UZS {salaryPreview.baseSalary.toLocaleString()}</div>
            </div>
            <div>
              <div className="muted">Bonus</div>
              <div className="strong">UZS {salaryPreview.bonus.toLocaleString()}</div>
            </div>
            <div>
              <div className="muted">Penalty</div>
              <div className="strong">UZS {salaryPreview.penalty.toLocaleString()}</div>
            </div>
            <div>
              <div className="muted">Tax ({Math.round(TAX_RATE * 100)}%)</div>
              <div className="strong">UZS {salaryPreview.tax.toLocaleString()}</div>
            </div>
          </div>
          <div className="summary-total">
            <span className="muted">Net total</span>
            <span className="strong">UZS {salaryPreview.total.toLocaleString()}</span>
          </div>

          <div className="divider" />

          <div className="card-header">
            <div>
              <h4>Recent calculations</h4>
              <p className="muted">Latest salary records created.</p>
            </div>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div>
                <div className="strong">Finance team batch</div>
                <div className="muted">UZS 42.1M processed</div>
              </div>
              <span className="badge success">Paid</span>
            </div>
            <div className="activity-item">
              <div>
                <div className="strong">Sales incentives</div>
                <div className="muted">UZS 9.6M bonuses</div>
              </div>
              <span className="badge">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculation;
