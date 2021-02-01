'use strict';
// утилитарный модуль - экспортирует общие функции и переменные для всех модулей
(function () {
    window.utils = {
        KeyCode: {
            BACKSPACE: 'Backspace',
            ESCAPE: 'Escape'
        }
    };
}());
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
}());
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
}());
// мобильное меню - начиная с планшетной версии
(function () {
    var pageHeader = document.querySelector('.page-header');
    var headerToggle = document.querySelector('.page-header__toggle');
    if (pageHeader && headerToggle) {
        pageHeader.classList.remove('page-header--nojs');
        headerToggle.addEventListener('click', function () {
            if (pageHeader.classList.contains('page-header--closed')) {
                pageHeader.classList.remove('page-header--closed');
                pageHeader.classList.add('page-header--opened');
            } else {
                pageHeader.classList.add('page-header--closed');
                pageHeader.classList.remove('page-header--opened');
            }
        });
    }
}());
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
}());
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
    });
}());
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
}());