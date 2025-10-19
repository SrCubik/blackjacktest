let values = [];
let images = [];

let dealerValues = [];
let dealerImages = [];
let hiddenCardHTML = "";

let shouldButtonWork = true;

const startButton = document.getElementById("start");
const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");

let moneyInput = document.getElementById("money");
const moneyAmount = document.getElementById("amountMoney");
let balance = 10;
moneyAmount.textContent = balance + "$";

moneyInput.addEventListener('input', function () {
    let moneyValue = moneyInput.value;
    if (balance < moneyValue){
        moneyInput.value = balance; 
    }
})
moneyInput.addEventListener('input', function () {
    let moneyValue = moneyInput.value;
    if (moneyValue < 0){
        moneyInput.value = 1; 
    }
})

startButton.addEventListener("click", function () {
    let moneyValue = moneyInput.value;
    if (balance < moneyValue){
        moneyInput.value = balance; 
    }
    if (balance <= 0){
        moneyAmount.textContent = "not enough money";
        shouldButtonWork = false;
    }
    
    if (shouldButtonWork == true) {
        hitButton.disabled = false;
        standButton.disabled = false;
        moneyInput.disabled = true;
    } else {
        hitButton.disabled = true;
        standButton.disabled = true;
        moneyInput.disabled = false;
}});

hitButton.addEventListener("click", function () {
    if (shouldButtonWork == true) {
        hitButton.disabled = false;
        standButton.disabled = false;
    } else {
        hitButton.disabled = true;
        standButton.disabled = true;
        moneyInput.disabled = false;
}});
standButton.addEventListener("click", function () {
    if (shouldButtonWork == true) {
        standButton.disabled = false;
        hitButton.disabled = false;
    } else {
        standButton.disabled = true;
        hitButton.disabled = true;
        moneyInput.disabled = false;
}});


function sum(arr){
    let total = 0;
    let aces = 0;
    for(let i = 0; i < arr.length; i++){
        total += Number(arr[i]);
        if (arr[i] == 11) aces++;
    }

    while(total > 21 && aces > 0){
        total -= 10;
        aces --;
    }
    return total;
}
function start(){
    startButton.disabled = true;
    shouldButtonWork = true;
    const winResult = document.getElementById("winResult")
    winResult.textContent = "";
    const dealerImage = document.getElementById("dealerImage")
    const dealerResult = document.getElementById("dealerResult")
    const cardImage = document.getElementById("cardImage");
    const cardResult = document.getElementById("cardResult");
    values = [];
    images = [];
    dealerImages = [];
    dealerValues = [];
    hiddenCardHTML = "";

    dealPlayer();
    const total = sum(values);
    cardResult.textContent = total;
    cardImage.innerHTML = images.join("");

    
    dealDealer();
    dealDealer(true);
    dealerImage.innerHTML = dealerImages.join("");
    dealerResult.textContent = dealerValues[0];
    


}
function dealPlayer(){
    let value;
    let face;
    for(let i = 0; i < 2; i++){
        value = Math.floor(Math.random() * 13) + 1;
        face = Math.floor(Math.random() * 4) + 1;
        switch (face) {
            case 1:
                face = "spade"
                break;
            case 2:
                face = "club"
                break;
            case 3:
                face = "heart"
                break;
            case 4:
                face = "diamond"
                break;
            default:
                break;
        }
        if (value == 1){
            values.push(11)
        }else if (value >= 11 && value <= 13){
            values.push(10);
        }else{values.push(value);}
        images.push(`<img id=img${i} src=cards/${value}${face}.png>`)    
    }
}
function dealDealer(hidden = false){
    let value = Math.floor(Math.random() * 13) + 1;
    let face = Math.floor(Math.random() * 4) + 1;
        switch (face) {
            case 1:
                face = "spade"
                break;
            case 2:
                face = "club"
                break;
            case 3:
                face = "heart"
                break;
            case 4:
                face = "diamond"
                break;
            default:
                break;
        }
        let cardValue;
        if (value == 1){
            cardValue = 11;
        }else if (value >= 11 && value <= 13){
            cardValue = 10;
        }else{
            cardValue = value;
        }
        dealerValues.push(cardValue);

        if(hidden){
            hiddenCardHTML = `<img id=realDealerCard src=cards/${value}${face}.png>`;
            dealerImages.push(`<img id=backcard src=cards/backcard.png>`); 
        }else{
            dealerImages.push(`<img src=cards/${value}${face}.png>`);
        } 
    }

function hit(){
    let value = Math.floor(Math.random() * 13) + 1;
    let face = Math.floor(Math.random() * 4) + 1;

    switch (face) {
            case 1:
                face = "spade"
                break;
            case 2:
                face = "club"
                break;
            case 3:
                face = "heart"
                break;
            case 4:
                face = "diamond"
                break;
            default:
                break;
        }
        if (value == 1){
            values.push(11)
        }else if (value >= 11 && value <= 13){
            values.push(10);
        }else{values.push(value);}
        
        images.push(`<img src=cards/${value}${face}.png>`)    
        cardImage.innerHTML = images.join("");

    const total = sum(values);
    cardResult.textContent = total;

    if (total > 21) {
        result(true);
        shouldButtonWork = false;
    }
}
function stand(){
revealDealerCard();

while (sum(dealerValues) < 17) {
        dealDealer();
        dealerImage.innerHTML = dealerImages.join("");
        dealerResult.textContent = sum(dealerValues);
    }
     
    const dealerTotal = sum(dealerValues);
    const playerTotal = sum(values);
    if (dealerTotal > 21) {
        resultDealer(false);
    } else if (dealerTotal > playerTotal) {
        resultDealer(true);
    } else if (dealerTotal < playerTotal) {
        resultDealer(false);
    } else {
        winResult.textContent = "draw";
        startButton.disabled = false;
    }
    shouldButtonWork = false;
}
function revealDealerCard(){
    const dealerImage = document.getElementById("dealerImage")
    const dealerResult = document.getElementById("dealerResult")
    dealerImages[1] = hiddenCardHTML;
    dealerImage.innerHTML = dealerImages.join("");

    const total = sum(dealerValues);
    dealerResult.textContent = total;
}
function result(win) {
    let winResult = document.getElementById("winResult")
    let moneyValue = moneyInput.value;

    if (win == true){
        winResult.textContent = "you lost";
        moneyDown(moneyValue);
        startButton.disabled = false;
    }else{
        winResult.textContent = "you win";
        moneyUp(moneyValue);
        startButton.disabled = false;
    }
}
function resultDealer(winDealer) {
    
    let winResult = document.getElementById("winResult")
    let moneyValue = moneyInput.value;
    if (winDealer == true){
        winResult.textContent = "you lost";
        moneyDown(moneyValue);
        startButton.disabled = false;
    }else{
        winResult.textContent = "you win";
        moneyUp(moneyValue);
        startButton.disabled = false;
    }
}

function moneyUp(moneyValue1) {
            balance += moneyValue1 * 2 - moneyValue1;
            moneyAmount.textContent = balance + "$";
            return balance;
}
function moneyDown(moneyValue1) {
            balance -= moneyValue1;
            moneyAmount.textContent = balance + "$";
            return balance;
}


