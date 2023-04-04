import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser.id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser.id);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onLikeClick(props.card);
  }

  function handleDeleteCard() {
    props.onDeleteCard(props.card);
  }

  function handleOpenPopupDelete() {
    props.onDeleteClick();
  }

  return (
    <li className="card__element">
      <img
        src={props.card.link}
        onClick={handleCardClick}
        alt={props.card.name}
        className="card__image"
      />
      <div className="card__flex">
        <h3 className="card__heading">{props.card.name}</h3>
        <div className="card__flex_like">
          <button
            aria-label="добавить в избранное"
            type="button"
            onClick={handleLikeClick}
            className={`card__button card__button_like ${
              isLiked && "card__button_like_active"
            }`}
          ></button>
          <p className="card__likes">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          aria-label="удалить карточку"
          type="button"
          className="card__button card__button_delete"
          onClick={handleDeleteCard}
        />
      )}
    </li>
  );
}

export default Card;
