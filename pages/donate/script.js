document.querySelectorAll('.main-menu__item').forEach(item => item.onclick = !item.classList.contains('main-menu__item_highlighted') ? hideHighlitedMenuItem : undefined);

function hideHighlitedMenuItem() {
    if(!this.classList.contains('.main-menu__item_highlighted'))
        document.querySelectorAll('.main-menu__item_highlighted').forEach(item => item.classList.remove('main-menu__item_highlighted'));
}