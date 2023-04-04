function ImagePopup(props) {
  return (
    <div
      className={`popup popup-image ${
        props.card.name ? "visible" : "invisible"
      }`}
      onMouseDown={props.onMouseDown}
    >
      <div className="popup-image__container">
        <button
          aria-label="закрыть всплывающее окно"
          className="popup__button popup__button_close popup-image__button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup-image__image"
        />
        <p className="popup-image__heading">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
