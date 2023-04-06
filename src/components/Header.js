import headerLogo from "../images/header__logo.svg";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHistory } from "react-router";
import * as userAuth from "../utils/userAuth";

function Header(props) {
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = () => {
    const token = localStorage.getItem("token");
    if (token) {
      userAuth.getContent(token).then((res) => {
        setUserEmail(res.data.email);
      });
    }
  };

  const navigate = useNavigate();

  function signOut() {
    if (
      !location.pathname.includes("/sign-up") ||
      !location.pathname.includes("/sign-in")
    ) {
      props.setLoggedIn(false);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  }

  return (
    <header className="header">
      <img src={headerLogo} alt="логотип Место" className="header__logo" />
      <div className="header__paragraphs">
        <p
          className={`header__paragraph header__paragraph_name ${
            props.loggedIn ? "visible" : "invisible"
          }`}
        >
          {userEmail}
        </p>
        <Link
          className="header__paragraph header__paragraph_link"
          onClick={signOut}
          to={location.pathname.includes("sign-in") ? "/sign-up" : "/sign-in"}
        >
          {location.pathname.includes("sign-in")
            ? "Регистрация"
            : location.pathname.includes("/sign-up")
            ? "Войти"
            : "Выйти"}
        </Link>
      </div>
    </header>
  );
}

export default Header;
