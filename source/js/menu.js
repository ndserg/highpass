const VEWPORTS = {
  desktop: 628,
};

let body = null;
let header = null;
let menuButton = null;
let menu = null;

const mediaQueryList = window.matchMedia(`(min-width: ${VEWPORTS.desktop}px)`);
const bodyLockedClass = "locked";
const menuOpenClass = "header--show-menu";

let isSettedListener = false;

const removeActiveClasses = () => {
  header.classList.remove(menuOpenClass);
  body.classList.remove(bodyLockedClass);
};

const setActiveClasses = () => {
  header.classList.add(menuOpenClass);
  body.classList.add(bodyLockedClass);
};

const mouseUpHandler = (evt) => {
  if (evt.target.closest("a")) {
    evt.preventDefault();

    removeActiveClasses();
  }
};

const menuButtonClickHandler = (evt) => {
  evt.preventDefault();

  if (header.classList.contains(menuOpenClass)) {
    removeActiveClasses();
  } else {
    setActiveClasses();
  }
};

const removeMainNavListener = () => {
  menu.removeEventListener("mouseup", mouseUpHandler);
};

const addMainNavListener = () => {
  menu.addEventListener("mouseup", mouseUpHandler);
};

const addmenuButtonListener = () => {
  if (!isSettedListener) {
    menuButton.addEventListener("click", menuButtonClickHandler);
    addMainNavListener();
    isSettedListener = true;
  }
};

const removemenuButtonListener = () => {
  if (isSettedListener) {
    menuButton.removeEventListener("click", menuButtonClickHandler);
    removeMainNavListener();

    removeActiveClasses();
    isSettedListener = false;
  }
};

const screenSizeChangeHandler = (mql) => {
  if (mql.matches) {
    removemenuButtonListener();
  } else {
    addmenuButtonListener();
  }
};

const initMenuPopup = () => {
  body = document.querySelector("body");
  header = body.querySelector(".header");
  menu = header.querySelector(".header__nav");
  menuButton = header.querySelector(".header__nav-btn");

  addmenuButtonListener();

  screenSizeChangeHandler(mediaQueryList);

  mediaQueryList.addEventListener("change", screenSizeChangeHandler);
};

export default initMenuPopup;
