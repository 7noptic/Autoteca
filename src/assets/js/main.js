'use script';

import jQuery from 'jquery';
import $ from 'jquery';
import Swiper, { Navigation, Pagination } from 'swiper';
import MatchHeight from 'matchheight';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

window.addEventListener('DOMContentLoaded', () => {
    const bestsellerTabsParent = document.querySelector('.bestseller'),
        catalogBtn = document.querySelector('#catalogBtn'),
        articlesTabsParent = document.querySelector('.articles'),
        reviewsTabsParent = document.querySelector('.reviews'),
        buyOneClickBtn = document.querySelectorAll('.js-buy-one-click');

     /* КАТАЛОГ ТОВАРОВ */
    if (catalogBtn) {
        catalogBtn.addEventListener('click', () => {
            const catalogContent = document.querySelector('.menu-catalog');
            if (!catalogContent.classList.contains('menu-catalog-active')) {
                catalogContent.classList.add('menu-catalog-active');
            } else {
                    catalogContent.classList.remove('menu-catalog-active');
            }

            catalogContent.addEventListener('click', (event) => {
                const target = event.target,
                    submenu = document.querySelectorAll('.submenu-item'),
                    menuLink = document.querySelectorAll('.menu-catalog__link'),
                    menuItem = document.querySelectorAll('.menu-catalog__item'),
                    submenuLink = document.querySelectorAll('.submenu__link'),
                    submenuItem = document.querySelectorAll('.submenu__item'),
                    submenuContent = document.querySelectorAll('.submenu-content');

                if (target && (target.classList.contains('menu-catalog__item') || target.classList.contains('menu-catalog__link'))) {
                    menuItem.forEach((item, i) => {
                        if (target == item) {
                            hideTabsContent(submenu, "submenu-item-active", menuLink, 'menu-catalog__link-active');
                            showTabsContent(i, submenu, "submenu-item-active", menuLink, 'menu-catalog__link-active');
                        }
                    });
                    menuLink.forEach((item, i) => {
                        if (target == item) {
                            hideTabsContent(submenu, "submenu-item-active", menuLink, 'menu-catalog__link-active');
                            showTabsContent(i, submenu, "submenu-item-active", menuLink, 'menu-catalog__link-active');
                        }
                    });
                }
                if (target && (target.classList.contains('submenu__item') || target.classList.contains('submenu__link'))) {
                    submenuLink.forEach((item, i) => {
                        if (target == item) {
                            hideTabsContent(submenuContent, "submenu-content-active", submenuLink, 'submenu__link-active');
                            showTabsContent(i, submenuContent, "submenu-content-active", submenuLink, 'submenu__link-active');
                        }
                    });
                    submenuItem.forEach((item, i) => {
                        if (target == item) {
                            hideTabsContent(submenuContent, "submenu-content-active", submenuLink, 'submenu__link-active');
                            showTabsContent(i, submenuContent, "submenu-content-active", submenuLink, 'submenu__link-active');
                        }
                    });

                }
            });
        });
    }
    /* ТАБЫ
    if (bestsellerTabsParent) {
        const bestsellerTabs = document.querySelectorAll('.bestseller__sort'),
            bestsellerTabsContent = document.querySelectorAll('.bestseller__item');

        hideTabsContent(bestsellerTabsContent, 'bestseller__item-active', bestsellerTabs, 'bestseller__sort-active');
        showTabsContent(0, bestsellerTabsContent, 'bestseller__item-active', bestsellerTabs, 'bestseller__sort-active');

        bestsellerTabsParent.addEventListener('click', (event) => {
            event.preventDefault();
            showHideTabs(event, 0, bestsellerTabsContent, 'bestseller__item-active', bestsellerTabs, 'bestseller__sort-active', 'bestseller__sort');
        });
    }
    if (articlesTabsParent) {
        const articlesTabsContent = document.querySelectorAll('.articles__item'),
            articlesTabs = document.querySelectorAll('.articles__sort');

        hideTabsContent(articlesTabsContent, 'articles__item-active', articlesTabs, 'articles__sort-active');
        showTabsContent(0, articlesTabsContent, 'articles__item-active', articlesTabs, 'articles__sort-active');
        articlesTabsParent.addEventListener('click', (event) => {
            event.preventDefault();
            showHideTabs(event, 0, articlesTabsContent, 'articles__item-active', articlesTabs, 'articles__sort-active', 'articles__sort');
        });
    }
    if (reviewsTabsParent) {
        const reviewsTabsContent = document.querySelectorAll('.reviews__item'),
            reviewsTabs = document.querySelectorAll('.reviews__sort');

        hideTabsContent(reviewsTabsContent, 'reviews__item-active', reviewsTabs, 'reviews__sort-active');
        showTabsContent(0, reviewsTabsContent, 'reviews__item-active', reviewsTabs, 'reviews__sort-active');
        reviewsTabsParent.addEventListener('click', (event) => {
            event.preventDefault();

            showHideTabs(event, 0, reviewsTabsContent, 'reviews__item-active', reviewsTabs, 'reviews__sort-active', 'reviews__sort');
        });
    }*/
    /* МОДАЛКИ */
    document.addEventListener('click', (event) => {
        const target = event.target,
            modalBuy = document.querySelector('.modal-buy'),
            modalBasket = document.querySelector('.modal-basket'),
            exitBuy = document.querySelector('.modal-buy__exit'),
            exitBasket = document.querySelectorAll('.modal-basket__exit');

        let basketItem = document.querySelectorAll('.modal-basket__item');

        if (target && target.classList.contains('js-buy-one-click')) {
            openModal(modalBuy, 'modal-buy-active');
        } else if (target && target.classList.contains('js-add-to-basket')) {
            openModal(modalBasket, 'modal-basket-active');
        }
        modalBasket.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList.contains('modal-basket__exit'))
                exitBasket.forEach((item, i) => {
                    if (target == item) {
                        basketItem[i].classList.add('animationHide');
                        setTimeout(() => {
                            basketItem[i].parentNode.removeChild(basketItem[i]);
                        }, 500);

                    }
                });
        });
        exitBuy.addEventListener('click', () => {
            closeModal(modalBuy, 'modal-buy-active');
        });

        function openModal(modal, classActive) {
            modal.classList.remove('animationHide');
            modal.classList.add(classActive, 'animationShow');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modal, classActive) {
            modal.classList.add('animationHide');
            modal.classList.remove('animationShow');
            setTimeout(() => {
                modal.classList.remove(classActive);
            }, 500);
            document.body.style.overflow = 'scroll';
        };
    });

    /* ДОБАВИТЬ В КОРЗИНУ */
    function showHideTabs(event, i = 0, content, contentClass, link, linkClass, classCheck) {
        const target = event.target;
        if (target && target.classList.contains(classCheck)) {

            link.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent(content, contentClass, link, linkClass);
                    showTabsContent(i, content, contentClass, link, linkClass);
                }
            });
        }

    }

    function hideTabsContent(content, contentClass, link, linkClass) {
        content.forEach(item => {
            item.classList.remove(contentClass);
        });

        link.forEach(item => {
            item.classList.remove(linkClass);
        });

    }

    function showTabsContent(i = 0, content, contentClass, link, linkClass) {

        content[i].classList.add(contentClass, 'animationShow');
        link[i].classList.add(linkClass, 'animationShow');
    }

    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 10,
        slidesPerGroup: 2,
        loop: true,
        spaceBetween: 20,
        allowSlidePrev: true,
        allowSlideNext: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
    let swiper2 = new Swiper('.swiper-container2', {
        slidesPerView: 4,
        loop: false,
        spaceBetween: 0,
        //Инициализация в табах
        observer: true,
        observeParents: true,

        // Responsive breakpoints
       breakpoints: {

            // when window width is <= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // when window width is <= 480px
           992: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            // when window width is <= 640px
            1630: {
                slidesPerView: 4,
                spaceBetween: 0
            }

    }

    });
    let swiper3 = new Swiper('.swiper-container3', {
        slidesPerView: 4,
        slidesPerColumn: 2,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        // Responsive breakpoints
        breakpoints: {

            // when window width is <= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerColumn: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerColumn: 1,
            },
            // when window width is <= 480px
            992: {
                slidesPerView: 3,
                spaceBetween: 0,
                slidesPerColumn: 2,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 0
            },
            // when window width is <= 640px


        }

    });
    let swiper4 = new Swiper('.swiper-container4', {
        slidesPerView: 3,
        loop: false,
        spaceBetween: 0,
        //Инициализация в табах
        observer: true,
        observeParents: true,

        // Responsive breakpoints
        breakpoints: {

            // when window width is <= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // when window width is <= 480px
            992: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 0
            },


        }

    });
    let swiper5 = new Swiper('.swiper-container5', {
        slidesPerView: 2,
        loop: false,
        spaceBetween: 0,
        //Инициализация в табах
        observer: true,
        observeParents: true,

        // Responsive breakpoints
        breakpoints: {

            // when window width is <= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // when window width is <= 480px
            992: {
                slidesPerView: 2,
                spaceBetween: 0
            },
        }
    });


    /* СЛАЙДЕРЫ
             let mySwiper = new Swiper('.swiper-container', {
                 navigation: {
                     nextEl: '.swiper-button-next',
                     prevEl: '.swiper-button-prev'
                 },
                 nextButton: '.swiper-button-next',
                 prevButton: '.swiper-button-prev',
                 paginationClickable: true,
                 loop: true,
                 spaceBetween: 20,
                 observer: true ,
                 observeParents: true,
                 autoplay: {
                     delay: 5000,
                 },

                 paginationType: "custom",
                 slidesPerView: 'auto',
             });*/


    /*МОДАЛЬНОЕ ОКНО

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        })
    });

    modalCloseBtn.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
/*
    document.addEventListener('keydown', (e) => {
        if (e.code = 'Escape' && modal.classList.contains('modal-buy-active')) {
            modalBuy.classList.add('animationHide');
            modalBuy.classList.remove('animationShow');
            setTimeout(() => {
                modalBuy.classList.remove('modal-buy-active');
            }, 500);
        }
    });

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'scroll';
    };





    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);*/
});