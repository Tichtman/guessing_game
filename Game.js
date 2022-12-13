let playerLives = 5;
heartsArr = [];
var countDownTarget;
var isPaused = false;
let cards = [];
var intervalID ;

const setNumberOfLives = () => {
    const lives = document.getElementById('lives');
    for (let i = 0; i < playerLives; i++) {
        const heart = document.createElement('i');
        heart.setAttribute('id', 'heart' + i);
        heart.setAttribute('class', 'fa fa-heart');
        heartsArr.push(heart);
        lives.appendChild(heart);
    }
}

const setButtonsAbility = (dict) => {
    for (const [key, value] of Object.entries(dict)) {
        document.getElementById(key).disabled = value;
    }
}


const start = () => {
    cardGenerator();
    setNumberOfLives();
    setButtonsAbility({'start': true, 'pause': false, 'restart': false});
    document.getElementById("start").onclick = resume;
    stoper();
}

const restart = () => {
    setButtonsAbility({'start': true, 'pause': false, 'restart': false});
    window.location.reload();
}

const pause = () => {
    setButtonsAbility({'start': false, 'pause': true, 'restart': false});
    isPaused = true;
    for (card of cards) {
        card.removeEventListener('click', clickEvent);
    }
}

const resume = () => {
    setButtonsAbility({'start': true, 'pause': false, 'restart': false});
    isPaused = false;
    for (card of cards) {
        card.addEventListener('click', clickEvent);
    }
}

const end = () => {
    setButtonsAbility({'start': true, 'pause': true, 'restart': false});
    isPaused = true;
    for (card of cards) {
        card.removeEventListener('click', clickEvent);
    }
}

const cardGenerator = () => {
    cards = document.getElementsByClassName('card');
    let card = cards[Math.floor(Math.random() * 9)];
    card.setAttribute('name','dog');
    card.querySelector('.face').setAttribute('src', './img/ema_dog.jpg');
    for (card of cards) {
        card.addEventListener('click', clickEvent);
    }
};

const clickEvent = (e) => {
    checkCards(e);
}

const checkCards = (e) => {
    const clickedCard = e.target;
    if (clickedCard.classList.contains('flipped')) {
        return;
    }
    //stop counting
    clearInterval(intervalID);
    clickedCard.classList.toggle('toggleCard');
    clickedCard.classList.add('flipped');
    if (clickedCard.getAttribute('name') === 'dog') {
        console.log('match');
        let tryNum = (playerLives - heartsArr.length)+1;
        alert('YOU WON on your ' + tryNum + 'th try');
        end();
    } else {
        console.log('wrong');
        setTimeout(() => clickedCard.classList.remove('toggleCard'), 1000);
        clickedCard.classList.remove('flipped');
        wrong();
        checkIfLost();
    }
};

const alert = (text) => {
    setTimeout(() => window.alert(text), 100);
}

const checkIfLost = () => {
    if(heartsArr.length === 0) {
        isPaused = true;
        alert('you lost! try again');
        end();
    }
}

const wrong = () => {
    //remove 1 heart
    const heart = heartsArr.pop();
    const lives = document.getElementById('lives');
    lives.removeChild(heart);
    //restart timeout
    stoper();
}

//stoper
const stoper = () => {
    countDownTarget = 30;
    const element = document.getElementById("seconds");
    element.innerHTML = 'Count down: ' + countDownTarget;
    // Update the count down every 1 second
    intervalID  = setInterval(countDown, 1000);
}

const countDown = () => {
    if(countDownTarget <= 0) {
        wrong();
        checkIfLost();
        clearInterval(intervalID);        
    }
    if(!isPaused) {
        countDownTarget -= 1;
        document.getElementById("seconds").innerHTML = 'Count down: ' + countDownTarget;
    }
}