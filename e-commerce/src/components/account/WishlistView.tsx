import { Heart } from "lucide-react";

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
        <button className="shop-now-btn" onClick={() => (window.location.href = "/")}>Shop Now</button>
      </div>
    </div>
  );
};
