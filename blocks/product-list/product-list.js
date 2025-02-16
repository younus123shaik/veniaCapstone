export default async function decorate(block) {
    let url = block.closest('.product-list').querySelector('a');
    const response = await fetch(url.href);
    const cardsData = await response.json();
    console.log(cardsData) // take 5th index
    // block.closest('div').innerHTML = `<img src="https://drive.google.com/thumbnail?id=1TeUTb7rBuXn3NUlA4ieyLRJPxYLt5Qvu"/>`;

    const Productcarousel = block.closest(".product-list");
    block.closest('.product-list').querySelector('div').replaceWith('');

    // Generate HTML for each card from JSON data
    cardsData.data.forEach(card => {
      
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = `
            <div class="card">
                <img src="https://drive.google.com/thumbnail?id=${card.image.split('/')[5]}"/>
                <div class="card-discription">
                <p>${card.name}</p>
                <p><span>$</span>${Number(card.price).toFixed(2)}</p>
                <div>
                <button class="button-buy"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="addToCartButton-icon-ry1 inline stroke-white xs_hidden"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></span></button>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                </div>
            </div>
        </div>
        `;
        Productcarousel.appendChild(slide);
    });

    // Initialize Slick Carousel
    $(document).ready(function(){
        $(".product-list").slick({
            slidesToShow: 5,   // Show 3 cards at a time
            slidesToScroll: 5,
            autoplaySpeed: 2000,
            dots: true,
            // centerMode: true,  // Enable center mode
            // centerPadding: "50px", // Adjust spacing on the sides
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    });
}