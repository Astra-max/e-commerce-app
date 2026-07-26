import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/feature/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/profile.css";
import API from "../../services/axios";
import { itemHistrySelector, setItemHistory } from "../../store/feature/itemHistorySlice";

interface ResponseData {
  firstName: string;
  secondName: string;
  userName: string;
  userId: string;
}
// user profile component
const ProfileAccount = () => {
  const [user, setUser] = useState<ResponseData>({firstName: "", secondName: "", userName: "", userId: ""})
  const [toggle, setToggle] = useState(false);

  useEffect(()=> {
    async function getUserProfile() {
      const { data } = await API.get("/auth/profile");
      setUser((prev)=> ({...prev, firstName: data.data.first_name, userId: data.data.user_id}))
    }
    getUserProfile()
  },[])

  if (!user) return null;

  return (
    <div className="display-p-drop">
      <div
        className={`profile-toggle ${toggle ? "profile-toggle-open" : ""}`}
        onClick={() => setToggle(prev => !prev)}
      >
        <span className="profile-avatar">
          {user.firstName?.charAt(0).toUpperCase() ?? "?"}
        </span>

        <p className="profile-name">
          {user.firstName ?? "User"}
        </p>

        <span className="profile-caret" />
      </div>

      {toggle && <DropDown />}
    </div>
  );
};

export const DropDown = (): JSX.Element => {
  const dispatch = useDispatch();
  const push = useNavigate();

  const { tempId }: any = useSelector(itemHistrySelector);

  const elements = [
    { id: 1, name: "My Account" },
    { id: 2, name: "Logout" },
  ];

  // handle logout
  function HandleLogout() {
    dispatch(setItemHistory({ event: true, productId: tempId }))
    dispatch(logoutUser() as any);
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
          return (
            <div key={val.id} className="dropdown-item">
              <Link className="link" to={`/profile`}>
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