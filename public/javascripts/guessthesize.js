let triesLeft = 3;
let wins = 0;
let size
let tryIncrement = 1;

// Text size constraints
let max = 100;
let multiple = 5;
let GTStext = document.getElementById("gts-text");
let triesLeftText = document.getElementById("tries-text");

let numbersGuessed = [];

document.getElementById("fullscr").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("fullscr").style.display = "none";
});

function warn(text, type) {
    let warningBox = document.getElementById("warning");
    let warningText = document.getElementById("warning-text");
    let fullScrBox = document.getElementById("fullscr");
    let fullScrText = document.getElementById("fullscr-text");

    if(type === "alert") {
        warningText.innerHTML = text;
        warningBox.style.display = "block";

        setTimeout(function () {
            warningBox.style.display = "none";
        }, 5000);
    } else if(type === "success") {
        fullScrText.innerHTML = text;
        fullScrBox.style.display = "block";
        fullScrBox.style.opacity = "0";
        fullScrBox.style.backgroundColor = "#22ff89";

        setTimeout(function () {
            fullScrBox.style.display = "none";
        }, 3000);
    } else if(type === "fail") {
        fullScrText.innerHTML = text;
        fullScrBox.style.display = "block";
        fullScrBox.style.backgroundColor = "#ff5353";

        setTimeout(function () {
            fullScrBox.style.display = "none";
        }, 3000);
    }
}
updateLevel();
function updateLevel() {
    if(triesLeft-1 > 0) {
        let levelDiv = document.getElementById("level");
        let levelText = document.getElementById("level-text");
        let level = wins + 1;

        // Focus on the input box & clear
        document.getElementById("GTSinput").focus();
        document.getElementById("GTSinput").value = "";

        // Clearing the numbers guessed list
        numbersGuessed = [];

        // Updating the try increment
        tryIncrement = level - 1;
        triesLeftText.innerHTML = "Tries left: " + triesLeft;

        // Updating the multiple
        if (wins < 10) {
            multiple = 10 - wins;
        } else {
            multiple = 1;
        }
        generateSize();

        // Updating the level display
        levelText.innerHTML = "Level " + level + " - mul. of " + multiple;
        if (wins < 10) {
            levelDiv.style.backgroundColor = "rgb(" + ((wins + 15) * 10) + ", 0, 0)";
        } else {
            levelDiv.style.backgroundColor = "rgb(255, 0, 0)";
        }

        // Updating the text contents
        const randomContent = ["Interesting...", "Why, hello there!", "AAAHHHHH", "A wise man once said...",
            "Cheese", "Wow", "To be or not to be...", "...That is the question", "I'm a little teapot...", "...Or am I?"]
        GTStext.innerHTML = randomContent[Math.floor(Math.random() * randomContent.length)];
    } else {
        alert("You have no more tries left :(. Better luck next time!");
        //TODO: add a "play again" button to the context box
    }
}
function generateSize() {
    let sizeList = [];
    for (let i = multiple; i <= max; i += multiple) {
        sizeList.push(i);
    }
    size = sizeList[Math.floor(Math.random() * sizeList.length)];
    GTStext.style.fontSize = size + "px";
}

document.getElementById("GTSinput").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("GTSbutton").click();
    }
});

let cheat = false;
function detectDevToolsOpen() {
    let threshold = 160;
    let widthThreshold = window.outerWidth - window.innerWidth > threshold;
    let heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if(widthThreshold || heightThreshold) {
        cheat = true;
    }
    return widthThreshold || heightThreshold;
}

setInterval(detectDevToolsOpen, 1000);

function validate() {
    let input = parseInt(document.getElementById("GTSinput").value);

    // Pre-checks
    if(input > 100) {
        warn("Number exceeds limit. Please enter a number less than 100", "alert");
        return;
    }
    if(input % multiple !== 0) {
        warn("Number doesn't match constraints. Please enter a multiple of " + multiple, "alert");
        return;
    }
    if(numbersGuessed.includes(input)) {
        warn("Duplicate guess. Please enter a number you haven't tried", "alert");
        return;
    }

    if(cheat === false) {
        if (triesLeft !== 0) {
            if (input === size) {
                warn("Correct!", "success");
                wins++;
                triesLeft += tryIncrement;
                updateLevel();
            } else {
                warn(`Incorrect... Try again. You have ${triesLeft-1} tries left`, "fail");

                triesLeft--;
                triesLeftText.innerHTML = "Tries left: " + triesLeft;
                console.log(size);
                console.log(input);

                numbersGuessed.push(input);
            }
        } else {
            gsap.to("#tries-text", {duration: 0.2, color: "#ff4e4e"});
            gsap.to("#tries-text", {duration: 0.2, rotate: "+=20"});
            gsap.to("#tries-text", {duration: 0.2, rotate: "-=40"});
            gsap.to("#tries-text", {duration: 0.2, color: "#000000"});
        }
    } else {
        warn("Anti-cheat validation failed: Please close all side bars and try again.", "alert")

        // TODO: fix this (PJM-28)
        clearInterval(detectDevToolsOpen());
        // wait 3 seconds
        setTimeout(function() {
            // then start it again
            setInterval(detectDevToolsOpen, 1000);
        }, 3000);

        generateSize();
        cheat = false;
    }
}
