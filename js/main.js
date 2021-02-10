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
    var modalBasketOpen = document.querySelectorAll('.modal-open--basket');
    var modalBasket = document.querySelector('.modal--basket');
    var modalBasketClose = document.querySelector('.modal__close--basket');
    var modalFilterOpen = document.querySelector('.catalog__filter-button');
    var modalFilter = document.querySelector('.filter');
    var modalFilterClose = document.querySelector('.filter__modal-close');
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
            document.querySelector('.modal-show').classList.remove('modal-show');
            document.querySelector('.overlay').remove();
            document.removeEventListener('keydowm', escapeClickHandler);
            if (modalFilter && modalFilterClose) {
                modalFilter.classList.remove('filter--modal-open');
            }
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
        modal.classList.add('modal-show');
        createOverlay();
        setVisible(true);
    };
    var modalCloseHandler = function (evt) {
        evt.preventDefault();
        setVisible(false);
    };
    if (modalLoginOpen && modalLogin) {
        modalLoginOpen.addEventListener('click', function (evt) {
            evt.preventDefault();
            modalOpenHandler(modalLogin);
            email.focus();
            if (emailStorage) {
                email.value = emailStorage;
            }
        });
    }
    if (modalLoginClose) {
        modalLoginClose.addEventListener('click', modalCloseHandler);
    }
    if (loginForm) {
        loginForm.addEventListener('submit', function (evt) {
            if (!email.value) {
                evt.preventDefault();
            } else {
                if (isStorage) {
                    localStorage.setItem('emailStorage', email.value);
                }
            }
        });
    }
    if (modalBasketOpen && modalBasket) {
        for (var i = 0; i < modalBasketOpen.length; i++) {
            modalBasketOpen[i].addEventListener('click', function (evt) {
                evt.preventDefault();
                modalOpenHandler(modalBasket);
            });
        }
    }
    if (modalBasketClose) {
        modalBasketClose.addEventListener('click', modalCloseHandler);
    }
    if (modalFilterOpen && modalFilter) {
        modalFilterOpen.addEventListener('click', function (evt) {
            evt.preventDefault();
            modalOpenHandler(modalFilter);
            modalFilter.classList.add('filter--modal-open');
        });
    }
    if (modalFilterClose) {
        modalFilterClose.addEventListener('click', modalCloseHandler);
    }
}());
// слайдер
(function () {
    var PictureCount = {
        DESKTOP: 4,
        TABLET: 2
    };
    var mobile = window.matchMedia('(max-width: 767px)');
    var tablet = window.matchMedia('(max-width: 1023px)');
    var list = document.querySelector('.slider__list');
    var items = document.querySelectorAll('.slider__item');
    var buttonLeft = document.querySelector('.slider__button--left');
    var buttonRight = document.querySelector('.slider__button--right');
    var wrapperWidth;
    // вычисляемая под конкретное разрешение ширина контейнера
    var itemWidth;
    // вычисляемая под конкретное разрешение ширина 1 слайда
    var positionLeftItem = 0;
    var transform = 0;
    var step;
    // шаг
    var itemsArray = [];
    var startX = 0;
    // для мобильного тача - начало перемещения
    if (items) {
        items.forEach(function (item, index) {
            itemsArray.push({
                item: item,
                position: index,
                transform: 0
            });
        });
    }
    var position = {
        getMin: 0,
        getMax: itemsArray.length - 1
    };
    var count;
    // временная переменная для определения количества изображений на адаптиве
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
        } else {
            positionLeftItem = positionLeftItem + count;
            transform -= step * count;
            list.style.transform = 'translateX(' + transform + '%)';
        }
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