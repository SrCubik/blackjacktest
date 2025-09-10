let values = [];
let images = [];

let dealerValues = [];
let dealerImages = [];
let hiddenCardHTML = "";

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
    cardResult.textContent = "card: " + total;
    cardImage.innerHTML = images.join("");

    
    dealDealer();
    dealDealer(true);
    dealerImage.innerHTML = dealerImages.join("");
    dealerResult.textContent = "card: " + dealerValues[0];
    


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
    cardResult.textContent = "card: " + total;

    if (total > 21) {
        winResult.textContent = "you BUSTED";
    }
}
function stand(){
revealDealerCard();

while (sum(dealerValues) < 17) {
        dealDealer();
        dealerImage.innerHTML = dealerImages.join("");
        dealerResult.textContent = "card: " + sum(dealerValues);
    }
     
    const dealerTotal = sum(dealerValues);
    const playerTotal = sum(values);
    if (dealerTotal > 21) {
        winResult.textContent = "the dealer BUSTED";
    } else if (dealerTotal > playerTotal) {
        winResult.textContent = "you lose";
    } else if (dealerTotal < playerTotal) {
        winResult.textContent = "you win";
    } else {
        winResult.textContent = "draw";
    }
}
function revealDealerCard(){
    const dealerImage = document.getElementById("dealerImage")
    const dealerResult = document.getElementById("dealerResult")
    dealerImages[1] = hiddenCardHTML;
    dealerImage.innerHTML = dealerImages.join("");

    const total = sum(dealerValues);
    dealerResult.textContent = "card: " + total;
}

