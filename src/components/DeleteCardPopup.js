import PopupWithForm from "./PopupWithForm";
import { useContext } from "react";
import { CurrentCardContext } from "../contexts/CurrentCardContext";

function DeleteCardPopup(props) {
  const card = useContext(CurrentCardContext);

  function handleFormSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onMouseDown={props.onClose}
      onSubmit={handleFormSubmit}
      name="delete"
      title="Вы уверены?"
      buttonName="Да"
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
