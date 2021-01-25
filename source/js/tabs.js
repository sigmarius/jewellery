'use strict';

// табы для карточки товара

(function () {

  var tabLinks = document.querySelectorAll('.card__tabs-menu label');
  var tabItems = document.querySelectorAll('.card__tabs-item');

  var linksArray = Array.from(tabLinks);

  if (linksArray && tabItems) {

    for (var i = 0; i < linksArray.length; i++) {
      linksArray[i].addEventListener('click', function (evt) {

        for (var j = 0; j < tabItems.length; j++) {
          tabItems[j].classList.remove('card__tabs-item--active');
        }

        var index = linksArray.indexOf(evt.target);

        tabItems[index].classList.add('card__tabs-item--active');
      });
    }

  }

})();
