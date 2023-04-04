import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onMouseDown={props.onClose}
      onSubmit={handleFormSubmit}
      name="edit"
      title="Редактировать профиль"
    >
      {" "}
      <input
        placeholder="Имя"
        id="name"
        className="popup__field popup__field_name"
        type="text"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleInputNameChange}
        required
      />
      <span className="popup__error name-error"></span>
      <input
        placeholder="Вид деятельности"
        id="job"
        className="popup__field popup__field_job"
        type="text"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleInputDescriptionChange}
        required
      />
      <span className="popup__error job-error"></span>{" "}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
