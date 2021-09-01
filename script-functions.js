//-----------------functions-------------------------//
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

//defining what happen after clicking a button
function search() {
    let value = parseInt(this.classList[1]);
    if (this.classList.contains('locked')) {
        if (score >= value) {
            score -= value;
            //this.classList.remove('locked');
            this.classList.remove('to-unlock');

            //change cost of clicked element
            this.classList.replace(value, value * multiplierCost);
            costs.forEach(cost => {
                if (cost.parentElement === this) {
                    cost.textContent = value * multiplierCost;
                }
            });

            perSecond += value * multiplierPerSecond;
            perSecondText.textContent = perSecond.toFixed(1);
            perSecondIntervalTime = Math.round(1000 / perSecond);

            //interval adding money perSecond
            clearInterval(perSecondIntervalId);
            perSecondIntervalId = setInterval(() => {
                score++;
                scoreText.textContent = score;
            }, perSecondIntervalTime);
        }
    }
    else {
        score += value;
    }
    scoreText.textContent = score;
}

//rendering turnip on the screen
function getNewTurnip() {
    let turnip = document.createElement("span");
    let turipLifeDuration = getRandom(minTuripLifeDuration, maxTuripLifeDuration);
    
    let minWidth = Math.max(minTurnipWidth * getRandom(0.02, 0.03), 40); //width can't be smaller than 40px
    let maxWidth = Math.max(minTurnipWidth * getRandom(0.02, 0.03) * getRandom(1, 2.25), 60);
    let width = getRandom(minWidth, maxWidth);
    let height = width * 2; //I made drawing that height is nearly 2 times longer that width
    
    turnip.style.height = `${height}px`;
    turnip.style.width = `${width}px`;

    //position of a turnip; to not touch the edges I took a 10px border
    let maxTop = Math.max(window.innerHeight - height - 10, 10);
    let maxLeft = Math.max(window.innerWidth - width - 10, 10);
    
    let top = Math.floor(getRandom(10, maxTop));
    let left = Math.floor(getRandom(10, maxLeft));
    
    //initialize new coordinates if old ones are inside "game" object; 
    //top + height >= gameObejct.offsetTop <- bottom of the picture can't be inside;  analogically left + width
    while (((top + height >= gameObejct.offsetTop && top <= gameObejct.offsetTop + gameObejct.offsetHeight) && 
            (left + width >= gameObejct.offsetLeft && left <= gameObejct.offsetLeft + gameObejct.offsetWidth)) || 
    //check if the new coords are not interrupting existing turnips
    // -10 and +10 beacuse I want the new turnip spawn min 10px away from existing ones
    (currentObjects.childNodes.forEach(turnipChild => { 
        if(top + height - 100 >= turnipChild.offsetTop && top + 100 <= turnipChild.offsetTop + turnipChild.offsetHeight &&
        left + width - 100 >= turnipChild.offsetLeft && left + 100 <= turnipChild.offsetLeft + turnipChild.offsetWidth) {
            return true;
        }
    })) ) {
        console.log('nie', {top, left});
        top = Math.floor(getRandom(10, maxTop));
        left = Math.floor(getRandom(10, maxLeft));
    }
    console.log({top, left});

    turnip.style.top = `${top}px`;
    turnip.style.left = `${left}px`;
    turnip.style.transform = `rotate(${getRandom(-45, 45)}deg)`;

    let turnipUrl = turnipPictures[Math.floor(getRandom(0, turnipPictures.length))];
    turnip.style.backgroundImage = `url(${turnipUrl})`;

    turnip.classList.add('turnip');
    turnip.addEventListener('click', onClickAddScore);
    
    //setting turnip life duration
    setTimeout(() => {
        turnip.remove();
    }, turipLifeDuration);
    currentObjects.appendChild(turnip);
    
    /*currentObjects.childNodes.forEach(turnipChild => {
        console.log(turnipChild.offsetHeight);
    });*/
}

//adding score after clicking on a turnip
function onClickAddScore() {
    score += Math.floor(getRandom(minBonus, maxBonus + 1));
    scoreText.textContent = score;
    this.remove();
}

//setting how fast a next turnip will be added to the screen
function setRandomTurnipTimeout() {
    getNewTurnip();
    let timeout = getRandom(minTuripTimeout, maxTuripTimeout);
    setTimeout(setRandomTurnipTimeout, timeout);
}

//-----------------command lines-------------------------//

setTimeout(setRandomTurnipTimeout, getRandom(500, 3000)); //show the first turnip

setInterval(() => {
    document.title = `${score} money - Clicker`; //update title
    minTurnipWidth = window.innerWidth; //update this value in case window width was changed
    //check if any button can be updated
    buttons.forEach(button => {
        var value = parseInt(button.classList[1]);
        if (button.classList.contains('locked')) {
            if (score >= value) {
                button.classList.add('to-unlock');
            } else {
                button.classList.remove('to-unlock');
            }
        }
    });
}, 100);

buttons.forEach(button => button.addEventListener('click', search));
