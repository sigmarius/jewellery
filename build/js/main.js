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
    var loginForm = document.querySelector('.login__form');
    var modalBasketOpen = document.querySelector('.modal-open--basket');
    var modalBasket = document.querySelector('.modal--basket');
    var modalBasketClose = document.querySelector('.modal__close--basket');
    var body = document.querySelector('body');
    var email = document.querySelector('[id=email]');
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
            document.querySelector('.modal--show').classList.remove('modal--show');
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
    var createOverlay = function () {
        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        body.appendChild(overlay);
        overlay.addEventListener('click', function (overlayEvt) {
            if (overlayEvt.target === overlay) {
                setVisible(false);
            }
        });
    };
    var modalOpenHandler = function (modal) {
        modal.classList.add('modal--show');
        createOverlay();
        setVisible(true);
    };
    var modalCloseHandler = function (evt) {
        evt.preventDefault();
        setVisible(false);
    };
    modalLoginOpen.addEventListener('click', function (evt) {
        evt.preventDefault();
        modalOpenHandler(modalLogin);
        email.focus();
        if (emailStorage) {
            email.value = emailStorage;
        }
    });
    modalLoginClose.addEventListener('click', modalCloseHandler);
    loginForm.addEventListener('submit', function (evt) {
        if (!email.value) {
            evt.preventDefault();
        } else {
            if (isStorage) {
                localStorage.setItem('emailStorage', email.value);
            }
        }
    });
    modalBasketOpen.addEventListener('click', function (evt) {
        evt.preventDefault();
        modalOpenHandler(modalBasket);
    });
    modalBasketClose.addEventListener('click', modalCloseHandler);
}());
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
        itemsArray.push({
            item: item,
            position: index,
            transform: 0
        });
    });
    var position = {
        getMin: 0,
        getMax: itemsArray.length
    };
    var count = 4;
    // временная переменная для определения количества изображений на адаптиве
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
        if (positionLeftItem + wrapperWidth / itemWidth + count - 1 >= position.getMax) {
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
    });    // buttonLeft.addEventListener('click', function () {
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