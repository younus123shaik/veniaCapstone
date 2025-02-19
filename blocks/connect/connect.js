export default function decorate(block) {
    console.log(block.children[1]);
    let div = document.createElement('div');
    let divHtml = `<form class="subscribe-form">
        <input type="text" class="subscribe-input" required/>
        <button class="subscribe-btn">Subscribe</button>
    </form>`
    div.innerHTML = divHtml;
    block.children[1].append(div.firstElementChild)
}