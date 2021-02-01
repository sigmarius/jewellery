'use strict';

// слайдер

(function () {

  var list = document.querySelector('.slider__list');
  var items = document.querySelectorAll('.slider__item');
  var buttonLeft = document.querySelector('.slider__button--left');
  var buttonRight = document.querySelector('.slider__button--right');

  var wrapperWidth = parseFloat(getComputedStyle(list).width);
  var itemWidth = parseFloat(getComputedStyle(items[0]).width);

  var position = 0;

  console.log(wrapperWidth);
  console.log(itemWidth);

  // var positionLeftItem = 0;
  // var transform = 0;
  // var step = wrapperWidth;
  // var itemsArray = [];

  // items.forEach(function (item, index) {
  //   itemsArray.push({item: item, position: index, transform: 0});
  // });

  // var position = {
  //   getMin: 0,
  //   getMax: itemsArray.length - 1,
  // };

  buttonLeft.addEventListener('click', function () {
    position += wrapperWidth;
    position = Math.min(position, 0);
    console.log(list.style.transform);
    list.style.transform = 'translateX(' + position + '%)';
  });

  buttonRight.addEventListener('click', function () {
    position -= wrapperWidth;
    position = Math.max(position, -itemWidth * items.length - 4);
    list.style.marginLeft = position + 'px';
  })

})();
