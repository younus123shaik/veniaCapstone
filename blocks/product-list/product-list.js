export default async function decorate(block) {
    let url = block.closest('.product-list').querySelector('a');
    const response = await fetch(url.href);
    const cardsData = await response.json();
    const productCards = cardsData?.data?.filter(card => card.template === "products");
    const productCarousel = block.closest(".product-list");
    
    // Clear existing content and add Swiper classes
    productCarousel.innerHTML = `
        <div class="swiper-wrapper"></div>
        <div class="swiper-pagination"></div>
    `;
    
    // Reference the new wrapper
    const swiperWrapper = productCarousel.querySelector(".swiper-wrapper");
    
    // Generate HTML for each card from JSON data
    productCards?.forEach(card => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide"); // Add Swiper class
        slide.innerHTML = `
            <div class="card">
                <img data-url="${card.path}" src="${card.image}" alt=${card.title}/>
                <div class="card-discription">
                    <p>${card.title}</p>
                    <p><span>$</span>${Number(card.price).toFixed(2)}</p>
                    <div>
                        <button class="button-buy">
                            <span>
                                ADD TO CART
                            </span>
                        </button>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });
    
    listenEvents(block);
    initializeSwiper();    
}

function listenEvents(block) {
    block.querySelectorAll('.card img').forEach((cardImg) => {
        cardImg.addEventListener('click', () => [
            window.open(`${cardImg.dataset.url}`, '_blank')
        ])
    });
}

function initializeSwiper() {
    var swiper = new Swiper(".product-list", {
        slidesPerView: 5,
        slidesPerGroup: 5,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            900: { slidesPerView: 5, slidesPerGroup: 5 },
            800: { slidesPerView: 4, slidesPerGroup: 4 },
            500: { slidesPerView: 3, slidesPerGroup: 3 },
            300: { slidesPerView: 2, slidesPerGroup: 2 },
        },
    });
}

