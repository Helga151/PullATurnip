const scoreText = document.querySelector('.score-text');
const buttons = document.querySelectorAll('.search');
const costs = document.querySelectorAll('.cost');
const perSecondText = document.querySelector('.per-second');
const currentObjects = document.querySelector('.current-objects');

var score = 0;
var perSecond = 0;
var perSecondIntervalTime = 1000;
var perSecondIntervalId;
var multiplierCost = 2;
var multiplierPerSecond = 0.01;
var minBonus = 1;
var maxBonus = 2;
var minTuripLifeDuration = 1000;
var maxTuripLifeDuration = 3000;

var turnipPictures = new Array(
    "https://img.redro.pl/fototapety/rzepa-400-35388854.jpg",
    "https://media.istockphoto.com/photos/turnip-picture-id174687596",
    "https://cdn.w600.comps.canstockphoto.com/rzepa-zbiory-fotografii_csp19305500.jpg",
    "https://st2.depositphotos.com/1011480/6625/v/600/depositphotos_66253189-stock-illustration-turnip-vector-illustration-hand-drawn.jpg",
    "https://sklep.swiatkwiatow.pl/images/companies/1/nasiona-rzepy.jpg",
    "https://stalowezdrowie.pl/wp-content/uploads/2020/07/czarna-rzepa-696x428.jpg"
);


