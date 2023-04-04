function Login (){

  return((
    <div className="auth">
      <h3 className="auth__heading">Вход</h3>
      <form className="auth__form"
      name=''
      action="#"
      id=""
      onSubmit=''
      noValidate>
        <input
        placeholder="Email"
        id="email"
        className="auth__field auth__field_name"
        type="email"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="auth__error email-error"></span>
      <input
        placeholder="Пароль"
        id="password"
        className="auth__field auth__field_password"
        type="text"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="auth__error password-error"></span>{" "}
 <button
            aria-label="войти"
            className="auth__button"
            type="submit"
          >
            Войти
          </button>
      </form>

    </div>
  ))
}

export default Login;