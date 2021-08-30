const scoreText = document.querySelector('.score-text');
const buttons = document.querySelectorAll('.search');
const costs = document.querySelectorAll('.cost');
const perSecondText = document.querySelector('.per-second');
const currentObjects = document.querySelector('.current-objects');
const gameObejct = document.querySelector('.game');

var score = 0;
var perSecond = 0; //money added to score per second
var perSecondIntervalTime = 1000;
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

//an array of turnip drawings
var turnipPictures = new Array(
    "images/yellow_turnip.png",
    "images/violet_white_wide_turnip.png",
    "images/white_turnip.png"
);


