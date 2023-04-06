import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userAuth from "../utils/userAuth";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    userAuth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ username: "", password: "" });
          props.onSubmitMessage();
          props.setLoggedIn(true);
          navigate("/", { replace: true });
        }
        if (!data.token) {
          props.onSubmitMessage();
          props.setLoggedIn(false);
        }
      })
      .catch((err) => {
        props.setLoggedIn(false);
        props.onSubmitMessage();
      });
  };
  return (
    <div className="auth">
      <h3 className="auth__heading">Вход</h3>
      <form
        className="auth__form"
        name=""
        action="#"
        id=""
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          placeholder="Email"
          id="email"
          className="auth__field auth__field_name"
          type="email"
          name="email"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          required
        />
        <span className="auth__error email-error"></span>
        <input
          placeholder="Пароль"
          id="password"
          className="auth__field auth__field_password"
          type="text"
          name="password"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span className="auth__error password-error"></span>{" "}
        <button aria-label="войти" className="auth__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
