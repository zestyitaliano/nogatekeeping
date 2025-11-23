function calculateProportional() {
    var originalWidth = parseFloat(document.getElementById("originalWidth").value.trim());
    var originalHeight = parseFloat(document.getElementById("originalHeight").value.trim());
    var dimensionType = document.getElementById("dimensionType").value;
    var newDimensionValue = parseFloat(document.getElementById("newDimensionValue").value.trim());
    var resultElement = document.getElementById("result");

    if (isNaN(originalWidth) || isNaN(originalHeight) || isNaN(newDimensionValue)) {
        resultElement.innerText = "Please enter valid numbers for all fields.";
        resultElement.style.backgroundColor = "";
        return;
    }

    if (originalWidth <= 0 || originalHeight <= 0 || newDimensionValue <= 0) {
        resultElement.innerText = "Width, height, and new dimension must be positive numbers.";
        resultElement.style.backgroundColor = "";
        return;
    }

    var aspectRatio = originalWidth / originalHeight;
    var newWidth, newHeight;

    if (dimensionType === "width") {
        newWidth = newDimensionValue;
        newHeight = newWidth / aspectRatio;
    } else {
        newHeight = newDimensionValue;
        newWidth = newHeight * aspectRatio;
    }

    resultElement.innerText = "New Width: " + newWidth.toFixed(2) + ", New Height: " + newHeight.toFixed(2);
    resultElement.style.backgroundColor = "#efefef";
}

function clearValues() {
    document.getElementById("originalWidth").value = "";
    document.getElementById("originalHeight").value = "";
    document.getElementById("newDimensionValue").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("result").style.backgroundColor = "";
}

function copyDimension(dimensionType) {
    var resultText = document.getElementById("result").innerText;
    var dimensionValue = resultText.split(dimensionType === "width" ? "Width: " : "Height: ")[1].split(",")[0].trim();
    navigator.clipboard.writeText(dimensionValue);

    // Change button text to "Width Copied" or "Height Copied"
    var buttonId = dimensionType === "width" ? "copyWidthButton" : "copyHeightButton";
    var originalText = document.getElementById(buttonId).innerText;
    document.getElementById(buttonId).innerText = dimensionType === "width" ? "Width Copied" : "Height Copied";

    // Change back to original text after 5 seconds
    setTimeout(function() {
        document.getElementById(buttonId).innerText = originalText;
    }, 5000);
}
