import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'hisobchi_lang';

const translations = {
  en: {
    nav_dashboard: 'Dashboard',
    nav_employees: 'Employees',
    nav_salary: 'Salary',
    nav_reports: 'Reports',
    nav_profile: 'Profile',
    btn_sign_out: 'Sign out',
    btn_export_report: 'Export report',
    btn_run_payroll: 'Run payroll',
    btn_add_employee: 'Add employee',
    btn_create_salary_batch: 'Create salary batch',
    btn_review_approvals: 'Review approvals',
    btn_generate_report: 'Generate report',
    btn_calculate_salary: 'Calculate salary',
    btn_download_summary: 'Download summary',
    btn_export_pdf: 'Export PDF',
    btn_download_salary_summary: 'Download summary',
    btn_sign_in: 'Sign in',
    btn_toggle_language: 'ENG/UZ',
    menu_company_settings: 'Company settings',
    menu_view_reports: 'View reports',
    menu_notifications: 'Notifications',
    menu_payroll_ready: 'Payroll ready to run',
    menu_report_exported: 'Report exported',
    lbl_company: 'Company',
    lbl_workspace: 'Workspace',
    lbl_search_employees: 'Search employees',
    lbl_full_name: 'Full name',
    lbl_position: 'Position',
    lbl_salary: 'Salary (UZS)',
    lbl_work_type: 'Work type',
    lbl_month: 'Month (optional)',
    lbl_employee: 'Employee',
    lbl_bonus: 'Bonuses',
    lbl_penalty: 'Penalties',
    lbl_notifications: 'Notifications'
  },
  uz: {
    nav_dashboard: 'Boshqaruv',
    nav_employees: 'Xodimlar',
    nav_salary: 'Ish haqi',
    nav_reports: 'Hisobotlar',
    nav_profile: 'Profil',
    btn_sign_out: 'Chiqish',
    btn_export_report: 'Hisobotni yuklab olish',
    btn_run_payroll: 'Ish haqini hisoblash',
    btn_add_employee: 'Xodim qo‘shish',
    btn_create_salary_batch: 'Ish haqi to‘plami',
    btn_review_approvals: 'Tasdiqlarni ko‘rish',
    btn_generate_report: 'Hisobot yaratish',
    btn_calculate_salary: 'Hisoblash',
    btn_download_summary: 'Yuklab olish',
    btn_export_pdf: 'PDF chiqarish',
    btn_download_salary_summary: 'Yakunini yuklab olish',
    btn_sign_in: 'Kirish',
    btn_toggle_language: 'ENG/UZ',
    menu_company_settings: 'Kompaniya sozlamalari',
    menu_view_reports: 'Hisobotlarni ko‘rish',
    menu_notifications: 'Bildirishnomalar',
    menu_payroll_ready: 'Ish haqi tayyor',
    menu_report_exported: 'Hisobot yuklab olindi',
    lbl_company: 'Kompaniya',
    lbl_workspace: 'Ish maydoni',
    lbl_search_employees: 'Xodimlarni qidirish',
    lbl_full_name: 'To‘liq ism',
    lbl_position: 'Lavozim',
    lbl_salary: 'Maosh (so‘m)',
    lbl_work_type: 'Ish turi',
    lbl_month: 'Oy (ixtiyoriy)',
    lbl_employee: 'Xodim',
    lbl_bonus: 'Bonuslar',
    lbl_penalty: 'Jarimalar',
    lbl_notifications: 'Bildirishnomalar'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem(STORAGE_KEY) || 'en');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = React.useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'uz' : 'en'));
  }, []);

  const t = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (key) => dict[key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, toggleLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
