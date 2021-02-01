'use strict';

// модальные окна

(function () {

  var modalLoginOpen = document.querySelector('.modal-open--login');
  var modalLogin = document.querySelector('.modal--login');
  var modalLoginClose = document.querySelector('.modal__close--login');

  var modalBasketOpen = document.querySelector('.modal-open--login');
  var modalBasket = document.querySelector('.modal--basket');
  var modalBasketClose = document.querySelector('.modal__close--basket');

  var body = document.querySelector('body');

  var email = modalLogin.querySelector('[id=email]');

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
      modalLogin.classList.remove('modal--show');
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

  modalLoginOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalLogin.classList.add('modal--show');

    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);

    overlay.addEventListener('click', function (overlayEvt) {
      if (overlayEvt.target === overlay) {
        setVisible(false);
      }
    });

    setVisible(true);
    email.focus();

    if (emailStorage) {
      email.value = emailStorage;
    }
  });

  modalLoginClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalLogin.classList.remove('modal--show');
    setVisible(false);
  });

})();
