'use strict';

// аккордеон для блока FAQ

(function () {
  var faqList = document.querySelector('.faq__list');

  if (faqList) {
    faqList.classList.remove('faq__list--nojs');

    var toggleFaqItem = function (item) {
      item.classList.toggle('faq__item--open');
    };

    faqList.addEventListener('click', function (evt) {
      var faqItem = evt.target.closest('li');
      toggleFaqItem(faqItem);
    });
  }

})();
