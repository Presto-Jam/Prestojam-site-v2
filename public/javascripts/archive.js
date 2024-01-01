// Import the GSAP library
import { gsap } from 'gsap';

// Get the target element for the sideways scroll
const targetElement = document.querySelector('.scroll-container');

// Set the scroll destination (x-coordinate)
const scrollDestination = 500;

// Animate the sideways scroll using GSAP
gsap.to(targetElement, {
    duration: 2, // Scroll duration (seconds)
    x: -scrollDestination, // Scroll destination (negative value for sideways scroll)
    ease: 'power2.inOut', // Easing function for smooth scrolling
});