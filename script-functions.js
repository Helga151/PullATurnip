//-----------------functions-------------------------//
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

//defining what happen after clicking the clicker button
function clickedClickerButton() {
    let value = parseInt(this.classList[1]);
    score += value;
    //there has to be text update beacuse person can click more often than 200ms
    scoreText.textContent = score; 
}

//defining what happen after clicking an update button
function clickedUpdatePerSecond() {
    let value = parseInt(this.classList[1]);
    if (score >= value) {
        score -= value;
        console.log(this);
        this.classList.remove('to-unlock');

        //change cost of clicked element
        this.classList.replace(value, value * multiplierCost);
        costs.forEach(cost => {
            if (cost.parentElement === this) {
                cost.textContent = value * multiplierCost;
            }
        });

        perSecond += value * multiplierPerSecond;
        perSecond = parseFloat(perSecond.toFixed(1));
        perSecondIntervalTime = Math.round(1000 / perSecond);

        //interval adding money perSecond
        clearInterval(perSecondIntervalId);
        if(perSecondIntervalTime > 200) { //min interval is 200ms unless page lags
            perSecondIntervalId = setInterval(() => {
                score++;
            }, perSecondIntervalTime);
        }
        else {
            perSecondIntervalId = setInterval(() => {
                score += parseFloat((perSecond / 5).toFixed(0)); // perSecond / 5 because 200ms is 1s / 5
            }, 200);
        }
        
    }
}

// sleep for (time) miliseconds
async function sleep(time){
    return new Promise(()=>{setTimeout(null,time)});
}

//rendering turnip on the screen
// use 'async function' signature if debugging and 'await sleep()' is uncommented
function getNewTurnip() {
    if (currentObjects.children.length < turnipLimit){
        let turnip = document.createElement("span");
        let turipLifeDuration = getRandom(minTuripLifeDuration, maxTuripLifeDuration);
        
        let minWidth = Math.max(minTurnipWidth * getRandom(0.02, 0.03), 40); //width can't be smaller than 40px
        let maxWidth = Math.max(minTurnipWidth * getRandom(0.02, 0.03) * getRandom(1, 2.25), 60);
        
        let width   = getRandom(minWidth, maxWidth);
        let height  = width * 2; //I made drawing that height is nearly 2 times longer that width

        //position of a turnip; to not touch the edges I took a 10px border
        let maxTop = Math.max(window.innerHeight - height - 10, 10);
        let maxLeft = Math.max(window.innerWidth - width - 10, 10);
        let top, left;

        // retry limit prevents browser to freeze if no spot is available
        // ie. in a small window
        for(let i = 0; i < retryLimit; ++i){
            // positions
            top  = Math.floor(getRandom(10, maxTop));
            left = Math.floor(getRandom(10, maxLeft));

            // Check if the new position overlaps
            if( checkOverlaping(top, left, height, width, rightSection, 10)  || // check if overlaps with updates menu
                checkOverlaping(top, left, height, width, infoContainer, 10) || // check if overlaps with info container
                checkOverlaping(top, left, height, width, parting, 10)       || // check if overlaps with parting
                checkTurnipOverlap(top, left, height, width, 10)             ){ // check if overlaps with other turnips
                //console.log('nie', {top, left} );
                //displayTestObject(top, left, height, width);
                //await sleep(testLifespan + 5);
                continue;
            }
            //console.log('tak', {top, left});

            turnip.style.top        = `${top}px`;
            turnip.style.left       = `${left}px`; 
            turnip.style.height     = `${height}px`;
            turnip.style.width      = `${width}px`;
            turnip.style.transform  = `rotate(${getRandom(-45, 45)}deg)`;

            let turnipUrl = turnipPictures[Math.floor(getRandom(0, turnipPictures.length))];
            turnip.style.backgroundImage = `url(${turnipUrl})`;

            turnip.classList.add('turnip');
            turnip.addEventListener('click', onClickAddScore);

            //setting turnip life duration
            setTimeout(() => {
                turnip.remove();
                //console.log("Turnips:", currentObjects.children.length)
            }, turipLifeDuration);

            currentObjects.appendChild(turnip);
            //console.log("Turnips:", currentObjects.children.length)
            }
    }
}

