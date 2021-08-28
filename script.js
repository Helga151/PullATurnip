const moneyText = document.querySelector('.score');
const buttons = document.querySelectorAll('.search');
const costs = document.querySelectorAll('.cost');
const perSecondText = document.querySelector('.per-second');
const currentObjects = document.querySelector('.current-objects');
var money = 0;
var perSecond = 0;
var intervalTime = 1000;
var nazwa;
var multiplierCost = 2;
var multiplierPerSecond = 0.1;

function search() {
    let value = parseInt(this.classList[1]);
    if (this.classList.contains('locked')) {
        if (money >= value) {
            money -= value;
            //this.classList.add('unlocked');
            //this.classList.remove('locked');
            this.classList.remove('to-unlock');

            //change cost of clicked element
            this.classList.replace(value, value * multiplierCost);
            costs.forEach(cost => {
                if(cost.parentElement === this) {
                    cost.textContent = value * multiplierCost;
                    //console.log(cost);
                }
            });
            
            perSecond += value * multiplierPerSecond;
            perSecondText.textContent = perSecond;
            intervalTime = Math.round(1000 / perSecond);
            
            //interval adding money perSecond
            clearInterval(nazwa);
            nazwa = setInterval(() => {
                money++;
                moneyText.textContent = money;
            }, intervalTime);
            
            console.log({money, value, perSecond});
            console.log(this);
        }
    } //else if (this.classList.contains('unlocked')) return;
    else {
        //console.log(value);
        money += value;
    }
    moneyText.textContent = money;
}

setInterval(() => {
    document.title = `${money} money - Clicker`; //update title
    buttons.forEach(button => {
        var value = parseInt(button.classList[1]);
        if (button.classList.contains('locked')) {
            if (money >= value) {
                button.classList.add('to-unlock');
            }
            else {
                button.classList.remove('to-unlock');
            }
        }
    });
}, 100); 

buttons.forEach(button => button.addEventListener('click', search));

//rendering turnip on the screen
function getNewTurnip() {
    let turnip = document.createElement("span");
}






