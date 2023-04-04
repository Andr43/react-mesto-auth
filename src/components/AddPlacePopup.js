import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleInputCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleInputCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    props.onAddCard({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onMouseDown={props.onClose}
      onSubmit={handleFormSubmit}
      name="add"
      title="Новое место"
      buttonName="Создать"
    >
      {" "}
      <input
        placeholder="Название"
        id="heading"
        className="popup__field popup__field_heading"
        type="text"
        minLength="2"
        maxLength="30"
        onChange={handleInputCardNameChange}
        value={cardName}
        required
      />
      <span className="popup__error heading-error"></span>
      <input
        placeholder="Ссылка на картинку"
        id="source"
        className="popup__field popup__field_source"
        type="url"
        onChange={handleInputCardLinkChange}
        value={cardLink}
        required
      />
      <span className="popup__error source-error"></span>{" "}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
