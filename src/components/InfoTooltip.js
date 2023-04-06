import popupImageSuccess from "../images/popup__image_success.png";
import popupImageUnsuccess from "../images/popup__image_unsuccess.png";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_result ${
        props.isOpen ? "visible" : "invisible"
      }`}
      onMouseDown={props.onClose}
    >
      <div className="popup__container">
        <img
          src={
            props.loggedIn || props.registeredIn
              ? popupImageSuccess
              : popupImageUnsuccess
          }
          className="popup__image"
        />
        <h3 className="popup__heading popup__heading_result">
          {props.registeredIn
            ? "Вы успешно зарегистрировались!"
            : props.loggedIn
            ? "Вход успешно выполнен!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
        <button
          aria-label="закрыть всплывающее окно"
          className="popup__button popup__button_close popup__button_close_result"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
