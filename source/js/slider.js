'use strict';

// слайдер

(function () {

  // var PictureCount = {
  //   DESKTOP: 4,
  //   TABLET: 2,
  // };

  var tablet = window.matchMedia('(max-width: 1023px)');

  var list = document.querySelector('.slider__list');
  var items = document.querySelectorAll('.slider__item');
  var buttonLeft = document.querySelector('.slider__button--left');
  var buttonRight = document.querySelector('.slider__button--right');

  var wrapperWidth = parseFloat(getComputedStyle(list).width);
  var itemWidth = parseFloat(getComputedStyle(items[0]).width);

  var positionLeftItem = 0;
  var transform = 0;
  // var step = itemWidth / wrapperWidth * 100 * 4;
  var step = itemWidth / wrapperWidth * 100;
  var itemsArray = [];

  items.forEach(function (item, index) {
    itemsArray.push({item: item, position: index, transform: 0});
  });

  var position = {
    getMin: 0,
    getMax: itemsArray.length,
  };

  var count = 4; // временная переменная для определения количества изображений на адаптиве
  // var step;

  // var changeSizeHandler = function (evt) {
  //   if (evt.matches) {
  //     count = PictureCount.TABLET;
  //     console.log(count);
  //   } else {
  //     count = PictureCount.DESKTOP;
  //     console.log(count);
  //   }
  //   // step = itemWidth / wrapperWidth * 100 * count;
  // };

  // tablet.addListener(changeSizeHandler);
  // changeSizeHandler(tablet);

  buttonRight.addEventListener('click', function () {
    if ((positionLeftItem + wrapperWidth / itemWidth + count - 1) >= position.getMax) {
      return;
    }

    positionLeftItem++;
    transform -= step * count;

    list.style.transform = 'translateX(' + transform + '%)';
  });

  buttonLeft.addEventListener('click', function () {
    if (positionLeftItem <= position.getMin) {
      return;
    }

    positionLeftItem--;
    transform += step * count;

    list.style.transform = 'translateX(' + transform + '%)';
  });

  // buttonLeft.addEventListener('click', function () {
  //   position += wrapperWidth;
  //   position = Math.min(position, 0);
  //   console.log(list.style.transform);
  //   list.style.transform = 'translateX(' + position + '%)';
  // });

  // buttonRight.addEventListener('click', function () {
  //   position -= wrapperWidth;
  //   position = Math.max(position, -itemWidth * items.length - 4);
  //   list.style.marginLeft = position + 'px';
  // });

})();
