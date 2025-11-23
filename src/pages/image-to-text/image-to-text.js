// Add event listeners for drag and drop functionality
var fileInputContainer = document.getElementById('fileInputContainer');
fileInputContainer.addEventListener('dragenter', function(event) {
  event.preventDefault();
  fileInputContainer.classList.add('dragover');
});

fileInputContainer.addEventListener('dragover', function(event) {
  event.preventDefault();
});

fileInputContainer.addEventListener('dragleave', function(event) {
  event.preventDefault();
  fileInputContainer.classList.remove('dragover');
});

fileInputContainer.addEventListener('drop', function(event) {
  event.preventDefault();
  fileInputContainer.classList.remove('dragover');
  
  var file = event.dataTransfer.files[0];
  handleFileUpload(file);
});

// Function to handle file upload
function handleFileUpload(file) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      // Limit the size of the preview image to 800px x 800px
      var maxSize = 800;
      var scale = Math.min(maxSize / img.width, maxSize / img.height);
      var width = img.width * scale;
      var height = img.height * scale;

      // Create a temporary canvas to resize the image
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, 0, 0, width, height);

      // Set the preview image source and display it
      document.getElementById('imagePreview').src = canvas.toDataURL('image/png');
      document.getElementById('imagePreviewContainer').style.display = 'block';
      document.getElementById('fileInputContainer').style.display = 'none';

      // Perform text recognition
      recognizeText(canvas.toDataURL('image/png'));
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

// Add event listener for file input change
document.getElementById('fileInput').addEventListener('change', function() {
  var file = this.files[0];
  handleFileUpload(file);
});

// Add event listener for clear button
document.getElementById('clearButton').addEventListener('click', function() {
  // Clear the image preview
  document.getElementById('imagePreview').src = '';
  document.getElementById('imagePreviewContainer').style.display = 'none';
  document.getElementById('fileInputContainer').style.display = 'block';
  
  // Clear the output text
  document.getElementById('output').innerText = '';
});

// Function to perform text recognition
function recognizeText(base64ImageData) {
  var Tesseract = window.Tesseract;
  Tesseract.createWorker()
    .then(function(worker) {
      return worker.recognize(base64ImageData);
    })
    .then(function(result) {
      if (result && result.data && result.data.text) {
        document.getElementById('output').innerText = result.data.text;

        document.getElementById('copyButton').addEventListener('click', function() {
          var copyButton = this;
          var textToCopy = document.getElementById('output').innerText;
          navigator.clipboard.writeText(textToCopy)
            .then(function() {
              copyButton.innerText = 'Copied to Clipboard';
              setTimeout(function() {
                copyButton.innerText = 'Copy to Clipboard';
              }, 5000);
            })
            .catch(function(error) {
              console.error('Error copying text:', error);
            });
        });

        // Add event listener for download button
        document.getElementById('downloadButton').addEventListener('click', function() {
          var blob = new Blob([result.data.text], { type: 'text/plain' });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'recognized_text.txt';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
      } else {
        throw new Error('No text recognized');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      document.getElementById('output').innerText = 'Error: ' + error.message;
    });
}
