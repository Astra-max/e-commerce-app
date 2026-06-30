import { Link, useLocation } from "react-router-dom";
import "../index.css";
import { useSelector } from "react-redux";
import { cartSelector } from "../store/cartSlice";
import ProfileAccount from "./profile-account";
import { authSelector } from "../store/authSlice";

const Navbar = () => {
  const { cart } = useSelector(cartSelector);
  const { token, userId } = useSelector(authSelector);
  const navElemenst = [
    "All",
    "today's deals",
    "4you",
    `cart/${userId}`,
    "auth/login",
  ];
  const { pathname } = useLocation();

  const cartItems: undefined | number =
    cart?.length === undefined ? 0 : cart.length;

  return (
    <div className="nav-cont">
      <div>
        <Link to={"/"} className="link logo">
          west<span className="logo-color">mart</span>
        </Link>
      </div>
      <div className="nav-elem">
        {navElemenst.map((element, id) => {
          if (element === `today's deals`) {
            const path = pathname.replace("%20", " ");
            return (
              <Link
                key={id}
                to={`/${element}`}
                className={`${
                  path === `/${element}` ? `active` : `not-active`
                }`}
              >
                {element}
              </Link>
            );
          }
          if (element === `cart/${userId}`) {
            const path = "cart";
            return (
              <Link
                key={id}
                to={`/${element}`}
                className={`${
                  pathname === `/${element}` ? `active` : `not-active`
                }`}
              >{`${path} [${cartItems}]`}</Link>
            );
          }
          if (element === "auth/login" && token) {
            return <ProfileAccount key={id} />;
          }
          if (element === "auth/login" && !token) {
            const navPath = element.replace("auth/login", "login");
            return (
              <Link
                key={id}
                className={`${
                  pathname === `/${element}` ? `active` : `not-active`
                }`}
                to={`/${element}`}
              >
                {navPath}
              </Link>
            );
          }
          return (
            <Link
              key={id}
              className={`${
                pathname === `/${element}` ? `active` : `not-active`
              }`}
              to={`/${element}`}
            >
              {element}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Navbar;
