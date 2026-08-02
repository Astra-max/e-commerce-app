import { useSelector } from "react-redux";
import { authSelector } from "../../store/feature/authSlice";
import { useState } from "react";
import { CreditCard, Bell, Shield, ShoppingBag, Heart } from "lucide-react";
import "../../styles/user.account.css";


export const AccountOverview = () => {
  const {
    userName,
    firstName,
    secondName,
    emailAddr,
    phone,
    idNo,
    isAuthenticated,
    loading,
  } = useSelector(authSelector);

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
        <p className="profile-view-subtitle">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="profile-overview-card">
        <div className="overview-avatar-section">
          <div className="overview-avatar">
            {firstName?.charAt(0).toUpperCase() || "?"}
          </div>
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
          <p>
            Your details are secured with 256-bit encryption and are never
            shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Orders View Component ---
// Mock data — unchanged, no bug here, not yet wired to a real endpoint.
export const OrdersView = () => {
  const mockOrders = [
    {
      id: "WM-2026-9812",
      date: "July 25, 2026",
      status: "Delivered",
      total: "Kshs 4,500.00",
      items: ["Wireless Bluetooth Headphones", "USB-C Fast Charging Cable"],
    },
    {
      id: "WM-2026-8743",
      date: "June 12, 2026",
      status: "Delivered",
      total: "Kshs 12,200.00",
      items: ["Ergonomic Mechanical Keyboard", "Gaming Mouse Pad"],
    },
  ];

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">My Orders</h2>
        <p className="profile-view-subtitle">Track and view history of your purchases</p>
      </div>

      {mockOrders.length === 0 ? (
        <div className="profile-empty-state">
          <ShoppingBag size={48} />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {mockOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-number">Order {order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <span className={`order-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-body">
                <h4>Items Summary:</h4>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="order-footer">
                <span>Total Amount:</span>
                <span className="order-total">{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Wishlist View Component ---
export const WishlistView = () => {
  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">My Wishlist</h2>
        <p className="profile-view-subtitle">Items you saved to buy later</p>
      </div>

      <div className="profile-empty-state">
        <Heart size={48} className="empty-wishlist-icon" />
        <p>Your wishlist is empty.</p>
        <button className="shop-now-btn" onClick={() => (window.location.href = "/")}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

// --- Payment Methods View Component ---
export const PaymentMethodsView = () => {
  const [cards] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/28", holder: "Maxwell K" },
  ]);

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Payment Methods</h2>
        <p className="profile-view-subtitle">
          Manage your saved credit cards and payment methods
        </p>
      </div>

      <div className="payment-cards-list">
        {cards.map((card) => (
          <div key={card.id} className="credit-card-display">
            <div className="card-top">
              <span className="card-brand">{card.type}</span>
              <CreditCard size={28} />
            </div>
            <div className="card-middle">
              <span className="card-dots">•••• •••• •••• </span>
              <span className="card-number-last">{card.last4}</span>
            </div>
            <div className="card-bottom">
              <div>
                <span className="card-info-label">Card Holder</span>
                <span className="card-info-val">{card.holder}</span>
              </div>
              <div>
                <span className="card-info-label">Expires</span>
                <span className="card-info-val">{card.expiry}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="add-card-button">
          <CreditCard size={24} />
          <span>Add New Card</span>
        </div>
      </div>
    </div>
  );
};

// --- Notifications View Component ---
export const NotificationsView = () => {
  const notifications = [
    {
      id: 1,
      title: "Welcome to WestMart!",
      message:
        "We're glad to have you here. Complete your shipping profile to enjoy fast checkout.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Your order #WM-2026-9812 has been shipped!",
      message:
        "Our delivery agent will reach out within Kisumu/Nairobi. FREE delivery applies for Nairobi.",
      time: "1 day ago",
    },
  ];

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Notifications</h2>
        <p className="profile-view-subtitle">
          Important announcements and updates regarding your orders
        </p>
      </div>

      <div className="notifications-list">
        {notifications.map((n) => (
          <div key={n.id} className="notification-card">
            <div className="notification-icon-wrapper">
              <Bell size={18} />
            </div>
            <div className="notification-info">
              <h4>{n.title}</h4>
              <p>{n.message}</p>
              <span className="notification-time">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Settings View Component ---
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

// --- Help & Support View Component ---
export const HelpSupportView = () => {
  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Standard delivery takes up to 2 weeks for Kisumu/Kakamega and next day delivery for Nairobi.",
    },
    {
      q: "Can I pay Cash on Delivery?",
      a: "Yes, cash on delivery or M-Pesa is supported at checkout.",
    },
    {
      q: "How do I return an item?",
      a: "Contact us within 7 days of purchase. Return shipping is free.",
    },
  ];

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Help & Support</h2>
        <p className="profile-view-subtitle">
          Find answers to commonly asked questions or reach out to our team
        </p>
      </div>

      <div className="faqs-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faqs-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-support-card">
        <h3>Need direct assistance?</h3>
        <p>Email our support desk and we'll reply within 24 hours.</p>
        <a href="mailto:support@westmart.com" className="support-email-btn">
          Email support@westmart.com
        </a>
      </div>
    </div>
  );
};