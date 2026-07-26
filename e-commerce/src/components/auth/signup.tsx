import "../../styles/sign-up.css";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signUPUser } from "../../store/feature/authSlice";

type FormData = {
  userName: string;
  firstName: string;
  secondName: string;
  emailAddr: string;
  phone: string;
  idNo: string;
  gender: string;
  age: number;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialData: FormData = {
  userName: "",
  firstName: "",
  secondName: "",
  emailAddr: "",
  phone: "",
  idNo: "",
  gender: "",
  age: 0,
  password: "",
  confirmPassword: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.userName.trim()) errors.userName = "Username is required";
  else if (data.userName.trim().length < 3)
    errors.userName = "Username should be at least 3 characters";

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  else if (data.firstName.trim().length < 2)
    errors.firstName = "First name should be at least 2 characters";

  if (!data.secondName.trim()) errors.secondName = "Second name is required";
  else if (data.secondName.trim().length < 2)
    errors.secondName = "Second name should be at least 2 characters";

  if (!data.emailAddr.trim()) errors.emailAddr = "Email address is required";
  else if (!EMAIL_RE.test(data.emailAddr))
    errors.emailAddr = "Enter a valid email address";

  if (data.idNo.trim() && data.idNo.trim().length < 6)
    errors.idNo = "Id card number looks too short";

  if (!data.gender) errors.gender = "Please select a gender";

  if (data.age < 9 || data.age > 110) errors.age = "Enter a valid age";

  if (!data.phone.trim()) errors.phone = "Telephone number is required";
  else if (data.phone.trim().length < 10)
    errors.phone = "Enter a valid telephone number";

  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 8)
    errors.password = "Must be at least 8 characters long";

  if (!data.confirmPassword)
    errors.confirmPassword = "Please confirm your password";
  else if (data.confirmPassword !== data.password)
    errors.confirmPassword = "Passwords do not match";

  return errors;
}

const Signup = () => {
  const { error, loading, isAuthenticated } = useSelector(authSelector);
  const push = useNavigate();
  const dispatch = useDispatch<any>();

  const [data, setData] = useState<FormData>(initialData);
  const [errorVal, setErrorVal] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submittedOnce, setSubmittedOnce] = useState(false);

  useEffect(() => {
    if (isAuthenticated) push("/");
  }, [isAuthenticated, push]);

  useEffect(() => {
    setErrorVal(validate(data));
  }, [data]);

  const isValid = Object.keys(validate(data)).length === 0;

  function handleChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? 0 : Number(value)) : value,
    }));
  }

  function handleBlur(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }));
  }

  function showError(field: keyof FormData) {
    return (touched[field] || submittedOnce) && errorVal[field];
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedOnce(true);
    const errs = validate(data);
    setErrorVal(errs);
    if (Object.keys(errs).length > 0) return;
    dispatch(signUPUser(data));
  }

  return (
    <form className="s-main" onSubmit={handleSubmit} noValidate>
      <div className="s-cont">
        <div className="title-div">
          <p className="s-title">Create Account</p>
          <p className="s-subtitle">Join us — it only takes a minute</p>
        </div>

        {error && <p className="s-banner-error">{error}</p>}

        <div className="s-fields">
          <div className="s-div">
            <label htmlFor="userName">
              Username <span className="required-mark">*</span>
            </label>
            <input
              id="userName"
              className={`s-input${showError("userName") ? " s-input-error" : ""}`}
              type="text"
              name="userName"
              placeholder="Someone"
              value={data.userName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("userName") && <p className="s-error">{errorVal.userName}</p>}
          </div>

          <div className="s-div">
            <label htmlFor="firstName">
              First Name <span className="required-mark">*</span>
            </label>
            <input
              id="firstName"
              className={`s-input${showError("firstName") ? " s-input-error" : ""}`}
              type="text"
              name="firstName"
              placeholder="John"
              value={data.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("firstName") && <p className="s-error">{errorVal.firstName}</p>}
          </div>

          <div className="s-div">
            <label htmlFor="secondName">
              Second Name <span className="required-mark">*</span>
            </label>
            <input
              id="secondName"
              className={`s-input${showError("secondName") ? " s-input-error" : ""}`}
              type="text"
              placeholder="Doe"
              name="secondName"
              value={data.secondName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("secondName") && <p className="s-error">{errorVal.secondName}</p>}
          </div>

          <div className="s-div">
            <label htmlFor="emailAddr">
              Email Address <span className="required-mark">*</span>
            </label>
            <input
              id="emailAddr"
              className={`s-input${showError("emailAddr") ? " s-input-error" : ""}`}
              type="email"
              name="emailAddr"
              placeholder="johndoe@gmail.com"
              value={data.emailAddr}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("emailAddr") && <p className="s-error">{errorVal.emailAddr}</p>}
          </div>

          <div className="s-div">
            <label htmlFor="idNo">Id Card No</label>
            <input
              id="idNo"
              className={`s-input${showError("idNo") ? " s-input-error" : ""}`}
              type="text"
              placeholder="00000000"
              name="idNo"
              value={data.idNo}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("idNo") && <p className="s-error">{errorVal.idNo}</p>}
          </div>

          <div className="s-div-age">
            <div className="s-div">
              <label htmlFor="gender">
                Gender <span className="required-mark">*</span>
              </label>
              <select
                id="gender"
                className={`s-age${showError("gender") ? " s-input-error" : ""}`}
                name="gender"
                value={data.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Rather not specify">Rather not specify</option>
              </select>
              {showError("gender") && <p className="s-error">{errorVal.gender}</p>}
            </div>
            <div className="s-div">
              <label htmlFor="age">
                Age <span className="required-mark">*</span>
              </label>
              <input
                id="age"
                className={`s-age${showError("age") ? " s-input-error" : ""}`}
                type="number"
                placeholder="18"
                name="age"
                value={data.age === 0 ? "" : data.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {showError("age") && <p className="s-error">{errorVal.age}</p>}
            </div>
          </div>

          <div className="s-div">
            <label htmlFor="phone">
              Tel Number <span className="required-mark">*</span>
            </label>
            <input
              id="phone"
              className={`s-input${showError("phone") ? " s-input-error" : ""}`}
              type="tel"
              name="phone"
              placeholder="+25400000000"
              value={data.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("phone") && <p className="s-error">{errorVal.phone}</p>}
          </div>

          <div className="s-div">
            <label htmlFor="password">
              Password <span className="required-mark">*</span>
            </label>
            <input
              id="password"
              className={`s-input${showError("password") ? " s-input-error" : ""}`}
              type="password"
              name="password"
              placeholder="************"
              value={data.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("password") && <p className="s-error">{errorVal.password}</p>}
          </div>

          <div className="s-div">
            <label htmlFor="confirmPassword">
              Confirm Password <span className="required-mark">*</span>
            </label>
            <input
              id="confirmPassword"
              className={`s-input${showError("confirmPassword") ? " s-input-error" : ""}`}
              type="password"
              name="confirmPassword"
              placeholder="************"
              value={data.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {showError("confirmPassword") && (
              <p className="s-error">{errorVal.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="create-acc">
          <button className="s-create-btn" type="submit" disabled={!isValid || loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
          <Link className="l-link" to="/auth/login">
            Back to Login {`>>`}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;