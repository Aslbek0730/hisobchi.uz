import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: '', email: '' });
  const [profileMessage, setProfileMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [securityMessage, setSecurityMessage] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    setProfileForm({
      fullName: user?.fullName || '',
      email: user?.email || ''
    });
  }, [user]);

  const handleProfileChange = (event) => {
    setProfileForm({ ...profileForm, [event.target.name]: event.target.value });
  };

  const saveProfile = () => {
    setProfileMessage('Profile details saved locally.');
    setIsEditing(false);
  };

  const handlePasswordChange = (event) => {
    setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value });
  };

  const submitPassword = (event) => {
    event.preventDefault();
    setSecurityMessage('');
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setSecurityMessage('All password fields are required.');
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setSecurityMessage('Passwords do not match.');
      return;
    }
    setSecurityMessage('Password updated locally.');
    setPasswordForm({ current: '', next: '', confirm: '' });
    setShowPasswordForm(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Profile & settings</h2>
          <p className="muted">Manage your account preferences and security.</p>
        </div>
        <button className="btn ghost" type="button" onClick={() => setIsEditing((v) => !v)}>
          {isEditing ? 'Cancel' : 'Edit profile'}
        </button>
      </div>

      <div className="grid-two">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Profile details</h3>
              <p className="muted">Your account information.</p>
            </div>
          </div>
          {profileMessage && <div className="form-success">{profileMessage}</div>}
          {isEditing ? (
            <div className="profile-grid">
              <label className="field">
                <input
                  name="fullName"
                  value={profileForm.fullName}
                  onChange={handleProfileChange}
                  placeholder=" "
                />
                <span>Full name</span>
              </label>
              <label className="field">
                <input
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  placeholder=" "
                />
                <span>Email</span>
              </label>
              <div>
                <div className="muted">Role</div>
                <div className="strong">{user?.role}</div>
              </div>
              <div>
                <div className="muted">Workspace</div>
                <div className="strong">{user?.companyName || 'Hisobchi Primary'}</div>
              </div>
              <button className="btn primary" type="button" onClick={saveProfile}>
                Save changes
              </button>
            </div>
          ) : (
            <div className="profile-grid">
              <div>
                <div className="muted">Name</div>
                <div className="strong">{profileForm.fullName}</div>
              </div>
              <div>
                <div className="muted">Email</div>
                <div className="strong">{profileForm.email}</div>
              </div>
              <div>
                <div className="muted">Role</div>
                <div className="strong">{user?.role}</div>
              </div>
              <div>
                <div className="muted">Workspace</div>
                <div className="strong">{user?.companyName || 'Hisobchi Primary'}</div>
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Security</h3>
              <p className="muted">Protect your account.</p>
            </div>
          </div>
          {securityMessage && <div className="form-success">{securityMessage}</div>}
          <div className="security-list">
            <div className="security-item">
              <div>
                <div className="strong">Password</div>
                <div className="muted">Last updated 30 days ago</div>
              </div>
              <button
                className="btn secondary"
                type="button"
                onClick={() => setShowPasswordForm((v) => !v)}
              >
                {showPasswordForm ? 'Close' : 'Change'}
              </button>
            </div>
            {showPasswordForm && (
              <form onSubmit={submitPassword}>
                <label className="field">
                  <input
                    name="current"
                    type="password"
                    value={passwordForm.current}
                    onChange={handlePasswordChange}
                    placeholder=" "
                  />
                  <span>Current password</span>
                </label>
                <label className="field">
                  <input
                    name="next"
                    type="password"
                    value={passwordForm.next}
                    onChange={handlePasswordChange}
                    placeholder=" "
                  />
                  <span>New password</span>
                </label>
                <label className="field">
                  <input
                    name="confirm"
                    type="password"
                    value={passwordForm.confirm}
                    onChange={handlePasswordChange}
                    placeholder=" "
                  />
                  <span>Confirm password</span>
                </label>
                <button className="btn primary" type="submit">
                  Update password
                </button>
              </form>
            )}
            <div className="security-item">
              <div>
                <div className="strong">Two-factor authentication</div>
                <div className="muted">
                  {twoFactorEnabled ? 'Enabled for this account' : 'Add extra protection to your account'}
                </div>
              </div>
              <button
                className="btn ghost"
                type="button"
                onClick={() => setTwoFactorEnabled((prev) => !prev)}
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
