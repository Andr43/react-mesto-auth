import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import profileAvatar from "../images/profile__avatar.jpg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as userAuth from "../utils/userAuth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import api from "../utils/api";

function App() {
  const [isPopupEditOpened, setIsPopupEditOpened] = useState(false);
  const [isPopupAddPlaceOpened, setIsPopupAddPlaceOpened] = useState(false);
  const [isPopupEditImageOpened, setIsPopupEditImageOpened] = useState(false);
  const [isPopupDeleteCardOpened, setIsPopupDeleteCardOpened] = useState(false);
  const [isPopupResultInfoOpened, setIsPopupResultInfoOpened] = useState(false);
  const [isMouseOverAvatar, setIsMouseOverAvatar] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registeredIn, setRegisteredIn] = useState(false);
  const navigate = useNavigate();

  function showError(err) {
    console.error(err);
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser({
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
          id: userInfo._id,
        });
      })
      .catch((err) => {
        showError(err);
        setCurrentUser({
          name: "Жак-Ив Кусто",
          about: "Исследователь океана",
          avatar: profileAvatar,
        });
      });
    api
      .getCards()
      .then((cardInfo) => {
        setCards(cardInfo);
      })
      .catch((err) => {
        showError(err);
      });
    handleTokenCheck();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleEscClose(esc) {
    if (esc.key === "Escape" || esc.key === "Esc") {
      setIsPopupEditOpened(isPopupEditOpened);

      setIsPopupAddPlaceOpened(isPopupAddPlaceOpened);

      setIsPopupEditImageOpened(isPopupEditImageOpened);

      setIsPopupDeleteCardOpened(isPopupDeleteCardOpened);

      setIsPopupResultInfoOpened(isPopupResultInfoOpened);

      setSelectedCard({});
    }
  }

  function handleEditProfileClick() {
    setIsPopupEditOpened(!isPopupEditOpened);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleAddPlaceClick() {
    setIsPopupAddPlaceOpened(!isPopupAddPlaceOpened);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleEditAvatarClick() {
    setIsPopupEditImageOpened(!isPopupEditImageOpened);
    setIsMouseOverAvatar(false);
    document.addEventListener("keydown", handleEscClose);
  }
  function handleDeleteCardClick() {
    setIsPopupDeleteCardOpened(!isPopupDeleteCardOpened);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
    document.addEventListener("keydown", handleEscClose);
  }

  function handleShowAuthorisationResult() {
    setIsPopupResultInfoOpened(true);
    document.addEventListener("keydown", handleEscClose);
  }

  function closeAllPopups(evt) {
    setIsPopupEditOpened(false);
    setIsPopupAddPlaceOpened(false);
    setIsPopupEditImageOpened(false);
    setIsPopupDeleteCardOpened(false);
    setIsPopupResultInfoOpened(false);
    setSelectedCard({});

    if (
      evt.target.classList.contains("popup__container") ||
      evt.target.classList.contains("popup__form") ||
      evt.target.classList.contains("popup__heading") ||
      evt.target.classList.contains("popup__image") ||
      evt.target.classList.contains("popup__field") ||
      evt.target.classList.contains("popup__error") ||
      evt.target.classList.contains("popup__button_save") ||
      evt.target.classList.contains("popup-image__container") ||
      evt.target.classList.contains("popup-image__image") ||
      evt.target.classList.contains("popup-image__heading")
    ) {
      setIsPopupEditOpened(isPopupEditOpened);
      setIsPopupAddPlaceOpened(isPopupAddPlaceOpened);
      setIsPopupEditImageOpened(isPopupEditImageOpened);
      setIsPopupDeleteCardOpened(isPopupDeleteCardOpened);
      setIsPopupResultInfoOpened(isPopupResultInfoOpened);
      setSelectedCard(selectedCard);
    }

    document.removeEventListener("keydown", handleEscClose);
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo(name, about)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: name,
          about: about,
        });
        setIsPopupEditOpened(false);
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateUserImage(avatar)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar,
        });
        setIsPopupEditImageOpened(false);
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsPopupAddPlaceOpened(false);
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleDeleteCardSubmit() {
    setIsPopupDeleteCardOpened(false);
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        userAuth
          .getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            showError(err);
          });
      }
    }
  };

  const onLoginSubmit = (email, password, form) => {
    if (!email || !password) {
      return;
    }
    userAuth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          form.reset();
          handleShowAuthorisationResult();
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
        if (!data.token) {
          setLoggedIn(false);
          handleShowAuthorisationResult();
        }
      })
      .catch((err) => {
        showError(err);
        setLoggedIn(false);
        handleShowAuthorisationResult();
      });
  };

  const onRegisterSubmit = (email, password, form) => {
    userAuth
      .register(email, password)
      .then((res) => {
        if (res.data) {
          form.reset();
          setRegisteredIn(true);
          handleShowAuthorisationResult();
          navigate("/sign-in", { replace: true });
        }
        if (!res.data) {
          setRegisteredIn(false);
          handleShowAuthorisationResult();
          return;
        }
      })
      .catch((err) => {
        showError(err);
        setRegisteredIn(false);
        handleShowAuthorisationResult();
        return;
      });
  };

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={
                <CurrentUserContext.Provider value={currentUser}>
                  <CurrentCardContext.Provider value={cards}>
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      setIsMouseOverAvatar={setIsMouseOverAvatar}
                      isMouseOverAvatar={isMouseOverAvatar}
                      onCardImageClick={handleCardClick}
                      onLikeClick={handleCardLike}
                      onDeleteButtonClick={handleDeleteCardClick}
                      onDeleteCard={handleDeleteCard}
                      cards={cards}
                    />
                  </CurrentCardContext.Provider>
                  <Footer />
                </CurrentUserContext.Provider>
              }
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login onLoginSubmit={onLoginSubmit} onClose={closeAllPopups} />
          }
        />
        <Route
          path="/sign-up"
          element={<Register onRegisterSubmit={onRegisterSubmit} />}
        />
      </Routes>
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          isOpen={isPopupEditOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isPopupEditImageOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isPopupAddPlaceOpened}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          isOpen={isPopupDeleteCardOpened}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCardSubmit}
        />
      </CurrentUserContext.Provider>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isPopupResultInfoOpened}
        loggedIn={loggedIn}
        registeredIn={registeredIn}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
