
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; 
    });
    
    const menuLinks = mobileMenuOverlay.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});


// Карусель - свайпер для главной страницы (после header)
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.mySwiper', {
        loop: true,

        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        on: {
            init() {
                const bg = this.slides[this.activeIndex].dataset.bg;
                if (bg) {
                    this.el.style.backgroundImage = `url(${bg})`;
                }
            },
            slideChange() {
                const bg = this.slides[this.activeIndex].dataset.bg;
                if (bg) {
                    this.el.style.backgroundImage = `url(${bg})`;
                }
            }
        }
    });
});




// Логика для блоков каталога

document.addEventListener("DOMContentLoaded", () => {

  const loadMoreBtn = document.querySelector(".load-more");
  const products = document.querySelectorAll(".group-products .products");

  if (!loadMoreBtn) return;

  let expanded = false;

  function updateProducts() {
    products.forEach((product, index) => {

      if (window.innerWidth <= 600) {

        if (!expanded && index >= 4) {
          product.classList.add("hidden-mobile");
        } else {
          product.classList.remove("hidden-mobile");
        }

      } else {
        product.classList.remove("hidden-mobile");
      }

    });

    if (window.innerWidth <= 600) {
      loadMoreBtn.style.display = "block";
      loadMoreBtn.textContent = expanded ? "Свернуть" : "Загрузить еще";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }

  loadMoreBtn.addEventListener("click", () => {
    expanded = !expanded;
    updateProducts();
  });

  window.addEventListener("resize", updateProducts);

  updateProducts();
});


// Этапы работы - раскрытие этапов

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn-arrow");
    const blocks = document.querySelectorAll(".block");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            const currentBlock = button.closest(".block");
            const isActive = currentBlock.classList.contains("active");

            blocks.forEach(block => block.classList.remove("active"));

            if (!isActive) {
                currentBlock.classList.add("active");
            }
        });
    });
});


// свайпер для Галереи с производства

document.addEventListener('DOMContentLoaded', function() {

    const isMobile = window.innerWidth <= 500;
    
    if (isMobile) {
        return;
    }

    const swiper = new Swiper('.gallery-swiper', {

        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,

        speed: 500,

        allowTouchMove: true,
        
        navigation: {
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev', 
        },

        pagination: {
            el: '.swiper-pagination', 
        },
        
        on: {
            slideChange: function () {
                updateCustomUI(this.activeIndex);
            },
        },
    });


    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');


    function updateCustomUI(activeIndex) {

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
            dot.classList.toggle('swiper-pagination-bullet-active', index === activeIndex); 
        });

        if (prevBtn) prevBtn.classList.toggle('disabled', activeIndex === 0);
        if (nextBtn) nextBtn.classList.toggle('disabled', activeIndex === dots.length - 1);
    }


    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!prevBtn.classList.contains('disabled')) {
                swiper.slidePrev();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!nextBtn.classList.contains('disabled')) {
                swiper.slideNext();
            }
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            swiper.slideTo(index);
        });
    });

    updateCustomUI(0);
});



// свайпер для отзывов

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.reviews-track');
    const reviews = document.querySelectorAll('.review');
    const dots = document.querySelectorAll('.btn-arrow-main-8 .dot');
    const leftBtn = document.querySelector('.btn-arrow-main-8 .one-left');
    const rightBtn = document.querySelector('.btn-arrow-main-8 .arrow.right').parentElement;
    const moreReviewsBtn = document.querySelector('.btn-basic');

    const isDesktop = window.innerWidth > 500;

    if (isDesktop) {
        if (!track || reviews.length === 0 || !leftBtn || !rightBtn) {
            console.error("Ошибка: не найдены необходимые элементы для слайдера.");
            return;
        }

        const reviewWidth = 440;
        const gap = 20;
        const visibleColumns = 3;
        const rows = 2;

        const slideDistance = reviewWidth + gap;
        const totalReviews = reviews.length;
        const columnsCount = Math.ceil(totalReviews / rows);
        const maxSlide = Math.max(0, columnsCount - visibleColumns);
        let currentSlide = 0;

        function updateSlider() {
            track.style.transform = `translateX(-${currentSlide * slideDistance}px)`;
            dots.forEach((dot, index) => {
                if (index < columnsCount) {
                    dot.style.display = 'block';
                    dot.classList.toggle('active', index === currentSlide);
                } else {
                    dot.style.display = 'none';
                }
            });

            leftBtn.classList.toggle('disabled', currentSlide === 0);
            rightBtn.classList.toggle('disabled', currentSlide >= maxSlide);
        }

        rightBtn.addEventListener('click', () => {
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSlider();
            }
        });

        leftBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index <= maxSlide) {
                    currentSlide = index;
                    updateSlider();
                }
            });
        });

        updateSlider();

    } else {
        if (!track || !moreReviewsBtn) {
            console.error("Ошибка: не найдены элементы для мобильной версии.");
            return;
        }

        moreReviewsBtn.addEventListener('click', () => {
            const isShowingAll = track.classList.contains('show-all-reviews');

            if (isShowingAll) {
                track.classList.remove('show-all-reviews');
                moreReviewsBtn.textContent = 'Больше отзывов';
                track.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                track.classList.add('show-all-reviews');
                moreReviewsBtn.textContent = 'Скрыть отзывы';
            }
        });
    }
});


// Карусель картинок для товара

document.addEventListener("DOMContentLoaded", function () {
    const thumbsSwiper = new Swiper(".thumbsSwiper", {
        direction: "vertical",
        slidesPerView: 4,
        spaceBetween: 10,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".thumbs-next",
            prevEl: ".thumbs-prev",
        },
        breakpoints: {
            0: {
                direction: "horizontal",
                slidesPerView: 3,
            },
            901: {
                direction: "vertical",
                slidesPerView: 4,
            }
        }
    });

    const mainSwiper = new Swiper(".mainSwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        effect: "slide",
        thumbs: {
            swiper: thumbsSwiper
        },
        pagination: {
            el: ".mobile-pagination",
            clickable: true,
        },

        breakpoints: {
            0: {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 20,
            },
            501: {
                slidesPerView: 1,
                centeredSlides: false,
            }
        }
    });
});