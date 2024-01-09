let gameContainer = document.getElementById("game");
let size = 0;
let totalCards = 0;

let cardContents = [];
let cardStatuses = [];

let flipTime = 2000;

let level = 0;
let triesLeft = 0;
let timeLeft = 0;

function setTimerInterval() {
	let timerText = document.getElementById("timer-text");
	timerInterval = setInterval(function () {
		timeLeft--;

		timerText.innerHTML = "Time left: " + timeLeft;
		if (timeLeft <= 0) {
			clearInterval(timerInterval);
			warn("You ran out of time! Better luck next time!", "alert", "Play again", "reset");
			disabled = true;
		}
		timerText.style.color = "rgb(" + ((defaultTime-timeLeft) * 255/defaultTime) + ", 0, 0)";
	}, 1000);
}

function updateTimer(action) {
	if(action === "start") {
		setTimerInterval();
	} else if(action === "reset") {
		clearInterval(timerInterval);
		setTimerInterval(timeLeft)
	} else if(action === "clear") {
		clearInterval(timerInterval);
		document.getElementById("timer-text").innerHTML = "";
	}
}
function updateLevel(type) {
    // generate cards
	if(type === "update") {
		level++;

		if(level > 7) {updateTimer("clear");}

		if(level <= 6) {
			size = level * 2 // MAX: 6x6
			triesLeft = size*size + level*2; // MAX BONUS: 30
		} else if(level >= 7) {
			triesLeft = (size*size/2) + 20; // MAX BONUS: 20
			timeLeft = level*10; // MIN: 70
			updateTimer("start");
		}
		totalCards = size*size;

		document.getElementById("tries-text").innerHTML = `Tries left: ${triesLeft}`;
		document.getElementById("level-text").innerHTML = `Level ${level}`;

		// clear game
		document.getElementById("game").innerHTML = "";
		cardStatuses = [];
		cardContents = [];

		for (let rows = 0; rows < size; rows++) {
			let cardRow = document.createElement("div");
			cardRow.classList.add("card-row");
			cardRow.setAttribute("id", `card-row-${rows}`);
			gameContainer.appendChild(cardRow);

			for (let cols = 0; cols < size; cols++) {
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
				card.addEventListener("click", function (event) {
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
		for (let i = 1; i < (totalCards / 2) + 1; i++) {
			possibleCombs.push(i);
			possibleCombs.push(i);
		}
		for (let i = 0; i < possibleCombs.length; i++) {
			numbers.push(possibleCombs[i]);
		}

		for (let i = 0; i < totalCards; i++) {
			let random = Math.floor(Math.random() * numbers.length);
			cardContents.push(numbers[random]);
			numbers.splice(random, 1);
		}
	} else if(type === "reset") {
		level = 0;
	}
}
updateLevel("update");
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

        setTimeout(function () {
            warningBox.style.display = "none";
            button.style.display = "none";
        }, flipTime);
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

/**
 * @param {string} rc
 */
function flipCard(rc) {
    let row = parseInt(rc.substring(0,1));
    let col = parseInt(rc.substring(2,3));
    let pos = row*size+col;

    let targetText = document.getElementById(`card-text-${rc}`);
    if(!cardStatuses[pos]) {
        // card is not flipped; flip over
        targetText.innerHTML = cardContents[pos];
        targetText.style.fontSize = "50px";
        cardStatuses[pos] = true;
    } else {
        // card is flipped; flip back
        targetText.innerHTML = "?";
        cardStatuses[pos] = false;
        targetText.style.fontSize = "20px";
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
    flipCard(currCard.rc);

    if(cardsFlipped === 1) {
        // first card
        Object.assign(card1, currCard);
    } else if(cardsFlipped === 2) {
		triesLeft--;
		document.getElementById("tries-text").innerHTML = `Tries left: ${triesLeft}`
		if(triesLeft <= 0) {
			warn("You ran out of tries. Better luck next time!", "alert", "Try again", "reset");
		}


        // check if match
        if(card1.contents === currCard.contents) {
            // match
            warn("Match!", "success");
            cardStatuses[card1.numPos] = true;
            cardStatuses[currCard.numPos] = true;

            document.getElementById(`card-text-${card1.rc}`).style.color = "#00ff00";
            document.getElementById(`card-text-${currCard.rc}`).style.color = "#00ff00";
            reset();
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
                flipCard(card1.rc);
                flipCard(currCard.rc);

                reset();
            }, flipTime);
        }


        // reset
        function reset() {
            console.log("reset");
            currCard = {};
            card1 = {};
            cardsFlipped = 0;
        }


		// check if all card statuses are true
		if(cardStatuses.includes(false) === false) {
			updateLevel("update");
		}
    }
}