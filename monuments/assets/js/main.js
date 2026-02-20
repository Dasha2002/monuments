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

    const track = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const leftBtn = document.querySelector('.one-left');
    const rightBtn = document.querySelector('.arrow.right').parentElement; 

    if (!track || slides.length === 0 || dots.length === 0 || !leftBtn || !rightBtn) {
        console.error("Ошибка: не найдены необходимые элементы для слайдера.");
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        leftBtn.classList.toggle('disabled', currentSlide === 0);
        rightBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);
    }

    rightBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
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
            currentSlide = index;
            updateSlider();
        });
    });

    updateSlider();
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


