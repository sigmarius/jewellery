'use strict';

// модальные окна

(function () {

  var modalLoginOpen = document.querySelector('.modal-open--login');
  var modalLogin = document.querySelector('.modal--login');
  var modalLoginClose = document.querySelector('.modal__close--login');
  var loginForm = document.querySelector('.login__form');

  var modalBasketOpen = document.querySelector('.modal-open--basket');
  var modalBasket = document.querySelector('.modal--basket');
  var modalBasketClose = document.querySelector('.modal__close--basket');

  var body = document.querySelector('body');

  var email = document.querySelector('[id=email]');

  var isStorage = true;
  var emailStorage = '';

  try {
    emailStorage = localStorage.getItem('emailStorage');
  } catch (err) {
    isStorage = false;
  }

  var setVisible = function (visible) {
    if (visible) {
      body.classList.add('overlay--open');
      document.addEventListener('keydown', escapeClickHandler);
    } else {
      body.classList.remove('overlay--open');
      document.querySelector('.modal--show').classList.remove('modal--show');
      document.querySelector('.overlay').remove();
      document.removeEventListener('keydowm', escapeClickHandler);
    }
  };

  var escapeClickHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      setVisible(false);
    }
  };

  var createOverlay = function () {
    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);

    overlay.addEventListener('click', function (overlayEvt) {
      if (overlayEvt.target === overlay) {
        setVisible(false);
      }
    });
  };

  var modalOpenHandler = function (modal) {
    modal.classList.add('modal--show');
    createOverlay();
    setVisible(true);
  };

  var modalCloseHandler = function (evt) {
    evt.preventDefault();
    setVisible(false);
  };

  modalLoginOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalOpenHandler(modalLogin);
    email.focus();

    if (emailStorage) {
      email.value = emailStorage;
    }
  });

  modalLoginClose.addEventListener('click', modalCloseHandler);

  loginForm.addEventListener('submit', function (evt) {
    if (!email.value) {
      evt.preventDefault();
    } else {
      if (isStorage) {
        localStorage.setItem('emailStorage', email.value);
      }
    }
  });

  modalBasketOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalOpenHandler(modalBasket);
  });

  modalBasketClose.addEventListener('click', modalCloseHandler);

})();
