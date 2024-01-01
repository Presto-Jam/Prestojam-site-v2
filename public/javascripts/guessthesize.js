let tries = 3;
let wins = 0;
let size

// Text size constraints
let max = 100;
let multiple = 5;
function generateSize() {
    let sizeList = [];
    for (let i = multiple; i <= max; i += multiple) {
        sizeList.push(i);
    }
    size = sizeList[Math.floor(Math.random() * sizeList.length)];
    GTStext.style.fontSize = size + "px";
}

let GTStext = document.getElementById("gts-text");
//set content of text

const randomContent = ["Interesting...", "Why, hello there!", "AAAHHHHH", "A wise man once sad...",
    "Cheese", "Wow", "To be or not to be...", "...That is the question", "I'm a little teapot...", "...Or am I?"]

GTStext.innerHTML = randomContent[Math.floor(Math.random() * randomContent.length)];

//generate text size
generateSize();

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
    if(cheat === false) {
        console.log("validation attempt: passed");
        let input = parseInt(document.getElementById("GTSinput").value);
        if (tries !== 0) {
            if (input === size) {
                alert("You win!");
                wins++;
            } else {
                alert("Try again..." + " " + tries + " tries left");
                tries--;
                console.log(size);
                console.log(input);
            }
        }
    } else {
        console.log("validation attempt: failed");
        alert("Validation attempt filed: Please close all side bars and try again.")

        clearInterval(detectDevToolsOpen);
        // wait 3 seconds
        setTimeout(function() {
            // then start it again
            setInterval(detectDevToolsOpen, 1000);
        }, 3000);

        generateSize();
        cheat = false;
    }
}
