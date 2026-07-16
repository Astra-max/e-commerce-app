import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../store/authSlice";
import { cartSelector } from "../store/cartSlice";
import ProfileAccount from "./profile-account";
import {
  ShoppingCart,
  BadgePercent,
  Sparkles,
  LogIn,
  Home,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const { token, userId } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);

  const [open, setOpen] = useState(false);

  const cartItems = cart?.length ?? 0;

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={18} />,
    },
    {
      name: "Deals",
      path: "/Deals",
      icon: <BadgePercent size={18} />,
    },
    {
      name: "4You",
      path: "/4You",
      icon: <Sparkles size={18} />,
    },
    {
      name: "Cart",
      path: `/cart/${userId}`,
      icon: <ShoppingCart size={18} />,
    },
  ];

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        west<span>mart</span>
      </Link>

      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={
              pathname === item.path ? "active nav-link" : "nav-link"
            }
          >
            {item.icon}
            <span>{item.name}</span>

            {item.name === "Cart" && (
              <span className="badge">{cartItems}</span>
            )}
          </Link>
        ))}

        {token ? (
          <ProfileAccount />
        ) : (
          <Link
            to="/auth/login"
            className="nav-link"
          >
            <LogIn size={18} />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;