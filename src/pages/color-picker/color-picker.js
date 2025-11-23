document.addEventListener("DOMContentLoaded", function () {
  // File input element
  const fileInput = document.getElementById("fileInput");
  const fileInputContainer = document.getElementById("fileInputContainer");

  // Canvas and context
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");

  // Magnifier element
  const magnifier = document.createElement("div");
  magnifier.id = "magnifier";
  magnifier.style.display = "none"; // Initially hide the magnifier
  document.body.appendChild(magnifier);

  // Preview boxes
  const hoverPreviewBox = document.getElementById("hoverPreviewBox");
  const selectedPreviewBox = document.getElementById("selectedPreviewBox");

  // Flag to track the first pixel click
  let isFirstPixelClick = true;

  // Add event listener for file input change
  fileInput.addEventListener("change", handleFileSelect);

  // Function to handle file selection
  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const maxWidth = 800; // Maximum width for the displayed image
        const maxHeight = 600; // Maximum height for the displayed image

        // Calculate scaling factor to fit the image within the specified dimensions
        const scaleFactor = Math.min(
          maxWidth / img.width,
          maxHeight / img.height
        );

        // Calculate the scaled dimensions
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;

        // Resize canvas to fit the scaled image
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        // Draw the scaled image on the canvas
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
        canvas.style.display = "block";
        fileInputContainer.style.display = "none"; // Hide upload file section
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  // Add event listeners for drag and drop
  fileInputContainer.addEventListener("dragover", handleDragOver);
  fileInputContainer.addEventListener("dragleave", handleDragLeave);
  fileInputContainer.addEventListener("drop", handleDrop);

  // Function to handle drag over
  function handleDragOver(event) {
    event.preventDefault();
    fileInputContainer.classList.add("dragover");
  }

  // Function to handle drag leave
  function handleDragLeave(event) {
    event.preventDefault();
    fileInputContainer.classList.remove("dragover");
  }

  // Function to handle drop
  function handleDrop(event) {
    event.preventDefault();
    fileInputContainer.classList.remove("dragover");
    const file = event.dataTransfer.files[0];
    handleFileSelect({ target: { files: [file] } });
  }

  // Add event listener for canvas mousemove (hovered pixel)
  canvas.addEventListener("mousemove", handlePixelHover);

  // Function to handle mousemove on the canvas (hovered pixel)
  function handlePixelHover(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelColor = imageData.data;
    const hexColor = rgbToHex(pixelColor[0], pixelColor[1], pixelColor[2]);

    // Update hover preview box
    hoverPreviewBox.style.backgroundColor = hexColor;
  }

  // Add event listener for canvas click (pixel selection)
  canvas.addEventListener("click", handlePixelClick);

  // Function to handle pixel click
  function handlePixelClick(event) {
    // Get the color information of the clicked pixel
    const x = event.offsetX;
    const y = event.offsetY;
    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelColor = imageData.data;

    // Convert RGB to HEX
    const hexColor = rgbToHex(pixelColor[0], pixelColor[1], pixelColor[2]);

    // Set the selected preview box background color to the hex code value
    selectedPreviewBox.style.backgroundColor = hexColor;

    // Update the color code input with the hex code value
    document.getElementById("colorCode").value = hexColor;

    // Update flag to indicate that pixel has been clicked
    isFirstPixelClick = false;
  }

  // Function to convert RGB to HEX
  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Add event listener for copy button click
  document
    .getElementById("copyButton")
    .addEventListener("click", copyToClipboard);

  // Function to copy color code to clipboard
  function copyToClipboard() {
    const colorCodeInput = document.getElementById("colorCode");
    colorCodeInput.select();
    document.execCommand("copy");

    // Change button text to "Copied"
    const copyButton = document.getElementById("copyButton");
    copyButton.textContent = "Copied";

    // Change back to "Copy" after 5 seconds
    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 5000);
  }

  // Add event listener for clear button click
  document
    .getElementById("clearButton")
    .addEventListener("click", clearFileInput);

  // Function to clear file input and show upload section
  function clearFileInput() {
    fileInput.value = ""; // Reset file input value
    canvas.style.display = "none"; // Hide canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    document.getElementById("colorCode").value = ""; // Clear color code input
    magnifier.style.display = "none"; // Hide magnifier
    isFirstPixelClick = true; // Reset flag for pixel clicks
    fileInputContainer.style.display = "block"; // Show upload file section

    // Reset preview boxes
    hoverPreviewBox.style.backgroundColor = "transparent";
    selectedPreviewBox.style.backgroundColor = "transparent";
  }
});
