//
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 5;

//
playerLivesCount.textContent = playerLives;
//

const getData = () => [
    {imgSrc: './img/ema_dog.jpg',name:'dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
    {imgSrc: './img/no.jpg',name:'no dog' },
];

//
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() -0.5);
    return cardData;
};

//
const cardGenerator = () => {
    const cards = document.getElementsByClassName('card');
    console.log(cards);
    let card = cards[Math.floor(Math.random() * 10)];
    card.setAttribute('name','dog' );
    card.firstChild.src = './img/ema_dog.jpg';
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
    
    
    
    
    
    cards.sort(() => Math.random() -0.5);
    const cardData = randomize();
    //
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //
        face.src = item.imgSrc;
        card.setAttribute('name',item.name );
        //
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        // card.onclick = checkCards(e);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};


//Check Cards
const checkCards = (e) => {
    // e.classList.toggle('toggleCard');
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCard = document.querySelectorAll('.flipped');
    if(flippedCard.length === 1) {
        if(
            flippedCard[0].getAttribute('name') === 'dog'
        ) {
            console.log('match');
            //Run a check to see if we won the game!
            Restart('you won!');

        } else {
            console.log('worng');
            flippedCard.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
                stoper();
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            //Run a check to see if we Lost the game!
            if(playerLives === 0) {
                Restart('try again');
                
            }
        }
    }
};



//Restart
const Restart = (Text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let Cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item,index) => {
        Cards[index].classList.remove('toggleCard')
        //Randomize
        setTimeout(()=> {  
            Cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            Cards[index].setAttribute('name',item.name);
            section.style.pointerEvents = 'all';
        },1000);
    });
    playerLives = 5;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(Text), 100);

};


//stoper
const stoper = () => {
    var countDownTarget = new Date().getTime() + 1 * 30 * 1000;
    function showClock(target) {
        const distance = target - new Date().getTime();
        const secs = distance < 0 ? 0: Math.floor((distance % (1000 * 60)) / 1000);        
    // Output the results
        document.getElementById("seconds").innerHTML = secs;
    }
    showClock(countDownTarget);
    // Update the count down every 1 second
    var x = setInterval(function() {
        showClock(countDownTarget);
        if (countDownTarget - new Date().getTime() < 0) {
          clearInterval(x);
     }
    }, 1000);
}



cardGenerator();