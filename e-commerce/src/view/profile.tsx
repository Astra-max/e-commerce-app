import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { useSelector } from "react-redux";
import { authSelector } from "../store/authSlice";
import {
  User,
  ShoppingCart,
  Truck,
  Megaphone,
  Compass,
  LogOut,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  account: User,
  cart: ShoppingCart,
  shipment: Truck,
  marketing: Megaphone,
  track: Compass,
};

/**
 * Handles side bar
 */
export const SideBar = () => {
  const nav = useNavigate();
  const { userId } = useSelector(authSelector);
  const { pathname } = useLocation();
  const sideElem = [
    { id: 1, name: "account" },
    { id: 2, name: "cart" },
    { id: 3, name: "shipment" },
    { id: 4, name: "marketing" },
    { id: 5, name: "track" },
    { id: 6, name: "account" },
    { id: 7, name: "account" },
    { id: 8, name: "account" },
    { id: 9, name: "Logout" },
  ];

  /**
   * Handles handle logout
   */
  function HandleLogout() {
    nav(`/auth/login`);
  }

  return (
    <div className="side-bar-main">
      <Link to={`/`} className="side-bar-home-link">
        Home
      </Link>
      <div className="side-bar-cont">
        <p className="side-bar-title">My Account</p>
        <div className="side-bar-list">
          {sideElem.map((val: { id: number; name: string }) => {
            const activePath =
              pathname === `${`/profile/${userId}/`}${val.name}`
                ? "active-path"
                : "";

            if (val.name === "Logout") {
              return (
                <p key={val.id} className="p-logout" onClick={HandleLogout}>
                  <LogOut size={18} strokeWidth={2} />
                  <span>{val.name}</span>
                </p>
              );
            }

            const Icon = ICONS[val.name] ?? User;

            return (
              <div key={val.id} className="side-bar-item">
                <Link
                  className={`${activePath || "p-links"} side-bar-link-row`}
                  to={`/profile/${userId}/${val.name}`}
                >
                  <Icon size={18} strokeWidth={2} className="p-links-icon" />
                  <span>{val.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Handles profile account
 */
const ProfileAccount = () => {
  return (
    <div className="profile-account-layout">
      <SideBar />
    </div>
  );
};

export default ProfileAccount;