export default function decorate(block) {
// Add Swiper classes dynamically
block.classList.add('swiper');
block.closest('div').firstElementChild.classList.add('hero-slider', 'swiper-slide');
block.closest('div').lastElementChild.classList.add('hero-slider', 'swiper-slide');

const wrapper = document.createElement('div');
wrapper.classList.add('swiper-wrapper');

wrapper.append(block.closest('div').firstElementChild)
wrapper.append(block.closest('div').lastElementChild)
block.append(wrapper);
// Add Swiper pagination & navigation elements
const pagination = document.createElement('div');
pagination.classList.add('swiper-pagination');
block.appendChild(pagination);

    new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}


