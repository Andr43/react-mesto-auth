function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "visible" : "invisible"
      }`}
      onMouseDown={props.onMouseDown}
    >
      <div className="popup__container">
        <h3 className="popup__heading">{props.title}</h3>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          action="#"
          id=""
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            aria-label="сохранить внесенные изменения"
            className={`popup__button popup__button_save popup__button_save_${props.name}`}
            type="submit"
          >
            {props.buttonName || "Сохранить"}
          </button>
        </form>
        <button
          aria-label="закрыть всплывающее окно"
          className={`popup__button popup__button_close popup__button_close_${props.name}`}
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
