import headerLogo from "../images/header__logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип Место" className="header__logo" />
      <div className="header__paragraphs">
      <p className={`header__paragraph header__paragraph_name ${
        props.isLoggedIn ? "visible" : "invisible"
      }`}>dfshsfdh</p>
      <Link className="header__paragraph header__paragraph_link" to={location.pathname.includes('sign-in') ? '/sign-up' : '/sign-in'}>{location.pathname.includes('sign-in') ? 'Регистрация' : 'Войти'}</Link>
      </div>
    </header>
  );
}

export default Header;
