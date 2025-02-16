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
                <h3>${card.name}</h3>

                <p>${card.price}</p>
               
            </div>
        `;
        Productcarousel.appendChild(slide);
    });

    // Initialize Slick Carousel
    $(document).ready(function(){
        $(".product-list").slick({
            slidesToShow: 2,   // Show 3 cards at a time
            slidesToScroll: 1,
            autoplaySpeed: 2000,
            arrows: true,
            dots: true,
            // centerMode: true,  // Enable center mode
            // centerPadding: "50px", // Adjust spacing on the sides
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    });
}