import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/feature/authSlice";
import { cartSelector } from "../../store/feature/cartSlice";
import { navItems } from "../../lib/navbar.data";
import ProfileAccount from "./user.profile";
import {
  LogIn,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const { token } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);

  const [open, setOpen] = useState(false);

  const cartItems = cart?.length ?? 0;

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
            {<item.Icon size={28} />}
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