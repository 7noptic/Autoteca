'use script';
import jQuery from 'jquery';
import $ from 'jquery';
import Swiper, {Navigation, Pagination} from 'swiper';

Swiper.use([Navigation, Pagination]);

window.addEventListener('DOMContentLoaded', () => {

    /* RATING */
    let ratingParent = document.querySelector('.js-rating'),
        ratingInput = document.querySelector('#js-rating'),
        ratingStar = document.querySelectorAll('.js-rating > li');

    if (ratingParent) {
        ratingParent.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;
            if (target && target.tagName == 'LI') {
                ratingStar.forEach((item, i) => {
                    item.classList.remove('active');
                });
                for (let i = 0; i => ratingStar.length; i++) {
                    if (ratingStar[i] == target) {
                        ratingStar[i].classList.add('active');
                        ratingInput.value = ++i;
                        return
                    } else {
                        ratingStar[i].classList.add('active');
                    }
                }
            }

        });
    }

    /* BURGER-MENU */
    $(document).ready(function () {
        let subMenuParrent = document.querySelector('.header__nav'),
            cataloglink1 = document.querySelectorAll('.menu-catalog__link'),
            cataloglink2 = document.querySelectorAll('.menu-catalog__sublink'),
            lvl2wrap = document.querySelectorAll('.lvl2-wrap'),
            lvl3wrap = document.querySelectorAll('.lvl3-wrap');
        if ($('.header__burger')) {
            $('.header__burger').click(function (event) {
                event.preventDefault()
                $('.header__burger,.header__nav').toggleClass('active');
                lvl2wrap.forEach(item => {
                    item.classList.remove('active');
                });
                $('html').toggleClass('lock');

            });
        }
        if ($('.js-catalog-btn')) {
            $('.js-catalog-btn').click(function (event) {
                $('.header__burger-catalog,.header__catalog').toggleClass('active');
                $('.header__burger,.header__nav').toggleClass('active');
                lvl2wrap.forEach(item => {
                    item.classList.remove('active');
                });
                lvl3wrap.forEach(item => {
                    item.classList.remove('active');
                });
                $('html').toggleClass('lock');
            });
        }
        /* SUBMENU */
        if (subMenuParrent) {
            subMenuParrent.addEventListener('click', (event) => {
                const target = event.target;
                if (target && target.classList.contains('menu-catalog__link')) {
                    event.preventDefault();
                    cataloglink1.forEach((item, i) => {
                        if (item == target) {
                            hideMenuContent(cataloglink1, lvl2wrap);
                            showMenuContent(i, cataloglink1, lvl2wrap);
                        }
                    });
                }
                if (target && target.classList.contains('menu-catalog__sublink')) {
                    event.preventDefault();
                    cataloglink2.forEach((item, i) => {
                        if (item == target) {
                            hideMenuContent(cataloglink2, lvl3wrap);
                            showMenuContent(i, cataloglink2, lvl3wrap);
                        }
                    });
                }

                function showMenuContent(i = 0, content, link) {
                    content[i].classList.add('active');
                    link[i].classList.add('active');
                }

                function hideMenuContent(content, link) {
                    content.forEach(item => {
                        item.classList.remove('active');
                    });
                    link.forEach(item => {
                        item.classList.remove('active');
                    });
                }

            });
        }

    });

    /* МОДАЛКИ */
    document.addEventListener('click', (event) => {
        const target = event.target,
            modalBuy = document.querySelector('.modal-buy'),
            modalBasket = document.querySelector('.modal-basket'),
            modalEmail = document.querySelector('.modal-email'),
            modalPhone = document.querySelector('.modal-phone'),
            modalPassword = document.querySelector('.modal-password'),
            modalDate = document.querySelector('.modal-date'),
            exitBuy = document.querySelector('.modal-buy__exit'),
            exitEmail = document.querySelector('.modal-email__exit'),
            exitPhone = document.querySelector('.modal-phone__exit'),
            exitPassword = document.querySelector('.modal-password__exit'),
            exitDate = document.querySelector('.modal-date__exit'),
            closeBasket = document.querySelector('.modal-basket__close'),
            exitBasket = document.querySelectorAll('.modal-basket__exit'),
            viewIcon = document.querySelectorAll('.password-control'),
            passwordInput = document.querySelectorAll('.modal-password__input');

        let basketItem = document.querySelectorAll('.modal-basket__item');
        /* открытие модалок */
        if (target && target.classList.contains('js-buy-one-click')) {
            event.preventDefault()

            openModal(modalBuy, 'modal-buy-active');
        } else if (target && target.classList.contains('js-add-to-basket')) {
            event.preventDefault()

            openModal(modalBasket, 'modal-basket-active');
        }
        if (modalEmail) {
            if (target && target.classList.contains('js-useremail')) {
                event.preventDefault();
                openModal(modalEmail, 'active');
            }
        }
        if (modalPhone) {
            if (target && target.classList.contains('js-userphone')) {
                event.preventDefault();
                openModal(modalPhone, 'active');
            }
        }
        if (modalPassword) {
            if (target && target.classList.contains('js-userpassword')) {
                event.preventDefault();
                openModal(modalPassword, 'active');
            }
            /* СКРЫТЬ/УВИДЕТЬ ПАРОЛЬ */
            if (target && target.classList.contains('password-control')) {
                viewIcon.forEach((item, i) => {
                    if (item == target) {
                        if (passwordInput[i].type == 'password') {
                            passwordInput[i].type = 'text';
                            item.classList.add('view');
                        } else {
                            passwordInput[i].type = 'password';
                            item.classList.remove('view');
                        }

                    }
                });
            }
        }
        if (modalDate) {
            if (target && target.classList.contains('js-userdate')) {
                event.preventDefault();
                openModal(modalDate, 'active');
            }

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
        /* закрытие модалок */
        if (exitBuy) {
            exitBuy.addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalBuy, 'modal-buy-active');
            });
        }

        if (exitEmail) {
            exitEmail.addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalEmail, 'active');
            });
            document.querySelector('.js-email-close').addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalEmail, 'active');
            });
        }

        if (exitPhone) {
            exitPhone.addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalPhone, 'active');
            });
            document.querySelector('.js-phone-close').addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalPhone, 'active');
            });
        }

        if (exitPassword) {
            exitPassword.addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalPassword, 'active');
            });
            document.querySelector('.js-pass-close').addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalPassword, 'active');
            });
        }
        if (exitDate) {
            exitDate.addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalDate, 'active');
            });
            document.querySelector('.js-date-close').addEventListener('click', () => {
                event.preventDefault()
                closeModal(modalDate, 'active');
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
            $('html').addClass('lock');
        }

        function closeModal(modal, classActive) {
            modal.classList.add('animationHide');
            modal.classList.remove('animationShow');
            setTimeout(() => {
                modal.classList.remove(classActive);
            }, 500);
            $('html').removeClass('lock');
        };


        /* КНОПКА ПРИМЕНИТЬ В КАТЕГОРИЯХ */
        if (target && target.classList.contains('js-checkbox__label')) {
            let csaccept = document.querySelectorAll('.category-select__accept');
            csaccept.forEach(item => {
                $(item).remove();
            });
            $(target).after(`<a href="" class="btn category-select__accept">ПРИМЕНИТЬ</a>`);

        }
    });


    /* СЛАЙДЕРЫ */
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
        pagination: {
            el: '.swiper-pagination-bestseller',
        },


        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 0
            },
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
    let swiperMore = new Swiper('.swiper-container-more', {
        slidesPerView: 7,
        loop: true,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.more-next',
            prevEl: '.more-prev',
        },
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
    let swiperPost = new Swiper('.swiper-container-post', {
        slidesPerView: 4,
        loop: false,
        spaceBetween: 20,


    });
    let swiperMark = new Swiper('.swiper-container-mark', {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 20,
        allowSlidePrev: true,
        allowSlideNext: true,
        navigation: {
            nextEl: '.mark-next',
            prevEl: '.mark-prev',
        },

    });
    let swiperCase = new Swiper('.swiper-container-case', {
        slidesPerView: 4,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.case-next',
            prevEl: '.case-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            1630: {
                slidesPerView: 4,
                spaceBetween: 0
            }

        }
    });
    let swiperMat = new Swiper('.swiper-container-mat', {
        slidesPerView: 4,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.mat-next',
            prevEl: '.mat-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            1630: {
                slidesPerView: 4,
                spaceBetween: 0
            }

        }
    });
    let swiperAccessory = new Swiper('.swiper-container-accessory', {
        slidesPerView: 4,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.accessory-next',
            prevEl: '.accessory-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            1630: {
                slidesPerView: 4,
                spaceBetween: 0
            }

        }
    });
    let swiperGallery = new Swiper('.swiper-container-gallery', {
        slidesPerView: 4,
        slidesPerColumn: 2,
        loop: false,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
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




    /* СПИСКИ В ФУТЕРЕ */
    let footerMenuParrent = document.querySelector('.footer'),
        footerLink = document.querySelectorAll('.footer-nav__title'),
        footerList = document.querySelectorAll('.footer-nav__list');
    if (footerMenuParrent) {
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
    }


});