import { Bell } from "lucide-react";

export const NotificationsView = () => {
  const notifications = [
    {
      id: 1,
      title: "Welcome to WestMart!",
      message: "We're glad to have you here. Complete your shipping profile to enjoy fast checkout.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Your order #WM-2026-9812 has been shipped!",
      message: "Our delivery agent will reach out within Kisumu/Nairobi. FREE delivery applies for Nairobi.",
      time: "1 day ago",
    },
  ];

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Notifications</h2>
        <p className="profile-view-subtitle">Important announcements and updates regarding your orders</p>
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
