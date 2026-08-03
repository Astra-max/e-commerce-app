import { ShoppingBag } from "lucide-react";

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
                <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
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
