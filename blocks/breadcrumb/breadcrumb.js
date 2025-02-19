export default function decorate(block) {
    let span = document.createElement('span');
    span.textContent = 'Felicia Maxi Dress';
    block.querySelector('div div p').append(span)
}