//texts
const scoreText = document.querySelector('.score-text');
const perSecondText = document.querySelector('.per-second');
const currentObjects = document.querySelector('.current-objects');
//buttons
const updateButtons = document.querySelectorAll('.update');
const clickerButton = document.querySelector('.clicker');
const restartButton = document.querySelector('.restart');
//objects in buttons
const costs = document.querySelectorAll('.cost');
const boughtIndexes = document.querySelectorAll('.bought-index');
//other containers
const gameObejct = document.querySelector('.game');
const rightSection = document.querySelector('.right-section');
const infoContainer = document.querySelector('.info-container');
const parting = document.querySelector('.parting');

//array to store boughtIndexes text content, not the whole span
var boughtIndexesArray = JSON.parse(localStorage.getItem('boughtIndexesArray')) || new Array(boughtIndexes.length).fill("0"); 
var costsArray = new Array(costs.length); //array to store costs
//if costsArray from local storage is not empty add it to costsArray variable
if(JSON.parse(localStorage.getItem('costsArray'))) costsArray = JSON.parse(localStorage.getItem('costsArray'));
else {
    for(let i = 0; i < costs.length; i++) {
        costsArray[i] = costs[i].textContent;
    }
}

var score = JSON.parse(localStorage.getItem('score')) || 0; //get score from the local storage or set 0 if ls is empty
var perSecond = JSON.parse(localStorage.getItem('per-second')) || 0; //money added to score per second
var perSecondIntervalTime = perSecond > 0 ? Math.round(1000 / perSecond) : 1000;
var perSecondIntervalId;

var multiplierCost = 2; //what will be the cost of another update
var multiplierPerSecond = 0.01; //multiplier of button values defining how much money per second will be added to score

//min and max bonus for clicking on turnip picture
var minBonus = 1; 
var maxBonus = 2;

//how long a turnip will be on the screen
var minTuripLifeDuration = 5000;
var maxTuripLifeDuration = 10000;

//how fast a next turnip will be added to the screen
var minTuripTimeout = 500;
var maxTuripTimeout = 3000;

//min width property of a turnip - it will be a random % from window width
var minTurnipWidth = window.innerWidth;

// how many re-tries to spawn turnip (if the position is invalid)
var retryLimit = 30; 
// how many turnips can be displayed at once
var turnipLimit = 300;

//an array of turnip drawings
var turnipPictures = new Array(
    "images/yellow_turnip.png",
    "images/violet_white_wide_turnip.png",
    "images/white_turnip.png"
);

scoreText.textContent = score;
perSecondText.textContent = perSecond.toFixed(1);
for(let i = 0; i < boughtIndexes.length; i++) { 
    boughtIndexes[i].textContent = boughtIndexesArray[i];
    costs[i].textContent = costsArray[i];
    //updateButtons[i].classList[1].replace(10, costsArray[i]);
}

// -------------- debug ----------------
var testCollection = document.querySelector(".test-objects");

var testTimeoutId;
var testLifespan = 700;

// debug stop snippet
//clearTimeout(testTimoutId); retryLimit = 0;

