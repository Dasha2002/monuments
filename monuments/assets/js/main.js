
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
    const swiperContainer = document.querySelector('.mySwiper');
    if (!swiperContainer) return;

    const swiper = new Swiper('.mySwiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.mySwiper .swiper-pagination',
            clickable: true,
    },
});
});




// Логика для блоков каталога

document.addEventListener("DOMContentLoaded", () => {

    const loadMoreBtn = document.querySelector(".load-more");
    const products = document.querySelectorAll(".group-products .products");

    if (loadMoreBtn) {
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

            if (products.length > 4 && window.innerWidth <= 600) {
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
    }


    const productCards = document.querySelectorAll('.granite-3 .group-products .products');

    productCards.forEach(card => {
        const button = card.querySelector('.expandable-content .add-to-cart');
        
        if (button) {
            const btnTextSpan = button.querySelector('.btn-text');
            const originalText = btnTextSpan.textContent;

            card.addEventListener('mouseenter', () => {
                btnTextSpan.textContent = 'В корзину';
                button.classList.add('is-active');
            });

            card.addEventListener('mouseleave', () => {
                btnTextSpan.textContent = originalText;
                button.classList.remove('is-active');
            });
        }
    });
});




// Этапы работы - раскрытие этапов

document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(".block");

    blocks.forEach(block => {
        block.addEventListener("click", (e) => {
            if (e.target.closest('.block-content')) {
                return;
            }

            const currentBlock = e.currentTarget; 
            const isActive = currentBlock.classList.contains("active");

            blocks.forEach(otherBlock => {
                if (otherBlock !== currentBlock) {
                    otherBlock.classList.remove("active");
                }
            });
            if (!isActive) {
                currentBlock.classList.add("active");
            } else {
                currentBlock.classList.remove("active");
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
            el: '.mySwiper .swiper-pagination',
            clickable: true,
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


// Свайпер для товаров - под карточкой товаров

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.product-swiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            900: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 40,
            },
        }
    });
});







