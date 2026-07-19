import Navbar from "./navbar";
import Footer from "./footer";
import "../styles/profile.css";
import { Fragment, ReactNode } from "react";
import { SideBar } from "./account/user.account";
import { authSelector } from "../store/authSlice";
import { useSelector } from "react-redux";
import Login from "../auth/login";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { token } = useSelector(authSelector);
  if (!token) return <Login />;
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
};

export const ProfileAccountLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { token } = useSelector(authSelector);
  if (!token) return <Login />;
  return (
    <div className="account-display">
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
