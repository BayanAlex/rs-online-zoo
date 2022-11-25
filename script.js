const petsCardsData = [
    {
        name: 'GIANT PANDAS',
        area: 'Native to Southwest China',
        food: 'fruit',
        img: 'assets/images/cards/card_panda.png',
    },
    {
        name: 'EAGLES',
        area: 'Native to South America',
        food: 'meat',
        img: 'assets/images/cards/card_eagle.png',
    },
    {
        name: 'GORILLAS',
        area: 'Native to Congo',
        food: 'fruit',
        img: 'assets/images/cards/card_gorilla.png',
    },
    {
        name: 'TWO-TOED SLOTH',
        area: 'Mesoamerica, South America',
        food: 'fruit',
        img: 'assets/images/cards/card_sloth.png',
    },
    {
        name: 'CHEETAHS',
        area: 'Native to Africa',
        food: 'meat',
        img: 'assets/images/cards/card_cheetah.png',
    },
    {
        name: 'PENGUINS',
        area: 'Native to Antarctica',
        food: 'meat',
        img: 'assets/images/cards/card_penguin.png',
    },
    {
        name: 'Alligators',
        area: 'Native to Southeastern U. S.',
        food: 'meat',
        img: 'assets/images/cards/card_alligator.png',
    },
    {
        name: 'GORILLAS',
        area: 'Native to Congo',
        food: 'fruit',
        img: 'assets/images/cards/card_gorilla2.png',
    },
]
let petsCarouselScrolling = false;
let petsCarouselItemsCount = 6;
let mediaSmallDesktop = window.matchMedia('(max-width: 999px)');

document.querySelectorAll('.main-menu__item').forEach(item => item.onclick = !item.classList.contains('main-menu__item_highlighted') ? hideHighlitedMenuItem : undefined);
petsCarouselInit();

function hideHighlitedMenuItem() {
    if(!this.classList.contains('.main-menu__item_highlighted'))
        document.querySelectorAll('.main-menu__item_highlighted').forEach(item => item.classList.remove('main-menu__item_highlighted'));
}

function petsCarouselInit() {
    petsCarouselItemsCount = mediaSmallDesktop.matches ?  4 : 6;
    const carousel = document.querySelector('.pet-carousel');
    carousel.append(petsCarouselCreateCards());
    carousel.querySelectorAll('.pet-card').forEach(card => card.classList.add('pet-card_hover'));
    document.querySelectorAll('.pets__arrow').forEach(arrow => arrow.addEventListener('click', petsCarouselClick));

    mediaSmallDesktop.addEventListener('change', (event) => {
        location.reload();
        // carousel.querySelectorAll('.pet-cards').forEach(card => card.remove());
        // petsCarouselItemsCount = event.target.matches ? 4 : 6;
        // carousel.append(petsCarouselCreateCards());
    });
}

function petsCarouselCreateCards() {
    let cards = document.createElement('div');
    let cardsIndexes = petsCardsData.map((v, i) => i);
    cards.classList.add('pet-cards');
    const existingCards = document.querySelectorAll('.pet-card');
    let getRandomIndex = () => Math.round(Math.random() * (cardsIndexes.length - 1));
    for(let i = 0; i < petsCarouselItemsCount; i++) {
        let index;
        if(existingCards.length != 0) {
            do
                index = cardsIndexes[getRandomIndex()];
            while(existingCards[i].dataset.index == index);
        } else
            index = cardsIndexes[getRandomIndex()];
        cardsIndexes.splice(cardsIndexes.indexOf(index), 1);
        cards.insertAdjacentHTML('beforeend', petsCreateCard(index));
    }
    return cards;
}

function petsCarouselClick(event) {
    if(petsCarouselScrolling)
        return;
    petsCarouselScrolling = true;
    let carouselScreen = petsCarouselCreateCards();
    const carousel = document.querySelector('.pet-carousel');
    carousel.querySelectorAll('.pet-card').forEach(card => card.classList.remove('pet-card_hover'));
    if(event.currentTarget.classList.contains('pets__arrow_right')) {
        carousel.classList.add('pet-carousel_left-hidden');
        carousel.prepend(carouselScreen);
        carousel.addEventListener('transitionend', () => {
            carousel.lastElementChild.remove();
            carousel.classList.remove('pet-carousel__transition');
            carousel.querySelectorAll('.pet-card').forEach(card => card.classList.add('pet-card_hover'));
            petsCarouselScrolling = false;
        }, {once: true});
        setTimeout(() => {
            carousel.classList.add('pet-carousel__transition');
            carousel.classList.remove('pet-carousel_left-hidden');
        }, 0);

    } else if(event.currentTarget.classList.contains('pets__arrow_left')) {
        carousel.append(carouselScreen);
        carousel.addEventListener('transitionend', () => {
            carousel.firstElementChild.remove();
            carousel.classList.remove('pet-carousel_left-hidden', 'pet-carousel__transition');
            carousel.querySelectorAll('.pet-card').forEach(card => card.classList.add('pet-card_hover'));
            petsCarouselScrolling = false;
        }, {once: true});
        setTimeout(() => {
            carousel.classList.add('pet-carousel_left-hidden', 'pet-carousel__transition');
        }, 0);
    }
}

function petsCreateCard(index) {
    return `<div class="pet-card" data-index="${index}">
                <div class="pet-card__content">
                    <img src="${petsCardsData[index].img}" alt="" class="pet-card__img">
                    <div class="pet-card__description">
                        <div class="pet-card__text">
                            <p class="pet-card__name">${petsCardsData[index].name}</p>
                            <p class="pet-card__area">${petsCardsData[index].area}</p>
                        </div>
                        <div class="pet-card__food">
                            <img src="${petsCardsData[index].food == 'meat' ? 'assets/icons/meet-fish_icon.svg' : 'assets/icons/banana-bamboo_icon.svg'}" alt="" class="pet-card__food-img ${petsCardsData[index].food == 'meat' ? 'pet-card__food-img_meet-fish' : 'pet-card__food-img_banana-bamboo'}">
                        </div>
                    </div>
                </div>
            </div>`;
}