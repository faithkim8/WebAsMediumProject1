document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".image-grid");
    const imageFolder = "images"; // Folder containing images
    const totalImages = 400; // Max number of images available
    let imageList = [];

    // Generate an array of image names (assuming they're named image1.jpg to image400.jpg)
    for (let i = 1; i <= totalImages; i++) {
        imageList.push(`${imageFolder}/image${i}.jpg`);
    }

    function updateGridSize() {
        let cols = Math.floor(window.innerWidth / 50); // Adjust based on desired min size
        let rows = Math.floor(window.innerHeight / 50);

        // Ensure at least a 2x2 grid, but cap at 20x20
        cols = Math.max(2, Math.min(cols, 20));
        rows = Math.max(2, Math.min(rows, 20));

        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // Clear existing images and generate new ones
        grid.innerHTML = ""; // Remove previous images
        let numCells = cols * rows;

        for (let i = 0; i < numCells; i++) {
            let imgSrc = imageList[i % imageList.length]; // Loop images if fewer than 400
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");

            let img = document.createElement("img");
            img.src = imgSrc;
            img.alt = `Image ${i + 1}`;

            gridItem.appendChild(img);
            grid.appendChild(gridItem);
        }
    }

    function updateViewportSize() {
        let viewportBox = document.getElementById("viewport-size");

        if (!viewportBox) {
            // Create the viewport display box if it doesn’t exist
            viewportBox = document.createElement("div");
            viewportBox.id = "viewport-size";
            document.body.appendChild(viewportBox);
        }

        // Update text content with current viewport size
        viewportBox.textContent = `Viewport: ${window.innerWidth}px × ${window.innerHeight}px`;
    }

    // Run both functions on page load & window resize
    updateGridSize();
    updateViewportSize();

    window.addEventListener("resize", () => {
        updateGridSize();
        updateViewportSize();
    });
});

