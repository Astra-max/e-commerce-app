import "../../styles/sign-up.css";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signUPUser } from "../../store/feature/authSlice";
import { UnknownAction } from "@reduxjs/toolkit";

// auth sign in component
const Signup = () => {
  const [submit, setSubmit] = useState(true);
  const { error, token } = useSelector(authSelector);
  const push = useNavigate();

  const [data, setData] = useState({
    userName: "",
    firstName: "",
    secondName: "",
    emailAddr: "",
    phone: "",
    idNo: "",
    gender: "",
    age: 0,
    password: "",
    confirm: "",
  });
  const [errorVal, setError] = useState({
    userName: "",
    firstName: "",
    secondName: "",
    emailAddr: "",
    phone: "",
    idNo: "",
    gender: "",
    age: "",
    password: "",
    confirm: "",
  });

  const dispatch: any = useDispatch();

  useEffect(()=> {
    if (token) {
      push('/')
    }
  },[token])

  /**
   * Handles form validation
   */
  function FormValidation(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { value, name } = event.target;
    setData((a) => ({ ...a, [name]: value }));
    if (data.userName.length !== 0 && data.userName.length <= 1) {
      setError((e) => ({
        ...e,
        userName: "username should be atleast 3 characters",
      }));
    } else {
      setError((e) => ({
        ...e,
        userName: "",
      }));
    }
    if (data.firstName.length !== 0 && data.firstName.length <= 1) {
      setError((e) => ({
        ...e,
        firstName: "firstname should be atleast 3 characters",
      }));
    } else {
      setError((e) => ({
        ...e,
        firstName: "",
      }));
    }
    if (data.secondName.length !== 0 && data.secondName.length <= 1) {
      setError((e) => ({
        ...e,
        secondName: "second name should be atleast 3 characters",
      }));
    } else {
      setError((e) => ({
        ...e,
        secondName: "",
      }));
    }
    if (data.emailAddr.length !== 0 && data.emailAddr.length <= 1) {
      setError((e) => ({
        ...e,
        emailAddr: "invalid email address",
      }));
    } else {
      setError((e) => ({
        ...e,
        emailAddr: "",
      }));
    }
    if (data.idNo.length <= 5) {
      setError((e) => ({
        ...e,
        idNo: "Invalid id card number",
      }));
    } else {
      setError((e) => ({
        ...e,
        idNo: "",
      }));
    }
    if (data.gender.length !== 0 && data.gender.length <= 1) {
      setError((e) => ({
        ...e,
        gender: "Missing gender",
      }));
    } else {
      setError((e) => ({
        ...e,
        gender: "",
      }));
    }
    if (data.age < 9 || data.age > 110) {
      setError((e) => ({
        ...e,
        age: "Invalid age",
      }));
    } else {
      setError((e) => ({
        ...e,
        age: "",
      }));
    }
    if (data.phone.length !== 0 && data.phone.length < 10) {
      setError((e) => ({
        ...e,
        phone: "Invalid telephone number",
      }));
    } else {
      setError((e) => ({
        ...e,
        phone: "",
      }));
    }
    if (data.password.length < 8) {
      setError((e) => ({
        ...e,
        password: "Must be 8 characters long",
      }));
    } else {
      setError((e) => ({
        ...e,
        password: "",
      }));
    }

    if (data.confirm !== data.password) {
      setError((e) => ({
        ...e,
        confirm: "confirm password not equal password",
      }));
    } else {
      setError((e) => ({
        ...e,
        confirm: "",
      }));
    }
    if (
      errorVal.userName === "" &&
      data.userName !== "" &&
      errorVal.firstName === "" &&
      data.firstName !== "" &&
      errorVal.secondName === "" &&
      data.secondName !== "" &&
      errorVal.emailAddr === "" &&
      data.emailAddr !== "" &&
      errorVal.gender === "" &&
      data.gender !== "" &&
      errorVal.age === "" &&
      data.age > 0 &&
      errorVal.idNo === "" &&
      errorVal.confirm === "" &&
      data.confirm !== "" &&
      errorVal.password === "" &&
      data.password !== "" &&
      errorVal.phone === "" &&
      data.phone !== ""
    ) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  }

  // posts user data to server
  function HandleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): UnknownAction {
    event.preventDefault();
    alert("submitted succesfully");
    setSubmit(true)
    return dispatch(signUPUser(data));
  }

  return (
    <form
      className="s-main"
      action="POST"
      onSubmit={(event) => HandleSubmit(event)}
    >
      <div className="s-cont">
        <div className="title-div">
          <p className="s-title">Create Account</p>
        </div>
        <div>
          {error && <p style={{color: "red"}}>{error}</p>}
          <div className="s-div">
            <p>
              UserName <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="s-input"
              type="text"
              name="userName"
              placeholder="Someone"
              required
              onChange={(event) => FormValidation(event)}
            />
            {errorVal.userName && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.userName}
              </p>
            )}
          </div>
          <div className="s-div">
            <p>
              First Name <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="s-input"
              type="text"
              name="firstName"
              placeholder="John"
              required
              onChange={(event) => FormValidation(event)}
            />
            {errorVal.firstName && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.firstName}
              </p>
            )}
          </div>
          <div className="s-div">
            <p>
              Second Name <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="s-input"
              type="text"
              placeholder="Doe"
              name="secondName"
              required
              onChange={(event) => FormValidation(event)}
            />
            {errorVal.secondName && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.secondName}
              </p>
            )}
          </div>
          <div className="s-div">
            <p>
              Email Address <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="s-input"
              type="email"
              name="emailAddr"
              placeholder="johndoe@gmail.com"
              onChange={(event) => FormValidation(event)}
              required
            />
            {errorVal.emailAddr && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.emailAddr}
              </p>
            )}
          </div>
          <div className="s-div">
            <p>Id Card No</p>
            <input
              className="s-input"
              type="text"
              placeholder="00000000"
              name="idNo"
              onChange={(event) => FormValidation(event)}
            />
            {errorVal.idNo && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.idNo}
              </p>
            )}
          </div>
          <div className="s-div-age">
            <div className="s-div">
              <p>
                Gender <span style={{ color: "red" }}>*</span>
              </p>
              <select
                className="s-age"
                name="gender"
                id=""
                onChange={(event) => FormValidation(event)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Rather not Specify">Rather not specify</option>
              </select>
              {errorVal.gender && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.9rem",
                    position: "absolute",
                    paddingTop: "4.6rem",
                  }}
                >
                  {errorVal.gender}
                </p>
              )}
            </div>
            <div className="s-div">
              <p>
                Age <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="s-age"
                type="number"
                placeholder="18"
                required
                name="age"
                onChange={(event) => FormValidation(event)}
              />
              {errorVal.age && (
                <p
                  style={{
                    color: "red",
                    fontSize: "0.9rem",
                    position: "absolute",
                    paddingTop: "4.6rem",
                  }}
                >
                  {errorVal.age}
                </p>
              )}
            </div>
          </div>
          <div className="s-div">
            <p>
              Tel Number <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="s-input"
              type="tel"
              name="phone"
              placeholder="+25400000000"
              required
              onChange={(event) => FormValidation(event)}
            />
            {errorVal.phone && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.phone}
              </p>
            )}
          </div>
          <div className="s-div">
            <p>
              Password <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="s-input"
              type="password"
              name="password"
              placeholder="************"
              required
              onChange={(event) => FormValidation(event)}
            />
            {errorVal.password && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.password}
              </p>
            )}
          </div>
          <div className="s-div">
            <p>
              Confirm Password <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="s-input"
              type="password"
              name="confirm"
              placeholder="************"
              required
              onChange={(event) => FormValidation(event)}
            />
            {errorVal.confirm && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  position: "absolute",
                  paddingTop: "4.6rem",
                }}
              >
                {errorVal.confirm}
              </p>
            )}
          </div>
        </div>
        <div className="create-acc">
          <button className="s-create-btn" type="submit" disabled={submit}>
            Create Account
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
