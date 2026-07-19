import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout } from "../../store/feature/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/profile.css";
import { itemHistrySelector, setItemHistory } from "../../store/feature/itemHistorySlice";

// user profile component
const ProfileAccount = () => {
  const { userName } = useSelector(authSelector);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="display-p-drop">
      <div
        className={`profile-toggle${toggle ? " profile-toggle-open" : ""}`}
        onClick={() => setToggle(!toggle)}
      >
        <span className="profile-avatar">{userName[0]}</span>
        <p className="profile-name">{userName}</p>
        <span className="profile-caret" aria-hidden="true" />
      </div>
      {toggle && <DropDown />}
    </div>
  );
};

export const DropDown = (): JSX.Element => {
  const dispatch = useDispatch();
  const push = useNavigate();

  const { userId } = useSelector(authSelector)
  const { tempId }: any = useSelector(itemHistrySelector);

  const elements = [
    { id: 1, name: "My Account" },
    { id: 2, name: "Logout" },
  ];

  /**
   * Handles handle logout
   */
  function HandleLogout() {
    dispatch(setItemHistory({event: true, productId: tempId}))
    dispatch(logout());
    push("/auth/login");
    return;
  }

  return (
    <div className="drop-down-cont">
      {elements.map((val) => {
        if (val.name === "Logout") {
          return (
            <div key={val.id}>
              <hr className="dropdown-divider" />
              <p className="logout-p" onClick={HandleLogout}>
                {val.name}
              </p>
            </div>
          );
        } else {
            const path = val.name === "My Account" ? userId : ""
          return (
            <div key={val.id} className="dropdown-item">
              <Link className="link" to={`/profile/${path}`}>
                {val.name}
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProfileAccount;