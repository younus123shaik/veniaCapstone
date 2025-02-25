import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  [...block?.children || []].forEach((row) => {
    const li = document.createElement('li');
  
    while (row?.firstElementChild) li.append(row.firstElementChild);
  
    [...li?.children || []].forEach((div) => 
      div.className = (div.children.length === 1 && div.querySelector('picture')) 
        ? 'cards-card-image' 
        : 'cards-card-body'
    );
  
    ul.append(li);
  });
  
  ul.querySelectorAll('picture > img')?.forEach((img) => 
    img?.closest('picture') 
      ? img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])) 
      : null
  );
  
  block ? (block.textContent = '', block.append(ul)) : console.warn('Block is undefined or null');
  
}
