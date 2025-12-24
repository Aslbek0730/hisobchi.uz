import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const kpis = [
  { label: 'Total payroll', value: 'UZS 268.4M', delta: '+8.2% vs last month' },
  { label: 'Employees', value: '48', delta: '4 new hires' },
  { label: 'Taxes reserved', value: 'UZS 32.2M', delta: 'On schedule' },
  { label: 'Bonuses applied', value: 'UZS 9.6M', delta: '14 approvals' }
];

const trend = [32, 46, 38, 52, 49, 62, 58, 68, 64, 72, 70, 80];
const distribution = [
  { label: 'Operations', value: 42 },
  { label: 'Sales', value: 28 },
  { label: 'Finance', value: 18 },
  { label: 'Support', value: 12 }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const downloadCsv = (filename, rows) => {
    const content = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const rows = [
      ['Metric', 'Value', 'Notes'],
      ...kpis.map((kpi) => [kpi.label, kpi.value, kpi.delta]),
      ['Trend (last 12 months)', trend.join(' | '), 'Index-based']
    ];
    downloadCsv('hisobchi-dashboard-report.csv', rows);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Payroll dashboard</h2>
          <p className="muted">Track payroll performance and compliance signals.</p>
        </div>
        <div className="header-actions">
          <button className="btn ghost" onClick={handleExport}>
            {t('btn_export_report')}
          </button>
          <button className="btn primary" onClick={() => navigate('/app/salary')}>
            {t('btn_run_payroll')}
          </button>
        </div>
      </div>

      <div className="grid-cards">
        {kpis.map((stat) => (
          <div key={stat.label} className="card kpi-card">
            <div className="kpi-label">{stat.label}</div>
            <div className="kpi-value">{stat.value}</div>
            <div className="kpi-delta">{stat.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid-two">
        <div className="card chart-card">
          <div className="card-header">
            <div>
              <h3>Monthly payroll trend</h3>
              <p className="muted">Last 12 months</p>
            </div>
            <span className="badge success">+12.4%</span>
          </div>
          <div className="chart-bars">
            {trend.map((value, index) => (
              <div key={String(index)} className="chart-bar">
                <div className="chart-fill" style={{ height: `${value}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-header">
            <div>
              <h3>Salary distribution</h3>
              <p className="muted">Departmental share</p>
            </div>
          </div>
          <div className="distribution">
            {distribution.map((item) => (
              <div key={item.label} className="distribution-row">
                <div>
                  <div className="strong">{item.label}</div>
                  <div className="muted">{item.value}% of payroll</div>
                </div>
                <div className="distribution-bar">
                  <span style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-two">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Quick actions</h3>
              <p className="muted">Move faster on payroll tasks.</p>
            </div>
          </div>
          <div className="quick-actions">
            <button className="btn primary" onClick={() => navigate('/app/employees')}>
              {t('btn_add_employee')}
            </button>
            <button className="btn secondary" onClick={() => navigate('/app/salary')}>
              {t('btn_create_salary_batch')}
            </button>
            <button className="btn ghost" onClick={() => navigate('/app/reports')}>
              {t('btn_review_approvals')}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Recent activity</h3>
              <p className="muted">Latest changes in payroll.</p>
            </div>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div>
                <div className="strong">July payroll initialized</div>
                <div className="muted">10 minutes ago</div>
              </div>
              <span className="badge success">Success</span>
            </div>
            <div className="activity-item">
              <div>
                <div className="strong">5 bonuses approved</div>
                <div className="muted">1 hour ago</div>
              </div>
              <span className="badge">Review</span>
            </div>
            <div className="activity-item">
              <div>
                <div className="strong">Tax reserve updated</div>
                <div className="muted">Today</div>
              </div>
              <span className="badge">Info</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
