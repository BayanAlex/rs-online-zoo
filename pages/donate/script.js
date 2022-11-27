import {menuChange} from '../../assets/modules/common.js';

document.querySelectorAll('.main-menu__item').forEach(item => item.onclick = !item.classList.contains('main-menu__item_highlighted') ? hideHighlitedMenuItem : undefined);
document.querySelector('.menu-checkbox').addEventListener('change', menuChange);
document.querySelector('.amount-input__input').addEventListener('input', (event) => {
    const input = event.currentTarget;
    input.value = input.value.slice(0, input.dataset.maxlength);
    document.querySelectorAll('.pick__amount-radio').forEach(radio => radio.checked = +input.value == radio.value);
});

document.querySelectorAll('.pick__amount-radio').forEach(radio => radio.addEventListener('change', (event) => {
        document.querySelector('.amount-input__input').value = event.currentTarget.value;
    })
);


function hideHighlitedMenuItem() {
    if(!this.classList.contains('.main-menu__item_highlighted'))
        document.querySelectorAll('.main-menu__item_highlighted').forEach(item => item.classList.remove('main-menu__item_highlighted'));
}
