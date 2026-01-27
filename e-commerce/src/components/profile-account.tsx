import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/profile.css";
import { itemHistrySelector, setItemHistory } from "../store/itemHistorySlice";

const ProfileAccount = () => {
  const { userName } = useSelector(authSelector);

  const styleProfile = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.4rem 0.7rem",
    borderRadius: "50%",
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
  };

  const majorCont = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    gap: "0.5rem",
    cursor: "pointer",
  };

  const [toggle, setToggle] = useState(false);
  return (
    <div className="display-p-drop">
      <div style={majorCont} onClick={() => setToggle(!toggle)}>
        <div>
          <span style={styleProfile}>{userName[0]}</span>
        </div>
        <div>
          <p style={{ fontSize: "0.9rem", fontWeight: "bold", opacity: "0.9" }}>
            {userName}
          </p>
        </div>
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
          return <p key={val.id} className="logout-p" onClick={HandleLogout}>{val.name}</p>;
        } else {
            const path = val.name === "My Account" ? userId : ""
          return (
            <div key={val.id}>
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
