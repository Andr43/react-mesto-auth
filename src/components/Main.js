import { useState, useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const [isMouseOverAvatar, setIsMouseOverAvatar] = useState(false);
  const classNameEditImage = `${isMouseOverAvatar ? "visible" : "invisible"}`;
  const userInfo = useContext(CurrentUserContext);

  function handleImageClick(card) {
    props.onCardImageClick(card);
  }

  function handleLikeClick(card) {
    props.onLikeClick(card);
  }

  function handleDeleteCard(card) {
    props.onDeleteCard(card);
  }

  function hoverUserImage() {
    setIsMouseOverAvatar(!isMouseOverAvatar);
  }

  function handleDeleteButtonClick() {
    props.onDeleteButtonClick();
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={userInfo.avatar}
            alt="аватар"
            className="profile__image"
            onMouseEnter={hoverUserImage}
          />
          <div
            className={`profile__background ${classNameEditImage}`}
            onMouseLeave={hoverUserImage}
          >
            <button
              className={`profile__button profile__button_edit-image ${classNameEditImage}`}
              onClick={props.onEditAvatar}
            ></button>
          </div>
        </div>
        <h1 className="profile__name">{userInfo.name}</h1>
        <button
          aria-label="перейти к полям ввода для изменения профиля"
          type="button"
          className="profile__button profile__button_edit"
          onClick={props.onEditProfile}
        ></button>
        <button
          aria-label="добавить новую карточку"
          type="button"
          className="profile__button profile__button_add"
          onClick={props.onAddPlace}
        ></button>
        <p className="profile__job">{userInfo.about}</p>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map(({ ...props }) => (
            <Card
              key={props._id}
              card={props}
              onCardClick={handleImageClick}
              onLikeClick={handleLikeClick}
              onDeleteClick={handleDeleteButtonClick}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
