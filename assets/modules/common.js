export function menuChange(event) {
    const checkbox = document.querySelector('.menu-checkbox');
    if(checkbox.checked == true) {
        const modal = addModal();
        modal.addEventListener('click', () => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        });
        disableScroll();
    }
    else {
        removeModal();
        enableScroll();
    }
}

export function addModal() {
    document.body.insertAdjacentHTML('beforeend', '<div class="modal"></div>');
    const modal = document.querySelector('.modal');
    setTimeout(() => modal.classList.add('modal_show'), 0);
    return modal;
}

export function removeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('modal_show');
    modal.addEventListener('transitionend', () => modal.remove());
}

export function disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

export function enableScroll() {
    window.onscroll = '';
}