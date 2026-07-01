import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, loginUser } from "../store/authSlice";
import "../styles/login.css"

/**
 * Handles login
 */
const Login = () => {
  const [userData, setData] = useState({ emailAddr: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: any = useDispatch();
  const { loading, error, token } = useSelector(authSelector);
  const push = useNavigate();

  useEffect(() => {
    if (token) push("/");
  }, [token]);

  /**
   * Handles handle user data
   */
  function HandleUserData(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  }

  const canLogin = Boolean(userData.emailAddr) && Boolean(userData.password);

  /**
   * Handles handle submit
   */
  function HandleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(loginUser(userData)).unwrap();
    push("/");
  }

  return (
  <div className="page">
    <form className="card" onSubmit={HandleSubmit}>

      {/* Logo */}
      <div className="logoSection">
        <h1 className="logo">
          West<span className="logoAccent">Mart</span>
        </h1>

        <p className="welcome">Welcome back</p>
        <p className="subtitle">Sign in to your account</p>
      </div>

      {/* Error */}
      {error && (
        <div className="errorBox">
          <span className="errorIcon">!</span>
          <span>{error}</span>
        </div>
      )}

      {/* Fields */}
      <div className="fields">

        <div className="fieldGroup">
          <label className="label" htmlFor="emailAddr">
            Email address
          </label>

          <input
            id="emailAddr"
            className="input"
            type="email"
            name="emailAddr"
            placeholder="johndoe@gmail.com"
            onChange={HandleUserData}
            autoComplete="email"
          />
        </div>

        <div className="fieldGroup">

          <div className="labelRow">
            <label className="label" htmlFor="password">
              Password
            </label>

            <a href="#" className="forgotLink">
              Forgot password?
            </a>
          </div>

          <div className="passwordWrap">

            <input
              id="password"
              className="input passwordInput"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={HandleUserData}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="eyeBtn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁"}
            </button>

          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`btn ${!canLogin ? "btnDisabled" : ""}`}
        disabled={!canLogin}
      >
        {loading ? (
          <span className="loadingRow">
            <span className="spinner" />
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </button>

      {/* Divider */}
      <div className="divider">
        <span className="dividerLine" />
        <span className="dividerText">
          or continue with
        </span>
        <span className="dividerLine" />
      </div>

      {/* Google */}
      <button type="button" className="googleBtn">

        <svg
          width="18"
          height="18"
          viewBox="0 0 48 48"
          style={{ flexShrink: 0 }}
        >
          <path
            fill="#FFC107"
            d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"
          />

          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
          />

          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 9.9-1.9 13.5-5L31.8 34C29.9 35.3 27.1 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.6 39.6 16.3 44 24 44z"
          />

          <path
            fill="#1976D2"
            d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l5.7 4.9C40.6 35.1 44 30 44 24c0-1.3-.1-2.7-.4-4z"
          />
        </svg>

        Sign in with Google
      </button>

      {/* Sign up */}
      <p className="signupText">
        Don't have an account?{" "}

        <Link
          to="/auth/sign-up"
          className="signupLink"
        >
          Create account
        </Link>
      </p>

    </form>
  </div>
);
}

export default Login;