import { useState, useEffect } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, loginUser } from "../store/authSlice";

const Login = () => {
  const [userData, setData] = useState({ emailAddr: "", password: "" });

  const dispatch: any = useDispatch();
  const { loading, error, token } = useSelector(authSelector);
  const push = useNavigate();


  useEffect(() => {
    if (token) {
      push("/");
    }
  }, [token]);


  function HandleUserData(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  }

  const canLogin = Boolean(userData.emailAddr) && Boolean(userData.password);

  function HandleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(loginUser(userData)).unwrap();
    push("/");
  }

  return (
    <form className="login-main" onSubmit={(event) => HandleSubmit(event)}>
      <div className="login-cont">
        <div className="l-logo-cont">
          <p className="l-logo">
            West<span style={{ color: "orange" }}>Mart</span>
          </p>
          <p className="l-welcome">Welcome to WestMart</p>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <div>
            <div className="l-top l-input-div">
              <p>Email Address</p>
              <input
                className="l-input"
                type="email"
                name="emailAddr"
                placeholder="Johndoe@gmail.com"
                onChange={(event) => HandleUserData(event)}
              />
            </div>
            <div className="l-input-div">
              <p>Password</p>
              <input
                className="l-input"
                type="password"
                name="password"
                placeholder="****************"
                onChange={(event) => HandleUserData(event)}
              />
            </div>
          </div>
          <button className="l-btn" disabled={!canLogin}>
            {loading ? "Please wait..." : "Login"}
          </button>
          <div style={{ textAlign: "center" }}>
            <p>Login with google</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>
              Didn't have account{" "}
              <Link className="l-link" to="/auth/sign-up">
                create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
