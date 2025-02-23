export default function decorate(block) {
    let div = document.createElement('div');
    let divHtml = `<form class="subscribe-form">
    <label for="subscribe"></label>
        <input type="text" name="subscribe" class="subscribe-input" required/>
        <button class="subscribe-btn">Subscribe</button>
    </form>`
    div.innerHTML = divHtml;
    block.children[1].append(div.firstElementChild)
}