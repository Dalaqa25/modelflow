// This script will add an animation class to the sub-header element when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const subHeader = document.querySelector(".sub-header");
    subHeader.classList.add("animate");
});

// this script will chnage the words
document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the class 'changable-text'
    const changableTexts = document.querySelectorAll(".changable-text");

    // Define the words to cycle through
    const words = [
        ["Discover", "Upload"],
        ["Buy", "Host"]
    ];

    // Initialize a counter
    let index = 0;

    // Function to update the text with animation
    function updateText() {
        changableTexts.forEach((element, i) => {
            // Add slide-out animation
            element.classList.add("slide-out");

            // Wait for the slide-out animation to complete
            setTimeout(() => {
                // Update the text content
                element.textContent = words[i][index];

                // Remove slide-out and add slide-in animation
                element.classList.remove("slide-out");
                element.classList.add("slide-in");

                // Remove slide-in class after animation
                setTimeout(() => {
                    element.classList.remove("slide-in");
                }, 500); // Match the duration of the CSS animation
            }, 500); // Match the duration of the CSS animation
        });

        // Increment the index and reset if it exceeds the array length
        index = (index + 1) % words[0].length;
    }

    // Call the function every 3 seconds
    setInterval(updateText, 5000);
});


const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
let isCursorMoving = false;

// Function to generate a gradient of colors with three stops
function generateGradientColors(count) {
    const startColor = [23, 190, 227]; // RGB for #17BEE3
    const midColor = [175, 45, 255];  // RGB for #af2dff
    const endColor = [255, 122, 24]; // RGB for #ff7a18
    const colors = [];

    for (let i = 0; i < count; i++) {
        let r, g, b;

        if (i < count / 2) {
            // Interpolate between startColor and midColor
            const t = (i / (count / 2));
            r = Math.round(startColor[0] + (midColor[0] - startColor[0]) * t);
            g = Math.round(startColor[1] + (midColor[1] - startColor[1]) * t);
            b = Math.round(startColor[2] + (midColor[2] - startColor[2]) * t);
        } else {
            // Interpolate between midColor and endColor
            const t = ((i - count / 2) / (count / 2));
            r = Math.round(midColor[0] + (endColor[0] - midColor[0]) * t);
            g = Math.round(midColor[1] + (endColor[1] - midColor[1]) * t);
            b = Math.round(midColor[2] + (endColor[2] - midColor[2]) * t);
        }

        colors.push(`rgb(${r}, ${g}, ${b})`);
    }

    return colors;
}

// Generate colors for the circles
const colors = generateGradientColors(circles.length);

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index];
});

// Event listener for mouse movement
window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
    isCursorMoving = true;

    // Show circles when the cursor moves
    circles.forEach(circle => {
        circle.classList.add("show");
        circle.classList.remove("hide");
    });

    // Reset the cursor movement flag after a delay
    clearTimeout(window.cursorTimeout);
    window.cursorTimeout = setTimeout(() => {
        isCursorMoving = false;
        hideCircles();
    }, 1000); // 1 second of inactivity
});

// Event listener for when the cursor leaves the page
window.addEventListener("mouseleave", function () {
    hideCircles();
});

// Function to hide the circles
function hideCircles() {
    if (!isCursorMoving) {
        circles.forEach(circle => {
            circle.classList.add("hide");
            circle.classList.remove("show");
        });
    }
}

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();