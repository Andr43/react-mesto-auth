import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userAuth from "../utils/userAuth";

function Register(props) {
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

    userAuth
      .register(formValue.email, formValue.password)
      .then((res) => {
        if (res.data) {
          props.setRegisteredIn(true);
          props.onSubmitMessage();
          navigate("/sign-in", { replace: true });
        }
        if (!res.data) {
          props.setRegisteredIn(false);
          props.onSubmitMessage();
          return;
        }
      })
      .catch((err) => {
        props.setRegisteredIn(false);
        props.onSubmitMessage();
        return;
      });
  };

  return (
    <div className="auth">
      <h3 className="auth__heading">Регистрация</h3>
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
