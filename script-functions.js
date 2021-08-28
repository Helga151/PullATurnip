function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

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
    let height = 200;
    let width = 200;
    turnip.style.height = `${height}px`;
    turnip.style.width = `${width}px`;

    let maxHeight = Math.max(window.innerHeight - height, 0);
    let maxWidth = Math.max(window.innerWidth - width, 0);

    turnip.style.top = `${Math.floor(getRandom(0, maxHeight))}px`;
    turnip.style.left = `${Math.floor(getRandom(0, maxWidth))}px`;

    let turnipUrl = turnipPictures[Math.floor(getRandom(0, turnipPictures.length))];
    console.log({turnipUrl});
    turnip.style.backgroundImage = `url(${turnipUrl})`;

    turnip.classList.add('turnip');
    turnip.addEventListener('click', onClickAddScore);
    setTimeout(() => {
        turnip.remove();
    },turipLifeDuration);
    currentObjects.appendChild(turnip);
}

//adding score
function onClickAddScore() {
    score += Math.floor(getRandom(minBonus, maxBonus + 1));
    scoreText.textContent = score;
    this.remove();
}

function setRandomTurnipTimeout() {
    getNewTurnip();
    let timeout = getRandom(1000, 5000);
    console.log(timeout);
    setTimeout(setRandomTurnipTimeout, timeout);
}

//-----------------command lines-------------------------//

setTimeout(setRandomTurnipTimeout, getRandom(500, 3000));

setInterval(() => {
    document.title = `${score} money - Clicker`; //update title
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
