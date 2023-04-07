import React, { useState } from "react";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const formLogin = document.querySelector(".auth__form");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    props.onRegisterSubmit(formValue.email, formValue.password, formLogin);
  };

  return (
    <div className="auth">
      <h3 className="auth__heading">Регистрация</h3>
      <form
        className="auth__form"
        name=""
        action="#"
        id=""
        onSubmit={formSubmit}
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
          value={formValue.email}
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
          value={formValue.password}
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
