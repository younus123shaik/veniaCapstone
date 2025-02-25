const formClassNames = ['image', 'title', 'options', 'description', 'details' ];
const colorMap = {
    "Lalic": "ll",
    "Peach": "pe",
    "Mint": "mt",
    "Rain": "rn",
    "Latte": "la",
    "Lily": "ly",
    "Khaki": "kh"
};

let product;
export default async function decorate(block) {
    block.parentElement.classList.add('productfulldetails');
    const response = await fetch('/product-list.json');
    const cardsData = await response.json();
    const url = new URL(window.location.href);
    const id = url?.pathname.match(/\d+/);
    product = cardsData?.data[parseInt(id[0]) - 1];
    [...block.children]?.forEach((child, ind) => {
        child.classList.add(formClassNames[ind]);
    });
    block.children[0].children[0].classList.add('thumb-swiper','swiper-container');
    block.children[0].children[1].classList.add('main-image');

    let div = createElement('div', 'swiper-wrapper');
    block.querySelectorAll('.thumb-swiper p').forEach((child) => {
        div.append(child);
    })
    let swiper = createElement('div', 'swiper');
    swiper.append(div);
    block.querySelector('.thumb-swiper').innerHTML = swiper.innerHTML;
    connectSwiper();
    createOptionColor(block)
    createOptionSize(block)
    block.querySelector('.options').insertAdjacentHTML('afterend', createQuantity());
    block.querySelector('.quantity').insertAdjacentHTML('afterend', createAddToCartBtn());
    block.querySelector('.description > div').classList.add('description-wrapper');
    block.querySelector('.details > div').classList.add('details-wrapper');
    listenEvents(block);
}


function createElement (Element, className) {
    const element = document.createElement(Element);
    element.classList.add(className);
    return element;
}

function createOptionColor(block) {
    let colorWrapper = block.querySelectorAll('.options div')[0]
    let colorBtns = Array.from(colorWrapper.querySelectorAll('p'));
    if(colorBtns.length <= 0) {
        colorWrapper.classList.add('inactive');
        return;
    }
    let div = document.createElement('div');
    div.innerHTML = `<div class="color-wrapper">
          <div>Fashion Color</div>
          <div>
          ${colorBtns?.map((p) => {
            return `<button type='button' value='${p.innerText}' style='background: var(--${p.innerText.toLowerCase().trim()}-color)'>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
            </button>`
          }).join('')}
          </div>
          <div>Selected Fashion Color: <span class='selected-color'> None</span></div>
      </div>`;
      colorWrapper.replaceWith(div.firstElementChild);
  }
  
  function createOptionSize (block) {
    let sizeWrapper = Array.from(block.querySelectorAll('.options div')).slice(-1)[0];
    if (!sizeWrapper) return;
    let div = document.createElement('div');
    div.innerHTML = `<div class='size-wrapper'>
      <div>Fashion Size</div>
      <div>
      ${Array.from(sizeWrapper.querySelectorAll('p'))?.map((p) => {
        return `<button type='button' value='${p.innerText}'>
            <span>${p.innerText}</span>
            </button>`
      }).join('')}
      </div>
      <div>Selected Fashion Size: <span class='selected-size'> None</span></div>
      </div>`;
      sizeWrapper.replaceWith(div.firstElementChild);
  }


  function createQuantity() {
    return `<div class='quantity'><div class="quantity-wrapper">
          <div>Quantity</div>
          <div>
          <button class="decrement" type='button'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
          <span class='quantity-count'>1</span>
          <button class="increment" type='button'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
          </div>
      </div></div>`;
  }
  
  function createAddToCartBtn() {
    return `
    <div class='cart'>
      <div>
      <button class="add-to-cart" disabled>Add to Cart</button>
      </div>
      <button><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-icon-Dp3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
      Add to Favorites
      </button>
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
            let updatedImage = block.querySelectorAll('.swiper-wrapper p')[0];
            let imageUrl = product.image.split('_')[0].slice(0, -2) + colorMap[color.value] + '_' + product.image.split('_')[1];
            console.log(imageUrl);
            updatedImage.innerHTML = `
                    <picture>
                        <source type="image/webp" srcset=${imageUrl}>
                        <source type="image/jpeg" srcset=${imageUrl}>
                        <img src=${imageUrl} alt="Product Image" loading="lazy">
                    </picture>
            `;
            updateMainImage(updatedImage.firstElementChild);
            unLockCartButton();
        });
    })

    block.querySelectorAll('.size-wrapper button').forEach((button) => {
        button.addEventListener('click', () => {
            block.querySelectorAll('.size-wrapper button').forEach((button) => {
                button.classList.remove('active');
            });
            button.classList.add('active');
            block.querySelector('.selected-size').innerText = `${button.innerText}`;
            unLockCartButton();
        });
    });

    function unLockCartButton() {
        if(block.querySelector('.selected-color').innerText.trim() !== 'None' && block.querySelector('.selected-size').innerText.trim() !== 'None') {
            block.querySelector('.add-to-cart').disabled = false;
        }
    }

    block.querySelector('.add-to-cart').addEventListener('click', () => {
        // Add product to cart
        let cart = document.querySelector('.cart-count');
        const quantity = block.querySelector('.quantity-count');
        let cartCount = parseInt(cart.innerHTML) +  parseInt(quantity.innerHTML);
        if (cartCount <= 99) {
            cart.innerHTML = cartCount;
        } else {
            cart.innerHTML = "99+";
        } 
        cart.classList.add('cart-active');
    });
}

function connectSwiper() {
    // Ensure all <p> elements inside .thumb-swiper have the correct class
    document.querySelectorAll(".thumb-swiper p").forEach((p) => {
        p.classList.add("swiper-slide");
    });

    // Initialize Swiper
    var thumbSwiper = new Swiper(".thumb-swiper", {
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    const thumbnails = document.querySelectorAll(".thumb-swiper .swiper-slide picture");
    // Default: Set first thumbnail as main image
    updateMainImage(thumbnails[0]);

    // Click event for thumbnails
    thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", function () {
            updateMainImage(this);
        });
    });

}
function updateMainImage(thumbPicture) {
    const thumbnails = document.querySelectorAll(".thumb-swiper .swiper-slide picture");
    const mainPicture = document.querySelector('.main-image picture');
    const mainImage = mainPicture.querySelector("img");

    if (!thumbnails.length || !mainPicture || !mainImage) {
        console.error("Thumbnails or main picture not found.");
        return;
    }

    const thumbSources = thumbPicture.querySelectorAll("source");
    const thumbImg = thumbPicture.querySelector("img");

    if (!thumbImg) return;

    // Update all sources in the main picture
    const mainSources = mainPicture.querySelectorAll("source");
    thumbSources.forEach((src, index) => {
        if (mainSources[index]) {
            mainSources[index].setAttribute("srcset", src.getAttribute("srcset"));
        }
    });

    // Update the main image
    mainImage.src = thumbImg.src;

    // Remove active class from all thumbnails
    thumbnails.forEach((t) => t.parentElement.classList.remove("swiper-slide-thumb-active"));

    // Add active class to clicked thumbnail
    thumbPicture.parentElement.classList.add("swiper-slide-thumb-active");
}

  

  