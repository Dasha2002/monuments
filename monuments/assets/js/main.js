
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
            el: '.main-7-gallery .swiper-pagination',
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

    const isMobile = window.innerWidth <= 500;
    if (isMobile) return;

    const rows = 2;
    const reviews = document.querySelectorAll('.main-8 .review');
    const totalColumns = Math.ceil(reviews.length / rows);

    const swiper = new Swiper('.main-8-swiper', {

        slidesPerView: 3,
        spaceBetween: 20,
        speed: 500,
        loop: false,
        allowTouchMove: true,

        grid: {
            rows: 2,
            fill: 'row'
        },

        navigation: {
            nextEl: '.main-8 .right-btn-container',
            prevEl: '.main-8 .one-left',
        },

        pagination: {
            el: '.main-8 .dots',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="dot ${className}"></span>`;
            }
        }

    });

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
            el: '.main-8-swiper .swiper-pagination',
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
    // Работа с кнопкой фильтра
    const filterButton = document.querySelector('.btn-filter');
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Если нужно показывать/скрывать блок фильтров
            const filterBlock = document.querySelector('.filter-two');
            if (filterBlock) {
                filterBlock.classList.toggle('active');
            }
        });
    }
    
    // Работа с кнопками сортировки
    const sortButtons = document.querySelectorAll('.filter-two > div');
    
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем класс active у всех кнопок
            sortButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем класс active к нажатой кнопке
            this.classList.add('active');
            
            // Здесь можно добавить логику сортировки товаров
            const sortType = this.classList.contains('default') ? 'default' :
                           this.classList.contains('popular') ? 'popular' :
                           this.classList.contains('inexpensive') ? 'inexpensive' :
                           this.classList.contains('expensive') ? 'expensive' : 'default';
            
            console.log('Выбран тип сортировки:', sortType);
            // Здесь можно вызвать функцию сортировки товаров
            // sortProducts(sortType);
        });
    });
    
    // Инициализация корзины и каталога
    if (typeof initCart === 'function') initCart();
    if (typeof initCatalog === 'function') initCatalog();
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
    const popup = document.querySelector('.popap');

    if (popup) {
        const body = document.querySelector('body'); 
        const orderButton = document.querySelector('.making .btn-basic'); 
        const closeButtonContainer = popup.querySelector('.close'); 
        const mainPageButton = popup.querySelector('.btn-main-popap'); 
        const overlay = popup.querySelector('.popap-overlay');

        function openPopup() {
            if (body) {
                popup.classList.add('popup-visible');
                body.classList.add('body-no-scroll');
            }
        }

        function closePopup() {
            if (body) {
                popup.classList.remove('popup-visible');
                body.classList.remove('body-no-scroll');
            }
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

        if (overlay) {
            overlay.addEventListener('click', function(event) {
                if (event.target === overlay) {
                    closePopup();
                }
            });
        }
    } else {
    }
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



// Чтобы браузер не ругалься на id 
document.addEventListener('DOMContentLoaded', function() {
    const productBlocks = document.querySelectorAll('.products');

    productBlocks.forEach((block, index) => {
        const selects = block.querySelectorAll('select');

        selects.forEach(select => {
            const originalId = select.id; 
            
            if (originalId) {

                const uniqueId = `${originalId}-${index + 1}`; 
                select.id = uniqueId;
                
                const label = select.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.setAttribute('for', uniqueId);
                }
            }
        });
    });
});