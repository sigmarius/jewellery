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
  var overlay = document.querySelector('.overlay');

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
      body.classList.add('overlay');
      document.addEventListener('keydown', escapeClickHandler);
    } else {
      body.classList.remove('overlay');
      document.removeEventListener('keydowm', escapeClickHandler);
    }
  };

  var escapeClickHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      setVisible(false);
    }
  };

  var overlayClickHandler = function (evt) {
    if (evt.target !== modalLogin && evt.target === overlay) {
      console.log(evt.target);
      setVisible(false);
    }
  };

  modalLogin.addEventListener('click', overlayClickHandler);

  modalLoginOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalLogin.classList.add('modal--show');
    setVisible(true);
    email.focus();

    // if (body.classList.contains('overlay')) {
    //   body.addEventListener('click', function () {
    //     if (evt.target !== modalLogin) {
    //       setVisible(false);
    //     }
    //   });
    // }

    if (emailStorage) {
      email.value = emailStorage;
    }
  });

})();
