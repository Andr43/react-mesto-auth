import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarProfile(props) {
  const imageRef = useRef();

  function handleFormSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: imageRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onMouseDown={props.onClose}
      onSubmit={handleFormSubmit}
      name="edit-avatar"
      title="Обновить аватар"
    >
      {" "}
      <input
        placeholder="Ссылка на картинку"
        id="avatar"
        className="popup__field popup__field_source"
        type="url"
        ref={imageRef}
        required
      />
      <span className="popup__error avatar-error"></span>{" "}
    </PopupWithForm>
  );
}

export default EditAvatarProfile;