// check if any other turnip overlaps
function checkTurnipOverlap(top, left, height, width, gap = 10){
    // TODO: store current turnips in separate array - optimalization. 
    //        we cannot use currentObjects.childNodes since it contains text node
    //        which always returns true (overlaping)
    //        we have to use currentObjects.children, but it doesn't have .forEach loop
    for (let i = 0; i < currentObjects.children.length; i++) {
        if (checkOverlaping(top, left, height, width, currentObjects.children[i], gap))
            return true;
    }
    return false;
}

//adding score after clicking on a turnip
function onClickAddScore() {
    score += Math.floor(getRandom(minBonus, maxBonus + 1));
    this.remove();
}

//setting how fast a next turnip will be added to the screen
function setRandomTurnipTimeout() {
    getNewTurnip();
    let timeout = getRandom(minTuripTimeout, maxTuripTimeout);
    randomTurnipTimeoutId = setTimeout(setRandomTurnipTimeout, timeout);
}

// Returns true if new object position described by (top, left, height, width)
//     overlaps with existing (element). 
// Optionally leave (gap) between elements
function checkOverlaping(top, left, height, width, element, gap = 10){
    
    let newTop      = top;
    let newBottom   = top + height + gap;
    let newLeft     = left;
    let newRight    = left + width + gap;

    let objTop      = element.offsetTop;
    let objBottom   = element.offsetTop + element.offsetHeight + gap;
    let objLeft     = element.offsetLeft;
    let objRight    = element.offsetLeft + element.offsetWidth + gap;
    
    // console.log({
    //     top: newTop,
    //     bottom: newBottom,
    //     left: newLeft,
    //     right: newRight,
    //     _etop: objTop,
    //     _ebottom: objBottom,
    //     _eleft: objleft,
    //     _eright: objRight,
    //     __above: (newBottom < objTop),
    //     __below: (newTop > objBottom),
    //     __left: (newRight < objLeft),
    //     __right: (newLeft > objRight),
    //     ___element: element
    // });

    let noOverlap = (newBottom < objTop) || // new is above element
                    (newTop > objBottom) || // new is below
                    (newRight < objLeft) || // new is left
                    (newLeft > objRight);   // new is right

    let result = !noOverlap;
    //console.log("Overlaping: ", result);
    return result;
}

// function for debugging random position
// displays red rectangle in the selected position
function displayTestObject(top, left, height, width){
    let test = document.createElement("span");

    test.style.top              = `${top}px`;
    test.style.left             = `${left}px`; 
    test.style.height           = `${height}px`;
    test.style.width            = `${width}px`;
    test.style.backgroundColor  = 'rgba(255,0,0,0.7)';
    test.classList.add('turnip');
    testCollection.appendChild(test);
    
    testTimeoutId = setTimeout(() => {
        test.remove();
    }, testLifespan - 5);
    
}

//restart the game
function clickedRestartButton() {
    score = 0;
    perSecond = 0;
    clearInterval(perSecondIntervalId);
}

//-----------------command lines-------------------------//

randomTurnipTimeoutId = setTimeout(setRandomTurnipTimeout, getRandom(500, 3000)); //show the first turnip

//first to do after reloading the page <- adding score if per-second is non zero value
clearInterval(perSecondIntervalId);
if(perSecondIntervalTime > 200) { //min interval is 200ms unless page lags
    perSecondIntervalId = setInterval(() => {
        score++;
    }, perSecondIntervalTime);
}
else {
    perSecondIntervalId = setInterval(() => {
        score += parseFloat((perSecond / 5).toFixed(0)); // perSecond / 5 because 200ms is 1s / 5
    }, 200);
}

//do after every 200ms
setInterval(() => {
    document.title = `${score} money - Clicker`; //update title
    minTurnipWidth = window.innerWidth; //update this value in case window width was changed
    //check if any button can be updated
    updateButtons.forEach(button => {
        var value = parseInt(button.classList[1]);
        if (score >= value) {
            button.classList.add('to-unlock');
        } else {
            button.classList.remove('to-unlock');
        }
    });
    //add score and per-second to the local storage
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('per-second', JSON.stringify(perSecond));
    
    //update text content
    scoreText.textContent = score;
    perSecondText.textContent = perSecond;
}, 200);

updateButtons.forEach(button => button.addEventListener('click', clickedUpdatePerSecond));
clickerButton.addEventListener('click', clickedClickerButton);
restartButton.addEventListener('click', clickedRestartButton);