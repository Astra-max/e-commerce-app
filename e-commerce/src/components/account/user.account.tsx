import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/user.account.css";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logout } from "../../store/feature/authSlice";
import { LogOut } from "lucide-react";
import { sections } from "../../lib/sidebar.data";

// account side bar component
export const SideBar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { userId } = useSelector(authSelector);
  const { pathname } = useLocation();


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