export const SettingsView = () => {
  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Settings</h2>
        <p className="profile-view-subtitle">Manage passwords and email subscriptions</p>
      </div>

      <div className="settings-box">
        <div className="settings-section">
          <h3>Change Password</h3>
          <div className="settings-form">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <button className="save-settings-btn">Update Password</button>
          </div>
        </div>

        <hr className="settings-divider" />

        <div className="settings-section">
          <h3>Email Preferences</h3>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked /> Receive email updates for orders
          </label>
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked /> Receive marketing newsletters and deal
            flyers
          </label>
        </div>
      </div>
    </div>
  );
};
