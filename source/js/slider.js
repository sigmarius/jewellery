'use strict';

// слайдер

(function () {

  var PictureCount = {
    DESKTOP: 4,
    TABLET: 2,
  };

  var tablet = window.matchMedia('(max-width: 1023px)');

  var list = document.querySelector('.slider__list');
  var items = document.querySelectorAll('.slider__item');
  var buttonLeft = document.querySelector('.slider__button--left');
  var buttonRight = document.querySelector('.slider__button--right');

  // var wrapperWidth = parseFloat(getComputedStyle(list).width);
  // var itemWidth = parseFloat(getComputedStyle(items[0]).width);

  var wrapperWidth;
  var itemWidth;

  var positionLeftItem = 0;
  var transform = 0;
  // var step = itemWidth / wrapperWidth * 100 * 4;
  // var step = itemWidth / wrapperWidth * 100;

  var step;
  var itemsArray = [];

  var startX;

  items.forEach(function (item, index) {
    itemsArray.push({item: item, position: index, transform: 0});
  });

  var position = {
    getMin: 0,
    getMax: itemsArray.length - 1,
  };

  var count; // временная переменная для определения количества изображений на адаптиве
  // var step;

  var changeSizeHandler = function (evt) {
    
    if (evt.matches) {
      count = PictureCount.TABLET;
    } else {
      count = PictureCount.DESKTOP;
    }

    wrapperWidth = parseFloat(getComputedStyle(list).width);
    itemWidth = parseFloat(getComputedStyle(items[0]).width);

    step = itemWidth / wrapperWidth * 100;

    positionLeftItem = 0;
    transform = 0;
    list.style.transform = 'translateX(' + transform + '%)';
    // step = itemWidth / wrapperWidth * 100 * count;

    console.log('work!');
  };

  tablet.addListener(changeSizeHandler);
  changeSizeHandler(tablet);

  // window.addEventListener('resize', function () {
  //   positionLeftItem = 0;
  //   transform = 0;

  //   list.style.transform = 'translateX(' + transform + '%)';
  // });

  // buttonRight.addEventListener('click', function () {
  //   if ((positionLeftItem + wrapperWidth / itemWidth + count - 1) >= position.getMax) {
  //     return;
  //   }

  //   positionLeftItem++;
  //   transform -= step * count;

  //   list.style.transform = 'translateX(' + transform + '%)';
  // });

  var buttonRightClickHandler = function () {
    if (positionLeftItem + count >= position.getMax) {
      return;
    } else {
      positionLeftItem = positionLeftItem + count;

      transform -= step * count;
      console.log('right' + wrapperWidth);
      list.style.transform = 'translateX(' + transform + '%)';
    }
  };

  var buttonLeftClickHandler = function () {
    if (positionLeftItem <= position.getMin) {
      return;
    }

    positionLeftItem = positionLeftItem - count;
    transform += step * count;
    console.log('left ' + wrapperWidth);
    list.style.transform = 'translateX(' + transform + '%)';
  };


  buttonRight.addEventListener('click', buttonRightClickHandler);
  buttonLeft.addEventListener('click', buttonLeftClickHandler);

  // buttonRight.addEventListener('click', function () {
  //   if (positionLeftItem + count >= position.getMax) {
  //     return;
  //   } else {

  //     positionLeftItem = positionLeftItem + count;
  //     console.log(positionLeftItem);
  //     transform -= step * count;
  
  //     list.style.transform = 'translateX(' + transform + '%)';
  //   }
  // });

  // buttonLeft.addEventListener('click', function () {
  //   if (positionLeftItem <= position.getMin) {
  //     return;
  //   }

  //   positionLeftItem = positionLeftItem - count;
  //   transform += step * count;

  //   list.style.transform = 'translateX(' + transform + '%)';
  // });

})();
