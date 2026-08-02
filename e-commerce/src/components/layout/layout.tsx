import Navbar from "../header/navbar";
import Footer from "../footer/footer";
import "../../styles/profile.css";
import { Fragment, ReactNode, useEffect } from "react";
import { SideBar } from "../account/user.account";
import { authSelector } from "../../store/feature/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Login from "../auth/login";
import { fetchUserProfile } from "../../store/feature/authSlice";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = useSelector(authSelector);
  if (!isAuthenticated) return <Login />;
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
  const dispatch: any = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) return <Login />;
  return (
    <div className="account-display">
      <SideBar />
      <main className="profile-content-wrapper">{children}</main>
    </div>
  );
};

export default Layout;
