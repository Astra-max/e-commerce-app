import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/user.account.css";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logout } from "../../store/authSlice";
import {
  User,
  Package,
  Heart,
  ShoppingCart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  slug: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

// account side bar component
export const SideBar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { userId } = useSelector(authSelector);
  const { pathname } = useLocation();

  const cartCount: number | undefined = undefined;
  const notificationCount: number | undefined = undefined;

  const sections: NavSection[] = [
    {
      title: "Shopping",
      items: [
        { slug: "orders", label: "My Orders", icon: Package },
        { slug: "wishlist", label: "Wishlist", icon: Heart },
        { slug: "cart", label: "Cart", icon: ShoppingCart, badge: cartCount },
      ],
    },
    {
      title: "Account",
      items: [
        { slug: "account", label: "Account Overview", icon: User },
        { slug: "addresses", label: "Addresses", icon: MapPin },
        { slug: "payment-methods", label: "Payment Methods", icon: CreditCard },
        {
          slug: "notifications",
          label: "Notifications",
          icon: Bell,
          badge: notificationCount,
        },
        { slug: "settings", label: "Settings", icon: Settings },
      ],
    },
    {
      title: "Support",
      items: [{ slug: "help", label: "Help & Support", icon: HelpCircle }],
    },
  ];

  function HandleLogout() {
    dispatch(logout());
    nav("/auth/login");
    return;
  }

  return (
    <div className="side-bar-main">
      <div className="side-bar-cont">
        <Link className="side-bar-title" to={"/"}>WestMart</Link>
        <div className="side-bar-nav">
          {sections.map((section) => (
            <div key={section.title} className="side-bar-section">
              <p className="side-bar-section-label">{section.title}</p>
              <div className="side-bar-list">
                {section.items.map((item) => {
                  const isActive =
                    pathname === `/profile/${userId}/${item.slug}`;
                  const Icon = item.icon;

                  return (
                    <div key={item.slug} className="side-bar-item">
                      <Link
                        className={`side-bar-link-row${
                          isActive ? " active-path" : ""
                        }`}
                        to={`/profile/${userId}/${item.slug}`}
                      >
                        <Icon
                          size={18}
                          strokeWidth={2}
                          className="p-links-icon"
                        />
                        <span>{item.label}</span>
                        {typeof item.badge === "number" && item.badge > 0 && (
                          <span className="side-bar-badge">{item.badge}</span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="p-logout" onClick={HandleLogout}>
          <LogOut size={18} strokeWidth={2} />
          <span>Logout</span>
        </p>
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