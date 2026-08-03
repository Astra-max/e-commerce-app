import { useState } from "react";
import { CreditCard } from "lucide-react";

export const PaymentMethodsView = () => {
  const [cards] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "12/28", holder: "Maxwell K" },
  ]);

  return (
    <div className="profile-view-content">
      <div className="profile-view-header">
        <h2 className="profile-view-title">Payment Methods</h2>
        <p className="profile-view-subtitle">Manage your saved credit cards and payment methods</p>
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
