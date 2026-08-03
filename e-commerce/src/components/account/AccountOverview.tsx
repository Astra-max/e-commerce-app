import { useSelector } from "react-redux";
import { authSelector } from "../../store/feature/authSlice";
import { Shield } from "lucide-react";
import "../../styles/user.account.css";

export const AccountOverview = () => {
  const { user, isAuthenticated, loading } = useSelector(authSelector);
  const { userName, firstName, secondName, emailAddr, phone, idNo } = user ?? {};

  if (loading) {
    return <div className="profile-view-loading">Loading account overview...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="profile-view-error">
        Unable to load profile data. Please try logging in again.
      </div>
    );
  }

  const fullName = `${firstName || ""} ${secondName || ""}`.trim() || "User Account";

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Account Overview</h2>
        <p className="profile-view-subtitle">Manage your personal information and account settings</p>
      </div>

      <div className="profile-overview-card">
        <div className="overview-avatar-section">
          <div className="overview-avatar">{firstName?.charAt(0).toUpperCase() || "?"}</div>
          <div className="overview-user-details">
            <h3>{fullName}</h3>
            <p>@{userName || "username"}</p>
            <span className="user-badge">Verified Customer</span>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="details-item">
            <span className="details-label">First Name</span>
            <span className="details-value">{firstName || "N/A"}</span>
          </div>
          <div className="details-item">
            <span className="details-label">Second Name</span>
            <span className="details-value">{secondName || "N/A"}</span>
          </div>
          <div className="details-item">
            <span className="details-label">Username</span>
            <span className="details-value">{userName || "N/A"}</span>
          </div>
          <div className="details-item">
            <span className="details-label">Email Address</span>
            <span className="details-value">{emailAddr || "N/A"}</span>
          </div>
          <div className="details-item">
            <span className="details-label">Phone Number</span>
            <span className="details-value">{phone || "N/A"}</span>
          </div>
          <div className="details-item">
            <span className="details-label">National ID / Passport</span>
            <span className="details-value">{idNo || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="security-info-box">
        <Shield size={20} className="security-icon" />
        <div>
          <h4>Security & Privacy</h4>
          <p>Your details are secured with 256-bit encryption and are never shared with third parties.</p>
        </div>
      </div>
    </div>
  );
};
