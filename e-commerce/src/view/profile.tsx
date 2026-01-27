import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { useSelector } from "react-redux";
import { authSelector } from "../store/authSlice";

export const SideBar = () => {
  const nav = useNavigate();
  const { userId } = useSelector(authSelector)
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
  
  function HandleLogout() {
    nav(`/auth/login`)
  }
  return (
    <div className="side-bar-main">
      <Link to={`/`}>Home</Link>
      <div className="side-bar-cont">
        {sideElem.map((val: { id: number; name: string }) => {
          const activePath =
            pathname === `${`/profile/${userId}/`}${val.name}`
              ? "active-path"
              : "";
          if (val.name === "Logout") {
            return (
              <p key={val.id} className="p-logout" onClick={HandleLogout}>
                {val.name}
              </p>
            );
          }
          return (
            <div key={val.id}>
              <Link
               key={val.id}
                className={activePath || "p-links"}
                to={`/profile/${userId}/${val.name}`}
              >
                {val.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProfileAccount = () => {
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default ProfileAccount;
