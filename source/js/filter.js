'use strict';

// аккордеон для фильтра

(function () {

  var filter = document.querySelector('.filter');
  var filterButtons = document.querySelectorAll('.filter__item > button');

  if (filter && filterButtons) {

    filter.classList.remove('filter--nojs');

    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', function (evt) {
        evt.target.parentNode.classList.toggle('filter__item--open');
      });
    }
  }

})();
