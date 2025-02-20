export default function decorate(block) {
    block.closest('div').firstElementChild.classList.add('hero-slider');
    block.closest('div').lastElementChild.classList.add('hero-slider');    
    $(document).ready(function(){
        $(".hero-carousel").slick({
            slidesToShow: 1, 
            slidesToScroll: 1,
            autoplaySpeed: 2000,
            dots: true,
        });
    });
}

