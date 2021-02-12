'use strict';

// слайдер

(function () {

  var PictureCount = {
    DESKTOP: 4,
    TABLET: 2,
  };

  var mobile = window.matchMedia('(max-width: 767px)');
  var tablet = window.matchMedia('(max-width: 1023px)');

  var list = document.querySelector('.slider__list');
  var items = document.querySelectorAll('.slider__item');
  var buttonLeft = document.querySelector('.slider__button--left');
  var buttonRight = document.querySelector('.slider__button--right');

  var wrapperWidth; // вычисляемая под конкретное разрешение ширина контейнера
  var itemWidth; // вычисляемая под конкретное разрешение ширина 1 слайда

  var positionLeftItem = 0;
  var transform = 0;

  var step; // шаг
  var itemsArray = [];

  var startX = 0; // для мобильного тача - начало перемещения

  if (items) {
    items.forEach(function (item, index) {
      itemsArray.push({item: item, position: index, transform: 0});
    });
  }

  var position = {
    getMin: 0,
    getMax: itemsArray.length - 1,
  };

  var count; // временная переменная для определения количества изображений на адаптиве

  var changeSizeHandler = function (evt) {

    if (evt.matches) {
      count = PictureCount.TABLET;
    } else {
      count = PictureCount.DESKTOP;
    }

    if (list && items) {
      wrapperWidth = parseFloat(getComputedStyle(list).width);
      itemWidth = parseFloat(getComputedStyle(items[0]).width);

      step = itemWidth / wrapperWidth * 100;

      positionLeftItem = 0;
      transform = 0;
      list.style.transform = 'translateX(' + transform + '%)';
    }
  };

  var setMobileHandler = function (evt) {
    if (evt.matches) {
      setMobileTouch();
    }
  };

  var buttonRightClickHandler = function () {
    if (positionLeftItem + count >= position.getMax) {
      return;
    }

    positionLeftItem = positionLeftItem + count;

    transform -= step * count;
    list.style.transform = 'translateX(' + transform + '%)';
  };

  var buttonLeftClickHandler = function () {
    if (positionLeftItem <= position.getMin) {
      return;
    }

    positionLeftItem = positionLeftItem - count;
    transform += step * count;

    list.style.transform = 'translateX(' + transform + '%)';
  };

  var setMobileTouch = function () {
    if (list) {
      list.addEventListener('touchstart', function (evt) {
        startX = evt.changedTouches[0].clientX;
      });

      list.addEventListener('touchend', function (evt) {
        var endX = evt.changedTouches[0].clientX;
        var deltaX = endX - startX;

        if (deltaX > 50) {
          buttonRightClickHandler();
        } else if (deltaX < -50) {
          buttonLeftClickHandler();
        }
      });
    }
  };

  if (buttonLeft && buttonRight) {
    buttonRight.addEventListener('click', buttonRightClickHandler);
    buttonLeft.addEventListener('click', buttonLeftClickHandler);
  }

  tablet.addListener(changeSizeHandler);
  changeSizeHandler(tablet);

  mobile.addListener(setMobileHandler);
  setMobileHandler(mobile);

})();