document.addEventListener('DOMContentLoaded', function() {
    const statusDropdown = document.querySelector('.status');
    const toggleButton = statusDropdown.querySelector('.dropdown-toggle');
    const activText = statusDropdown.querySelector('.activ');
    const menu = statusDropdown.querySelector('.dropdown-menu');
    const menuItems = menu.querySelectorAll('a');

    function toggleMenu() {
        const isOpen = statusDropdown.classList.contains('is-active');
        
        if (isOpen) {
            statusDropdown.classList.remove('is-active');
            toggleButton.setAttribute('aria-expanded', 'false');
        } else {
            statusDropdown.classList.add('is-active');
            toggleButton.setAttribute('aria-expanded', 'true');
        }
    }

    
    statusDropdown.addEventListener('click', function(event) {

        if (event.target.closest('.dropdown-toggle') || event.target === activText) {
            event.preventDefault(); 
            toggleMenu();
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const selectedText = this.textContent; 
            activText.textContent = selectedText; 
            
            toggleMenu(); 
        });
    });

    document.addEventListener('click', function(event) {
        if (!statusDropdown.contains(event.target)) {
            statusDropdown.classList.remove('is-active');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
});



    const filterButton = document.querySelector('.btn-filter');

 
    if (filterButton) {

        filterButton.addEventListener('click', function() {

            this.classList.toggle('active');
        });
    }



document.addEventListener("DOMContentLoaded", () => {
    initCart();
    initCatalog();
});


// Корзина

function initCart() {
    const productContainer = document.querySelector('.product-block');

    if (!productContainer) return;

    document.querySelectorAll('.product').forEach(product => {
        const priceEl = product.querySelector('.price-two');
        if (priceEl) {
            const basePrice = getNumber(priceEl.textContent);
            product.dataset.basePrice = basePrice;
        }
    });

    productContainer.addEventListener('click', (e) => {


        if (e.target.closest('.btn-delete')) {
            const product = e.target.closest('.product');
            product.remove();
            updateCartSummary();
        }

        if (e.target.classList.contains('plus')) {
            const product = e.target.closest('.product');
            changeQuantity(product, 1);
        }

        if (e.target.classList.contains('minus')) {
            const product = e.target.closest('.product');
            changeQuantity(product, -1);
        }

    });

    updateCartSummary();
}


function changeQuantity(product, delta) {
    const numberEl = product.querySelector('.number');
    let quantity = parseInt(numberEl.textContent);

    quantity += delta;
    if (quantity < 1) quantity = 1;

    numberEl.textContent = quantity;

    updateProductPrice(product, quantity);
    updateCartSummary();
}

function updateProductPrice(product, quantity) {
    const basePrice = parseInt(product.dataset.basePrice);
    const priceEl = product.querySelector('.price-two');

    const newPrice = basePrice * quantity;
    priceEl.textContent = formatPrice(newPrice) + ' ₽';
}

function updateCartSummary() {
    const products = document.querySelectorAll('.product');

    let totalQuantity = 0;
    let totalPrice = 0;

    products.forEach(product => {
        const quantity = parseInt(product.querySelector('.number').textContent);
        const basePrice = parseInt(product.dataset.basePrice);

        totalQuantity += quantity;
        totalPrice += basePrice * quantity;
    });

    const quantityEl = document.querySelector('.block-quantity .quantity');
    if (quantityEl) quantityEl.textContent = totalQuantity;

    document.querySelectorAll('.quantity-price').forEach(el => {
        el.textContent = formatPrice(totalPrice) + ' ₽';
    });

    updateCartIcon(totalQuantity);
}


function addToCart(productCard) {

    const name = productCard.querySelector('.product-heading').textContent;
    const priceText = productCard.querySelector('.price-new').textContent;
    const image = productCard.querySelector('img').src;

    const basePrice = getNumber(priceText);

    const container = document.querySelector('.product-block');
    if (!container) return;

    const existingProduct = [...document.querySelectorAll('.product')]
        .find(p => p.querySelector('.heading-product').textContent === name);

    if (existingProduct) {
        changeQuantity(existingProduct, 1);
        showNotification('Количество увеличено');
        return;
    }

    const product = document.createElement('div');
    product.className = 'product';
    product.dataset.basePrice = basePrice;

    product.innerHTML = `
        <div class="img"><img src="${image}"></div>
        <div class="inf-product">
            <div class="inf-one">
                <div class="heading">
                    <h2 class="heading-product">${name}</h2>
                </div>
                <div class="delete">
                    <button class="btn-delete">×</button>
                </div>
            </div>
            <div class="inf-two">
                <div class="counter">
                    <div class="one">
                        <button class="minus">-</button>
                        <div class="number">1</div>
                        <button class="plus">+</button>
                    </div>
                    <p>шт</p>
                </div>
                <div class="price">
                    <p class="price-one">Цена: </p>
                    <div class="price-two">${formatPrice(basePrice)} ₽</div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(product);

    updateCartSummary();
    showNotification('Товар добавлен в корзину');
}

function initCatalog() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.products');
            addToCart(card);
        });
    });
}

function updateCartIcon(quantity) {
    const icon = document.querySelector('.icon-link');
    if (!icon) return;

    const oldCounter = icon.querySelector('.cart-counter');
    if (oldCounter) oldCounter.remove();

    if (quantity > 0) {
        const counter = document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = quantity;
        icon.appendChild(counter);
    }
}

function getNumber(str) {
    return parseInt(str.replace(/\s/g, '').replace('₽', ''));
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function showNotification(message) {
    let notification = document.querySelector('.notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}



// popap блок

document.addEventListener('DOMContentLoaded', function() {
    const orderButton = document.querySelector('.making .btn-basic'); // Кнопка "Оформить заказ"
    const popup = document.querySelector('.popap');
    const closeButtonContainer = popup.querySelector('.close'); 
    const mainPageButton = popup.querySelector('.btn-main-popap'); // Кнопка "На главную"
    const body = document.body;

    function openPopup() {
        popup.classList.add('popup-visible');
        body.classList.add('body-no-scroll');
    }

    function closePopup() {
        popup.classList.remove('popup-visible');
        body.classList.remove('body-no-scroll');
    }

    if (orderButton) {
        orderButton.addEventListener('click', function(event) {
            event.preventDefault();
            openPopup();
        });
    }

    if (closeButtonContainer) {
        closeButtonContainer.addEventListener('click', closePopup);
    }

    if (mainPageButton) {
        mainPageButton.addEventListener('click', closePopup);
    }

    popup.addEventListener('click', function(event) {
        if (event.target === popup.querySelector('.popap-overlay')) {
            closePopup();
        }
    });
});





document.addEventListener("DOMContentLoaded", () => {
    const productImages = document.querySelectorAll('.img-product');

    productImages.forEach(image => {
        image.addEventListener('click', () => {

            const productId = image.dataset.productId; 

            if (productId) {
                
                window.location.href = `product.php?id=${productId}`;
            } else {
                window.location.href = 'product.php';
            }
        });
    });
});