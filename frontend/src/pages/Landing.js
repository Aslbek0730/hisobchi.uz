import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-hero">
        <div className="hero-copy">
          <span className="eyebrow">Payroll automation for Uzbekistan</span>
          <h1>Trustworthy payroll, tax, and reporting in one premium workspace.</h1>
          <p>
            Hisobchi.uz helps business owners and accountants manage salaries, compliance, and
            performance without spreadsheets or stress.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/register">
              Start free trial
            </Link>
            <Link className="btn secondary" to="/login">
              Sign in
            </Link>
          </div>
          <div className="hero-trust">
            <div>
              <div className="trust-value">99.8%</div>
              <div className="muted">Payroll accuracy</div>
            </div>
            <div>
              <div className="trust-value">65%</div>
              <div className="muted">Faster processing</div>
            </div>
            <div>
              <div className="trust-value">A+</div>
              <div className="muted">Compliance score</div>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <div className="muted">Monthly payroll</div>
                <div className="hero-card-value">UZS 268,400,000</div>
              </div>
              <span className="badge success">On track</span>
            </div>
            <div className="hero-chart">
              <div className="hero-bar" style={{ height: '40%' }} />
              <div className="hero-bar" style={{ height: '60%' }} />
              <div className="hero-bar" style={{ height: '48%' }} />
              <div className="hero-bar" style={{ height: '72%' }} />
              <div className="hero-bar" style={{ height: '64%' }} />
              <div className="hero-bar" style={{ height: '80%' }} />
            </div>
            <div className="hero-card-footer">
              <div>
                <div className="muted">Employees</div>
                <div className="strong">48 active</div>
              </div>
              <div>
                <div className="muted">Tax reserve</div>
                <div className="strong">UZS 32.2M</div>
              </div>
            </div>
          </div>

          <div className="hero-side">
            <div className="hero-side-card">
              <div className="muted">Next payroll</div>
              <div className="strong">Jul 28, 2025</div>
              <div className="tiny muted">3 departments pending</div>
            </div>
            <div className="hero-side-card">
              <div className="muted">Automations</div>
              <div className="strong">Bonuses + penalties</div>
              <div className="tiny muted">Configured by policy</div>
            </div>
          </div>
        </div>
      </header>

      <section className="landing-section">
        <div className="section-head">
          <h2>Everything you need to run payroll</h2>
          <p className="muted">Modern tooling for finance teams and founders.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Company control</h3>
            <p>Manage entities, subscription plans, and role access in seconds.</p>
          </div>
          <div className="feature-card">
            <h3>Employee management</h3>
            <p>Onboard staff, track positions, and keep salary data updated.</p>
          </div>
          <div className="feature-card">
            <h3>Automated calculations</h3>
            <p>Apply bonuses, penalties, and tax rates with clean audit logs.</p>
          </div>
          <div className="feature-card">
            <h3>Actionable reports</h3>
            <p>Generate monthly, quarterly, and yearly payroll insights instantly.</p>
          </div>
        </div>
      </section>

      <section className="landing-section split">
        <div className="split-copy">
          <h2>Finance-grade clarity with real-time data.</h2>
          <p className="muted">
            Visualize payroll trends, monitor compliance, and keep teams aligned with
            clean dashboards that update as you work.
          </p>
          <Link className="btn ghost" to="/register">
            See it in action
          </Link>
        </div>
        <div className="split-panel">
          <div className="stat-stack">
            <div className="stat-card">
              <div className="muted">Payroll paid</div>
              <div className="strong">UZS 214.5M</div>
              <span className="badge success">+12.4%</span>
            </div>
            <div className="stat-card">
              <div className="muted">Tax liabilities</div>
              <div className="strong">UZS 29.1M</div>
              <span className="badge warn">Due in 6 days</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section callout">
        <h2>Ready to run payroll with confidence?</h2>
        <p>Start in minutes and scale with your business.</p>
        <div className="hero-actions">
          <Link className="btn primary" to="/register">
            Create your account
          </Link>
          <a className="btn ghost" href="mailto:sales@hisobchi.uz?subject=Demo%20request">
            Book a demo
          </a>
        </div>
      </section>
    </div>
  );
};

export default Landing;
