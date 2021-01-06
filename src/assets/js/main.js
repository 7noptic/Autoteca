'use script';
import jQuery from 'jquery';
import $ from 'jquery';
import Swiper, {Navigation, Pagination} from 'swiper';
Swiper.use([Navigation, Pagination]);

window.addEventListener('DOMContentLoaded', () => {

    /* BURGER-MENU */
    $(document).ready(function () {
        $('.header__burger').click(function (event) {
            event.preventDefault()
            $('.header__burger,.header__nav').toggleClass('active');
            $('html').toggleClass('lock');
        });
        $('.js-catalog-btn').click(function (event) {
            $('.header__burger-catalog,.header__catalog').toggleClass('active');
            $('html,body,main').toggleClass('lock');
        });

    });
    let subMenuParrent = document.querySelector('.header__nav'),
        cataloglink1 = document.querySelectorAll('.menu-catalog__link'),
        cataloglink2 = document.querySelectorAll('.menu-catalog__sublink'),
        lvl2wrap = document.querySelectorAll('.lvl2-wrap'),
        lvl3wrap = document.querySelectorAll('.lvl3-wrap');

    subMenuParrent.addEventListener('click', (event) => {

        const target = event.target;
        if (target && target.classList.contains('menu-catalog__link')) {
            event.preventDefault();
            cataloglink1.forEach((item, i) => {

                if (item == target) {
                    target.classList.toggle('active');
                    lvl2wrap[i].classList.toggle('active');
                }
            });
        }
        if (target && target.classList.contains('menu-catalog__sublink')) {
            event.preventDefault();
            cataloglink2.forEach((item, i) => {
                if (item == target) {
                    lvl3wrap[i].classList.toggle('active');
                }
            });
        }
    });


    /* МОДАЛКИ */
    document.addEventListener('click', (event) => {
        const target = event.target,
            modalBuy = document.querySelector('.modal-buy'),
            modalBasket = document.querySelector('.modal-basket'),
            exitBuy = document.querySelector('.modal-buy__exit'),
            closeBasket = document.querySelector('.modal-basket__close'),
            exitBasket = document.querySelectorAll('.modal-basket__exit');

        let basketItem = document.querySelectorAll('.modal-basket__item');

        if (target && target.classList.contains('js-buy-one-click')) {
            event.preventDefault()

            openModal(modalBuy, 'modal-buy-active');
        } else if (target && target.classList.contains('js-add-to-basket')) {
            event.preventDefault()

            openModal(modalBasket, 'modal-basket-active');
        }
        if (modalBasket) {
            modalBasket.addEventListener('click', (event) => {
                event.preventDefault()
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
        }

        if (exitBuy) {
            exitBuy.addEventListener('click', () => {
                event.preventDefault()

                closeModal(modalBuy, 'modal-buy-active');
            });
        }
        if (closeBasket) {
            closeBasket.addEventListener('click', () => {
                event.preventDefault()

                closeModal(modalBasket, 'modal-basket-active');
            });
        }


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


    document.addEventListener('click', (event) => {
        const target = event.target;
        let i = 0;
        if (target && target.classList.contains('js-checkbox__label')) {
            let huita = document.querySelectorAll('.category-select__accept');
            huita.forEach(item => {
                $(item).remove();
            });
            $(target).after(`<a href="" class="btn category-select__accept">ПРИМЕНИТЬ</a>`);

        }
    });
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 20,
        allowSlidePrev: true,
        allowSlideNext: true,
        navigation: {
            nextEl: '.category-next',
            prevEl: '.category-prev',
        },

    });
    let swiperBestseller = new Swiper('.swiper-container-bestseller', {
        slidesPerView: 4,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.bestseller-next',
            prevEl: '.bestseller-prev',
        },

        breakpoints: {

            // when window width is <= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // when window width is <= 480px
            768: {
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
    let swiperMaterial = new Swiper('.swiper-container-material', {
        slidesPerView: 4,
        slidesPerColumn: 2,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '#material-next',
            prevEl: '#material-prev',
        },
        breakpoints: {
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
            992: {
                slidesPerView: 3,
                spaceBetween: 0,
                slidesPerColumn: 2,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 0
            },
        }
    });
    let swiperArticles = new Swiper('.swiper-container-articles', {
        slidesPerView: 3,
        loop: false,
        spaceBetween: 0,
        //Инициализация в табах
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.articles-next',
            prevEl: '.articles-prev',
        },
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
    let swiperVideoReviews = new Swiper('.swiper-container-videoreviews', {
        slidesPerView: 3,
        loop: false,
        spaceBetween: 0,
        //Инициализация в табах
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.videoreviews-next',
            prevEl: '.videoreviews-prev',
        },
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
    let swiperReviews = new Swiper('.swiper-container-reviews', {
        slidesPerView: 2,
        loop: false,
        spaceBetween: 0,
        //Инициализация в табах
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.reviews-next',
            prevEl: '.reviews-prev',
        },
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
    let swiperDashboard = new Swiper('.swiper-container-dashboard', {
        slidesPerView: 2,
        slidesPerColumn: 2,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination-dashboard',
        },
        // Responsive breakpoints
        breakpoints: {

            // when window width is <= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerColumn: 1,
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerColumn: 1,
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 0,
                slidesPerColumn: 1,
            },
            // when window width is <= 480px
            992: {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerColumn: 2,
            },

            // when window width is <= 640px


        }

    });
    let swiper7 = new Swiper('.swiper-container7', {
        slidesPerView: 7,
        loop: true,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        // Responsive breakpoints
        breakpoints: {

            // when window width is <= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            // when window width is <= 480px
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },

            // when window width is <= 640px
            1200: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            1630: {
                slidesPerView: 6,
                spaceBetween: 20,
            },

        }

    });
    let swiperpost = new Swiper('.swiper-container-post', {
        slidesPerView: 4,
        loop: false,
        spaceBetween: 20,


    });
    /* списки в футере*/

    let footerMenuParrent = document.querySelector('.footer'),
        footerLink = document.querySelectorAll('.footer-nav__title'),
        footerList = document.querySelectorAll('.footer-nav__list');

    footerMenuParrent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('footer-nav__title')) {
            event.preventDefault();
            footerLink.forEach((item, i) => {
                if (item == target) {
                    target.classList.toggle('active');
                    footerList[i].classList.toggle('active');
                }
            });
        }

    });


    /* ДОБАВИТЬ В КОРЗИНУ
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
   }*/
    /*if (catalogBtn) {
            catalogBtn.addEventListener('click', (event) => {
                console.log(event.target);

            });
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
        }*/
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
});