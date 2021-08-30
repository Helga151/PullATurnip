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
                    //console.log(cost);
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

            console.log({
                score,
                value,
                perSecond
            });
            console.log(this);
        }
    }
    else {
        //console.log(value);
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
    console.log({minWidth, maxWidth, width});
    
    turnip.style.height = `${height}px`;
    turnip.style.width = `${width}px`;

    //position of a turnip; to not touch the edges I took a 10px border
    let maxTop = Math.max(window.innerHeight - height - 10, 10);
    let maxLeft = Math.max(window.innerWidth - width - 10, 10);

    turnip.style.top = `${Math.floor(getRandom(10, maxTop))}px`;
    turnip.style.left = `${Math.floor(getRandom(10, maxLeft))}px`;
    turnip.style.transform = `rotate(${getRandom(-45, 45)}deg)`;

    let turnipUrl = turnipPictures[Math.floor(getRandom(0, turnipPictures.length))];
    //console.log({turnipUrl});
    turnip.style.backgroundImage = `url(${turnipUrl})`;

    turnip.classList.add('turnip');
    turnip.addEventListener('click', onClickAddScore);
    
    //setting turnip life duration
    setTimeout(() => {
        turnip.remove();
    }, turipLifeDuration);
    currentObjects.appendChild(turnip);
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
    console.log({timeout});
    setTimeout(setRandomTurnipTimeout, timeout);
}

//-----------------command lines-------------------------//

setTimeout(setRandomTurnipTimeout, getRandom(500, 3000));

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
