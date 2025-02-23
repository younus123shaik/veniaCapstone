export default function decorate(block) {
    let div = document.createElement('div');
    let divHtml = `<form class="subscribe-form">
    <label for="subscribe-input"></label>
    <input type="email" id="subscribe-input" name="subscribe" class="subscribe-input" required placeholder="Enter your email"/>
    <button type="submit" class="subscribe-btn">Subscribe</button>
</form>`
    div.innerHTML = divHtml;
    block.children[1].append(div.firstElementChild)
}