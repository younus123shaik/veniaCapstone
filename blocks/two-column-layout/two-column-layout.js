export default function decorate(block) {
    block.querySelectorAll('p a').forEach(anchor => {
        anchor.classList.add('button');
    });
}