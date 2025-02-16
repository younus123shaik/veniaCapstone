export default function decorate(block) {
    block.closest('div').firstElementChild.classList.add('hero-slider');
    block.closest('div').lastElementChild.classList.add('hero-slider');
    // let div = document.createElement('div'); // Create a div element
    // div.innerHTML = `<div class="corusel-btn"><button></button><button></button></div>`; // Set content
    // block.parentElement.append(div); // Append to block's parent
    
    $(document).ready(function(){
        $(".hero-carousel").slick({
            slidesToShow: 1,   // Show 3 cards at a time
            slidesToScroll: 1,
            autoplaySpeed: 2000,
            dots: true,
            // centerMode: true,  // Enable center mode
            // centerPadding: "50px", // Adjust spacing on the sides
        });
    });
}

