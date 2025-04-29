// This script will add an animation class to the sub-header element when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const subHeader = document.querySelector(".sub-header");
    const modelViewer = document.getElementById("model-viewer")
    subHeader.classList.add("animate");
    modelViewer.classList.add("animate");
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
