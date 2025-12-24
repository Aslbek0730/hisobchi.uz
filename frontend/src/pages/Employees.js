import React, { useEffect, useMemo, useRef, useState } from 'react';
import api from '../api/axios';
import { useLanguage } from '../context/LanguageContext';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { t } = useLanguage();
  const [form, setForm] = useState({
    fullName: '',
    position: '',
    salary: '',
    workType: 'monthly'
  });
  const [error, setError] = useState('');
  const formCardRef = useRef(null);
  const nameInputRef = useRef(null);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/employees');
      setEmployees(data.employees || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setActionMessage('');
    if (!form.fullName || !form.position || !form.salary || !form.workType) {
      setError('All fields are required.');
      return;
    }
    try {
      await api.post('/employees', {
        ...form,
        salary: Number(form.salary)
      });
      setForm({ fullName: '', position: '', salary: '', workType: 'monthly' });
      loadEmployees();
      setActionMessage('Employee added successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add employee');
    }
  };

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return employees;
    }
    return employees.filter((employee) =>
      [employee.fullName, employee.position].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [employees, search]);

  const totalPayroll = employees.reduce((sum, employee) => sum + (employee.salary || 0), 0);

  const focusForm = () => {
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nameInputRef.current?.focus();
  };

  const handleCopyId = async (employee) => {
    try {
      await navigator.clipboard.writeText(employee._id);
      setActionMessage('Employee ID copied to clipboard.');
    } catch (err) {
      setActionMessage('Unable to copy employee ID.');
    }
    setOpenMenuId(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Employees</h2>
           <p className="muted">Add, manage, and track your workforce.</p>
        </div>
        <div className="header-actions">
          <label className="field compact">
            <input
              name="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder=" "
            />
             <span>{t('lbl_search_employees')}</span>
          </label>
           <button className="btn primary" type="button" onClick={focusForm}>
             {t('btn_add_employee')}
           </button>
        </div>
      </div>
      {actionMessage && <div className="form-success">{actionMessage}</div>}

      <div className="grid-cards">
        <div className="card kpi-card">
          <div className="kpi-label">Total employees</div>
          <div className="kpi-value">{employees.length}</div>
          <div className="kpi-delta">Active team members</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-label">Monthly payroll</div>
          <div className="kpi-value">UZS {totalPayroll.toLocaleString()}</div>
          <div className="kpi-delta">Based on salaries</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-label">Work types</div>
          <div className="kpi-value">Monthly + Hourly</div>
          <div className="kpi-delta">Policy coverage</div>
        </div>
      </div>

      <div className="grid-two">
        <div className="card" ref={formCardRef}>
          <div className="card-header">
            <div>
              <h3>Add employee</h3>
              <p className="muted">Keep records accurate and up to date.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
             <label className="field">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder=" "
                ref={nameInputRef}
              />
               <span>{t('lbl_full_name')}</span>
            </label>
            <label className="field">
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder=" "
              />
               <span>{t('lbl_position')}</span>
            </label>
            <label className="field">
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                type="number"
                placeholder=" "
              />
               <span>{t('lbl_salary')}</span>
            </label>
            <label className="field">
              <select name="workType" value={form.workType} onChange={handleChange}>
                <option value="monthly">Monthly</option>
                <option value="hourly">Hourly</option>
              </select>
               <span>{t('lbl_work_type')}</span>
            </label>
            {error && <div className="form-error">{error}</div>}
            <button className="btn primary" type="submit">
              Save employee
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Current employees</h3>
              <p className="muted">Review salary and role details.</p>
            </div>
          </div>
          <div className="table table-employee">
            <div className="table-head">
              <span>Name</span>
              <span>Position</span>
              <span>Salary</span>
              <span>Type</span>
              <span>Actions</span>
            </div>
            {loading && (
              <div className="table-row">
                <span className="skeleton" />
                <span className="skeleton" />
                <span className="skeleton" />
                <span className="skeleton" />
                <span className="skeleton" />
              </div>
            )}
            {!loading &&
              filteredEmployees.map((employee) => (
                <div key={employee._id} className="table-row">
                  <span className="strong">{employee.fullName}</span>
                  <span>{employee.position}</span>
                  <span>UZS {Number(employee.salary).toLocaleString()}</span>
                  <span>
                    <span className="badge">
                      {employee.workType === 'monthly' ? 'Monthly' : 'Hourly'}
                    </span>
                  </span>
                  <span className="action-cell">
                    <button
                      className="icon-btn"
                      aria-label="Employee actions"
                      type="button"
                      onClick={() =>
                        setOpenMenuId((prev) => (prev === employee._id ? null : employee._id))
                      }
                    >
                      ...
                    </button>
                    {openMenuId === employee._id && (
                      <div className="menu action-menu">
                        <button
                          className="menu-item"
                          type="button"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setOpenMenuId(null);
                          }}
                        >
                          View details
                        </button>
                        <button
                          className="menu-item"
                          type="button"
                          onClick={() => handleCopyId(employee)}
                        >
                          Copy ID
                        </button>
                      </div>
                    )}
                  </span>
                </div>
              ))}
            {!loading && !filteredEmployees.length && (
              <div className="empty-state">No employees yet.</div>
            )}
          </div>
          {selectedEmployee && (
            <div className="divider" />
          )}
          {selectedEmployee && (
            <div className="summary-grid">
              <div>
                <div className="muted">Selected employee</div>
                <div className="strong">{selectedEmployee.fullName}</div>
              </div>
              <div>
                <div className="muted">Position</div>
                <div className="strong">{selectedEmployee.position}</div>
              </div>
              <div>
                <div className="muted">Salary</div>
                <div className="strong">
                  UZS {Number(selectedEmployee.salary).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="muted">Work type</div>
                <div className="strong">
                  {selectedEmployee.workType === 'monthly' ? 'Monthly' : 'Hourly'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
