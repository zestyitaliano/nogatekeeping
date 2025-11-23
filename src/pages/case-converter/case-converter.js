// Function to handle pasting text into the text field
document.getElementById("text-input").addEventListener("paste", function (event) {
  // Delay the handling of the paste event to allow the pasted text to be inserted
  setTimeout(function () {
    // Get the pasted text
    var pastedText = (event.clipboardData || window.clipboardData).getData("text");

    // Get the current selection and text input
    var textInput = document.getElementById("text-input");
    var startPos = textInput.selectionStart;
    var endPos = textInput.selectionEnd;

    // Insert the pasted text into the text field at the current cursor position
    var textBeforePaste = textInput.value.substring(0, startPos);
    var textAfterPaste = textInput.value.substring(endPos);
    textInput.value = textBeforePaste + pastedText + textAfterPaste;

    // Move the cursor to the end of the pasted text
    var newCursorPos = startPos + pastedText.length;
    textInput.setSelectionRange(newCursorPos, newCursorPos);

    // Update counters
    updateCounters(textInput.value);
  }, 0);
});

// Event listener for input events in the text input field
document.getElementById("text-input").addEventListener("input", function () {
  var textInput = this;
  updateCounters(textInput.value);
});

// Case conversion buttons
document
  .getElementById("sentence-case-btn")
  .addEventListener("click", function () {
    var textInput = document.getElementById("text-input");
    textInput.value = toSentenceCase(textInput.value);
    updateCounters(textInput.value);
  });

document.getElementById("lowercase-btn").addEventListener("click", function () {
  var textInput = document.getElementById("text-input");
  textInput.value = textInput.value.toLowerCase();
  updateCounters(textInput.value);
});

document.getElementById("uppercase-btn").addEventListener("click", function () {
  var textInput = document.getElementById("text-input");
  textInput.value = textInput.value.toUpperCase();
  updateCounters(textInput.value);
});

document
  .getElementById("capitalize-btn")
  .addEventListener("click", function () {
    var textInput = document.getElementById("text-input");
    textInput.value = toCapitalizedCase(textInput.value);
    updateCounters(textInput.value);
  });

document
  .getElementById("alternating-case-btn")
  .addEventListener("click", function () {
    var textInput = document.getElementById("text-input");
    textInput.value = toAlternatingCase(textInput.value);
    updateCounters(textInput.value);
  });

document.getElementById("titlecase-btn").addEventListener("click", function () {
  var textInput = document.getElementById("text-input");
  textInput.value = toTitleCase(textInput.value);
  updateCounters(textInput.value);
});

document
  .getElementById("inverse-case-btn")
  .addEventListener("click", function () {
    var textInput = document.getElementById("text-input");
    textInput.value = toInverseCase(textInput.value);
    updateCounters(textInput.value);
  });

// Copy to clipboard button
document.getElementById("copy-btn").addEventListener("click", function () {
  var textInput = document.getElementById("text-input");
  textInput.select();
  document.execCommand("copy");

  var copyButton = this;
  copyButton.textContent = "Copied";
  setTimeout(function () {
    copyButton.textContent = "Copy";
  }, 5000);
});

// Download text button
document.getElementById("download-btn").addEventListener("click", function () {
  var textInput = document.getElementById("text-input").value;
  download("text.txt", textInput);
});

// Clear text button
document.getElementById("clear-btn").addEventListener("click", function () {
  var textInput = document.getElementById("text-input");
  textInput.value = "";
  updateCounters("");
});

// Function to update counters
function updateCounters(text) {
  var charCount = text.length;
  var wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  var sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  var lineCount = text.split(/\r\n|\r|\n/).filter(Boolean).length;

  document.getElementById("char-count").textContent =
    "Characters: " + charCount;
  document.getElementById("word-count").textContent = "Words: " + wordCount;
  document.getElementById("sentence-count").textContent =
    "Sentences: " + sentenceCount;
  document.getElementById("line-count").textContent = "Lines: " + lineCount;
}

// Function to convert text to Sentence Case
function toSentenceCase(str) {
  // Convert the text to lowercase first
  var lowerCaseStr = str.toLowerCase();
  
  // Capitalize the first letter of each sentence
  return lowerCaseStr.replace(/(^\w{1}|\.\s*\w{1})/g, function (char) {
    return char.toUpperCase();
  });
}

// Function to convert text to Alternating Case
function toAlternatingCase(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      result += str[i].toLowerCase();
    } else {
      result += str[i].toUpperCase();
    }
  }
  return result;
}

// Function to convert text to Capitalized Case
function toCapitalizedCase(str) {
  var lowerCaseStr = str.toLowerCase();
  return lowerCaseStr.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

// Function to convert text to Title Case
function toTitleCase(str) {
  var lowerCaseStr = str.toLowerCase();
  return lowerCaseStr.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

// Function to convert text to Inverse Case
function toInverseCase(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      result += str[i].toLowerCase();
    } else if (str[i] === str[i].toLowerCase()) {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }
  return result;
}

// Function to download text as a file
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
