export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  let response = await fetch('/product-list.json');
  let products = await response.json();
  console.log(products);
  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  block.closest('div').innerHTML = `<img src="https://drive.google.com/thumbnail?id=1F_1rARahPxwaHDxzAPHly0S4ih1iMphT"/>`;
}
