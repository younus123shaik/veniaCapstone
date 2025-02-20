const isTablet = window.matchMedia("(max-width: 800px)");
export default function decorate(block) {
  block.closest(".productfulldetails").innerHTML =
    '<form class="product-form"></form>';
  block.querySelector(".product-form").innerHTML = `
    ${createSection("image")}
    ${createSection("title")}
    ${createSection("options")}
    ${createSection("quantity")}
    ${createSection("cart")}
    ${createSection("description")}
    ${createSection("details")}
    `;
  block.querySelector(".image").innerHTML = `
    ${createSwiper("thumb")}
    <div class="main-image">
        <img id="main-display" src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd06-mt_main.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover" alt="Main Image">
    </div>`;

  connectSwiper();

   loadContent(block);

}

function loadContent(block) {
    block.querySelector(
        ".title"
      ).innerHTML = `Felicia Maxi Dress <span class="amount">$102.40</span>`;
      block.querySelector(
        ".options"
      ).innerHTML = `${createOptionColor()} ${createOptionSize()}`;
      block.querySelector(".quantity").innerHTML = `${createQuantity()}`;
      block.querySelector(".cart").innerHTML = `${createAddToCartBtn()}`;
      block.querySelector(".description").innerHTML = `${createDescription()}`;
      block.querySelector(".details").innerHTML = `${createDetails()}`;
      listenEvents(block);
}

function createSection(className) {
  return `<section class="${className}"></section>`;
}

function checkDecrement(block) {
    if (parseInt(block.querySelector('.quantity-count').innerText) <= 1 ) {
        block.querySelector('.decrement').disabled = true;
    } else {
        block.querySelector('.decrement').disabled = false;
    }
}

function createSwiper(className) {
  return `<div class="swiper-container ${className}-swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd06-mt_main.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover" alt="Image 1"></div>
        <div class="swiper-slide"><img src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd06-mt_alt.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover" alt="Image 2"></div>
        <div class="swiper-slide"><img src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd06-mt_back.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover" alt="Image 3"></div>
        <div class="swiper-slide"><img src="https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/v/d/vd06_look.jpg?auto=webp&format=pjpg&width=960&height=1200&fit=cover" alt="Image 2"></div>
    </div>
</div>`;
}

function createOptionColor() {
  return `<div class="color-wrapper">
        <div>Fashion Color</div>
        <div>
        <button type='button' value='Peach'><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><polyline points="20 6 9 17 4 12"></polyline></svg></span></button>
        <button type='button' value='Rain'><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><polyline points="20 6 9 17 4 12"></polyline></svg></span></button>
        <button type='button' value='Lalic'><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><polyline points="20 6 9 17 4 12"></polyline></svg></span></button>
        <button type='button' value='Mint'><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><polyline points="20 6 9 17 4 12"></polyline></svg></span></button>
        </div>
        <div>Selected Fashion Color: <span class='selected-color'> None</span></div>
    </div>`;
}

function createOptionSize () {
    return `<div class='size-wrapper'>
    <div>Fashion Size</div>
    <div>
        <button type='button'><span>X</span></button>
        <button type='button'><span>XS</span></button>
        <button type='button'><span>M</span></button>
        <button type='button'><span>L</span></button>
    </div>
    <div>Selected Fashion Size: <span class='selected-size'> None</span></div>
    </div>`
}

function createQuantity() {
  return `<div class="quantity-wrapper">
        <div>Quantity</div>
        <div>
        <button class="decrement" type='button'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
        <span class='quantity-count'>1</span>
        <button class="increment" type='button'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
        </div>
    </div>`;
}

function createAddToCartBtn() {
  return `
    <div>
    <button class="add-to-cart" disabled>Add to Cart</button>
    </div>
    <button><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
    Add to Favorites
    </button>
    `;
}

function createDescription() {
  return `
    <div class='description-wrapper'>
    <p>Description</p>
    <p>Description
        The Felicia Maxi Dress is your go-to on the days when you don't feel like wearing anything at all. This dress is lightweight without being see-through, and forgiving exactly where you need it to be.
    </p>
    <div>
    <p>Features:</p>
    <ul>
        <li>Scoop neck</li>
        <li>Spaghetti straps</li>
        <li>Hits below the ankles</li>
        <li>Elastic waist</li>
        <li>Machine wash, line dry</li>
    </ul>
    </div>
    </div>
    `;
}

function createDetails() {
  return `
    <div class='details-wrapper'>
    <p>Details</p>
    <ul>
        <li>SKU: <span>DVD04</span></li>
        <li>Fashion Color: <span>Mint</span></li>
        <li>Fashion Material: <span>Cotton, Viscose</span></li>
        <li>Fashion Style: <span>Ankle Length, Sleeveless</span></li>
        <li>Has Video: <span>No</span></li>
    </ul>
    </div>
    `;
}

function listenEvents(block) {
    block.querySelector('.decrement').addEventListener('click',() => {
        const quantity = block.querySelector('.quantity-wrapper div span');
        const currentQuantity = parseInt(quantity.innerText);
        if (currentQuantity > 1) {
            quantity.innerText = currentQuantity - 1;
        }
    });

    block.querySelector('.increment').addEventListener('click',() => {
        const quantity = block.querySelector('.quantity-wrapper div span');
        quantity.innerText = parseInt(quantity.innerText) + 1;
    });

    block.querySelectorAll('.color-wrapper button').forEach((color) => {
        color.addEventListener('click', () => {
            block.querySelectorAll('.color-wrapper button span').forEach((span) => {
                span.classList.remove('active');
            });
            color.querySelector('span').classList.add('active');
            block.querySelector('.selected-color').innerText = `${color.value}`;
        });
    })

    block.querySelectorAll('.size-wrapper button').forEach((button) => {
        button.addEventListener('click', () => {
            block.querySelectorAll('.size-wrapper button').forEach((button) => {
                button.classList.remove('active');
            });
            button.classList.add('active');
            block.querySelector('.selected-size').innerText = `${button.innerText}`;
        });
    });


    // if(block.querySelector('.selected-color').innerText != 'None' && block.querySelector('.selected-size').innerText != 'None') {
    //     block.querySelector('.add-to-cart').disabled = false;
    // }
}

function connectSwiper() {
  var thumbSwiper = new Swiper(".thumb-swiper", {
    direction: "vertical",
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const thumbnails = document.querySelectorAll(
    ".thumb-swiper .swiper-slide img"
  );
  const mainImage = document.getElementById("main-display");

  // Default first thumbnail should be active
  thumbnails[0].parentElement.classList.add("swiper-slide-thumb-active");

  // Click event for thumbnails
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      // Change main image source
      mainImage.src = this.src;
      console.log(this.src);

      // Remove active class from all thumbnails
      thumbnails.forEach((t) =>
        t.parentElement.classList.remove("swiper-slide-thumb-active")
      );

      // Add active class to the clicked thumbnail
      this.parentElement.classList.add("swiper-slide-thumb-active");
    });
  });
}
