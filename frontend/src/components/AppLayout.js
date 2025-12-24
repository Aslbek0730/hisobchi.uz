import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const AppLayout = () => {
  const { user, logout } = useAuth();
  const { t, toggleLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('hisobchi_theme') || 'light');
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hisobchi_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const sectionTitle = useMemo(() => {
    const raw = location.pathname.replace('/app/', '') || 'dashboard';
    return raw
      .split('/')
      .map((chunk) => chunk[0]?.toUpperCase() + chunk.slice(1))
      .join(' / ');
  }, [location.pathname]);

  useEffect(() => {
    setCompanyMenuOpen(false);
    setNotifyOpen(false);
  }, [location.pathname]);

  const goTo = (path) => {
    setCompanyMenuOpen(false);
    setNotifyOpen(false);
    navigate(path);
  };

  return (
    <div className={`app-shell ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo-mark">H</div>
          <div className="logo-word">
            <span className="logo-main">Hisobchi</span>
            <span className="logo-sub">Payroll OS</span>
          </div>
          <button
            className="icon-btn sidebar-toggle"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? '<<' : '>>'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {(user?.role === 'company_admin' || user?.role === 'super_admin') && (
            <NavLink to="/app/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="nav-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                </svg>
              </span>
              <span>{t('nav_dashboard')}</span>
            </NavLink>
          )}
          {user?.role === 'company_admin' && (
            <>
              <NavLink to="/app/employees" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M7 11a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm11 9a6 6 0 0 0-12 0h12z" />
                  </svg>
                </span>
                <span>{t('nav_employees')}</span>
              </NavLink>
              <NavLink to="/app/salary" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M4 5h16a1 1 0 0 1 1 1v4H3V6a1 1 0 0 1 1-1zm-1 8h18v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5zm4 1v3h3v-3H7z" />
                  </svg>
                </span>
                <span>{t('nav_salary')}</span>
              </NavLink>
              <NavLink to="/app/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
                <span className="nav-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M4 4h16a1 1 0 0 1 1 1v14H3V5a1 1 0 0 1 1-1zm3 4h10v2H7V8zm0 4h10v2H7v-2z" />
                  </svg>
                </span>
                <span>{t('nav_reports')}</span>
              </NavLink>
            </>
          )}
          <NavLink to="/app/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-7 9a7 7 0 0 1 14 0H5z" />
              </svg>
            </span>
            <span>{t('nav_profile')}</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-card">
            <div className="muted">Compliance</div>
            <div className="strong">Tax rules synced</div>
            <div className="tiny muted">Updated today</div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <div className="crumb muted">{t('lbl_workspace')}</div>
            <div className="page-title">{sectionTitle}</div>
          </div>
          <div className="topbar-right">
            <button
              className="chip"
              type="button"
              onClick={() => setCompanyMenuOpen((prev) => !prev)}
            >
              <span className="chip-label">{t('lbl_company')}</span>
              <span className="chip-value">{user?.companyName || 'Hisobchi Primary'}</span>
            </button>
            {companyMenuOpen && (
              <div className="menu topbar-menu">
                <button className="menu-item" type="button" onClick={() => goTo('/app/profile')}>
                  {t('menu_company_settings')}
                </button>
                <button className="menu-item" type="button" onClick={() => goTo('/app/reports')}>
                  {t('menu_view_reports')}
                </button>
              </div>
            )}
            <button className="btn ghost small" type="button" onClick={toggleLanguage}>
              {t('btn_toggle_language')}
            </button>
            <button className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m12.95 5.95l1.4 1.4m-13.7 0l1.4-1.4m12.3-9.9l1.4-1.4m-13.7 0l1.4 1.4M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M21 14.5A9.5 9.5 0 0 1 9.5 3a7.5 7.5 0 1 0 11.5 11.5z" />
                </svg>
              )}
            </button>
            <button
              className="icon-btn"
              aria-label="Notifications"
              onClick={() => setNotifyOpen((prev) => !prev)}
            >
              <span className="dot" />
              <svg viewBox="0 0 24 24" role="img">
                <path d="M6 8a6 6 0 0 1 12 0v5l2 2H4l2-2V8zm4 11a2 2 0 0 0 4 0" />
              </svg>
            </button>
            {notifyOpen && (
             <div className="menu topbar-menu">
               <div className="menu-title">{t('menu_notifications')}</div>
               <button className="menu-item" type="button" onClick={() => goTo('/app/salary')}>
                 {t('menu_payroll_ready')}
               </button>
               <button className="menu-item" type="button" onClick={() => goTo('/app/reports')}>
                 {t('menu_report_exported')}
               </button>
             </div>
            )}
            <div className="user-chip">
              <div className="avatar">{user?.fullName?.[0] || 'H'}</div>
              <div>
                <div className="user-name">{user?.fullName}</div>
                <div className="muted">{user?.role}</div>
              </div>
            </div>
            <button className="btn ghost" onClick={logout}>
              {t('btn_sign_out')}
            </button>
          </div>
        </header>

        <div className="content page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
