const bk = document.getElementById("index-background");
const heroText = document.getElementById("hero-title");

function randomBkColor() {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	bk.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;


	// check if text needs to be light or dark
	let textDarkMode;
	let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
	textDarkMode = luma >= 150;

	let allText = document.getElementsByTagName("*");
	let sectionLine = document.getElementsByClassName("line");
	if(textDarkMode) {
		for(let i = 0; i < allText.length; i++) {
			if(!allText[i].classList.contains("keep-color")) {
				allText[i].style.color = "#000000";
			}
		}
		for(let i = 0; i < sectionLine.length; i++) {
			sectionLine[i].style.backgroundColor = "#000000";
		}
		heroText.style.color = "#000000";
	} else {
		for(let i = 0; i < allText.length; i++) {
			if(!allText[i].classList.contains("keep-color")) {
				allText[i].style.color = "#ffffff";
			}
		}
		for(let i = 0; i < sectionLine.length; i++) {
			sectionLine[i].style.backgroundColor = "#ffffff";
		}
		heroText.style.color = "#ffffff";
	}
}
randomBkColor();

// change color when mouseEnters a section
let sections = document.getElementsByClassName("section");
for(let i = 0; i < sections.length; i++) {
	sections[i].addEventListener("mouseenter", function() {
		randomBkColor();
	});
}
