let password = 11234;
let inputted = [];

function validate(boxNumber) {
    let box = document.getElementById('box' + boxNumber);
    inputted[boxNumber - 1] = box.value;

    if (box.value.length >= 1) {
        if (boxNumber < 5) {
            let nextBox = document.getElementById('box' + (boxNumber + 1))
            nextBox.focus();
            if(box.value.length > 1) {
                box.value = box.value[0];
                nextBox.value = box.value[1];
            }
        } else {
            //check if password is correct
            let inputtedPassword = inputted.join('');
            checkPin(inputtedPassword);
        }
    }

    //detect backspace and go back a box
    if (event.key === "Backspace" && boxNumber > 1) {
        document.getElementById('box' + (boxNumber - 1)).focus();
    }
}

function checkPin(inputted) {
    // Compare the entered PIN with the correct PIN
    if (inputted === password) {
        // Store the result in localStorage if the PIN is correct
        localStorage.setItem("pinCorrect", "true");
        window.location.href = '/portfolio';
        //clear inputs
        for(let i=0; i<5; i++) {
            document.getElementById('box' + (i + 1)).value = '';
            //inputted = [];
        }
    } else {
        localStorage.setItem("pinCorrect", "false");
        alert('Incorrect password!');
    }
}

function stopPaste() {
    return false;
}
