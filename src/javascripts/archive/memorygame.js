let gameContainer = document.getElementById("game");
let size = 4;
let totalCards = size*size;

let cardContents = [];
let cardStatuses = [];

function updateLevel() {
    // generate cards
    for(let rows=0;rows<size; rows++) {
        let cardRow = document.createElement("div");
        cardRow.classList.add("card-row");
        cardRow.setAttribute("id", `card-row-${rows}`);
        gameContainer.appendChild(cardRow);

        for(let cols=0;cols<size; cols++) {
            let card = document.createElement("div");
            cardRow.appendChild(card);
            card.classList.add("card");
            card.setAttribute("id", `card-${rows}-${cols}`)

            let cardText = document.createElement("p");
            card.appendChild(cardText);
            cardText.classList.add("card-text");
            cardText.setAttribute("id", `card-text-${rows}-${cols}`);
            cardText.innerHTML = "?";

            // on-click
            card.addEventListener("click", function(event) {
                event.preventDefault();

                cardClicked(event.target.id);
            });

            // fill card-statuses array
            cardStatuses.push(false);
        }
    }

    // generate card contents
    let numbers = [];
    let possibleCombs = [];
    for(let i=1;i<(totalCards/2)+1;i++) {
        possibleCombs.push(i); possibleCombs.push(i);
    }
    for(let i=0; i<possibleCombs.length; i++) {
        numbers.push(possibleCombs[i]);
    }

    for(let i=0;i<totalCards; i++) {
        let random = Math.floor(Math.random() * numbers.length);
        cardContents.push(numbers[random]);
        numbers.splice(random, 1);
    }
}
updateLevel();
function warn(text, type, buttonText, buttonAction) {
    let warningBox = document.getElementById("warning");
    let warningText = document.getElementById("warning-text");
    let successBox = document.getElementById("success");
    let successText = document.getElementById("success-text");
    if(type === "alert") {
        warningText.innerHTML = text;
        warningBox.style.display = "block";

        let button = document.getElementById("warning-button")
        if(buttonText != null) {
            button.innerHTML = buttonText;
            button.style.display = "block";
        }

        button.addEventListener("click", function(event) {
            event.preventDefault();
            if(buttonAction === "reset") {
                updateLevel("reset");
                updateLevel("update");
            }
            button.style.display = "none";
            warningBox.style.display = "none";
        });

        // gsap.fromTo(warningBox, {opacity: 0}, {opacity: 1, duration: 0.5});
        // gsap.fromTo(warningBox, {y: -50}, {y: 0, duration: 0.5});

        setTimeout(function () {
            warningBox.style.display = "none";
            button.style.display = "none";
        }, 5000);
    } else if(type === "success") {
        successBox.style.display = "block";
        successText.innerHTML = text;

        setTimeout(function () {
            successBox.style.display = "none";
        }, 3000);
    } else if(type === "fail") {
        successText.innerHTML = text;
        successBox.style.display = "block";
        successBox.style.backgroundColor = "#ff5353";

        setTimeout(function () {
            successBox.style.display = "none";
        }, 3000);
    }
}

// check for card clicks
let cardsFlipped = 0;

let currCard = {
    contents: null,
    rc: null,
    row: null,
    col: null,
    numPos: null
};
let card1 = {
    contents: null,
    rc: null,
    row: null,
    col: null,
    numPos: null
};

function flipCard(rc) {
    let row = parseInt(rc.substring(0,1));
    let col = parseInt(rc.substring(2,3));
    let pos = row*size+col;

    let targetText = document.getElementById(`card-text-${rc}`);
    if(!cardStatuses[pos]) {
        // card is not flipped; flip over
        targetText.innerHTML = currCard.contents;
    } else {
        // card is flipped; flip back
        targetText.innerHTML = "?";
    }
}
function cardClicked(cardClicked) {
    let currNum = parseInt(cardClicked.substring(5,6))*size+parseInt(cardClicked.substring(7,8));

    // pre-checks
    if(cardsFlipped >= 2) {
        warn("You have already flipped two cards!", "alert");
        return;
    }
    if(cardStatuses[currNum]) {
        warn("This card has already been flipped!", "alert");
        return;
    }

    currCard.contents = cardContents[currNum].toString();

    currCard.rc = cardClicked.substring(5,8);
    currCard.row = parseInt(cardClicked.substring(5,6));
    currCard.col = parseInt(cardClicked.substring(7,8));
    currCard.numPos = currNum;

    cardsFlipped++;
    cardStatuses[currCard.numPos] = true;

    // update card
    flipCard(currCard.rc);

    if(cardsFlipped === 1) {
        // first card
        Object.assign(card1, currCard);
    } else if(cardsFlipped === 2) {
        // check if match
        if(card1.contents === currCard.contents) {
            // match
            warn("Match!", "success");
            cardStatuses[card1.numPos] = true;
            cardStatuses[currCard.numPos] = true;
        } else {
            // no match
            warn("No match!", "fail");

            // flip cards back
            setTimeout(function() {
                // update card
                let targetText1 = document.getElementById(`card-text-${card1.rc}`);
                targetText1.innerHTML = "";


                let targetText2 = document.getElementById(`card-text-${currCard.rc}`);
                targetText2.innerHTML = "";

                // reset card statusesno
                cardStatuses[card1.numPos] = false;
                cardStatuses[currCard.numPos] = false;
            }, 2000);
        }


        // reset
        setTimeout(function() {
            currCard = {};
            card1 = {};
            cardsFlipped = 0;
        }, 2010);
    }
}