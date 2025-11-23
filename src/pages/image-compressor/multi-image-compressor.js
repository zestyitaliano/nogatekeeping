document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('fileInput');
    const clearBtn = document.getElementById('clearBtn'); 
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const previewContainer = document.getElementById('previewContainer');
    const fileInputContainer = document.getElementById('fileInputContainer');
    const compressingMessage = document.getElementById('compressingMessage'); // Get the compressing message element

    clearBtn.addEventListener('click', function() { 
        fileInput.value = ''; 
        previewContainer.innerHTML = ''; 
        downloadAllBtn.style.display = 'none'; 
    });

    fileInput.addEventListener('change', handleFileSelect);

    fileInputContainer.addEventListener('dragover', handleDragOver);
    fileInputContainer.addEventListener('dragleave', handleDragLeave);
    fileInputContainer.addEventListener('drop', handleDrop);

    function handleDragOver(event) {
        event.preventDefault();
        fileInputContainer.classList.add('dragover');
    }

    function handleDragLeave(event) {
        event.preventDefault();
        fileInputContainer.classList.remove('dragover');
    }

    let compressedImages; // Declare variable outside functions

    async function handleDrop(event) {
        event.preventDefault(); 
        fileInputContainer.classList.remove('dragover');
        previewContainer.innerHTML = '';
        compressingMessage.style.display = 'block'; // Show compressing message
        const files = Array.from(event.dataTransfer.files);
        compressedImages = await displayImages(files); // Store compressed images
        compressingMessage.style.display = 'none'; // Hide compressing message
        downloadAllBtn.style.display = 'inline-block';
    }
    
    async function handleFileSelect(event) {
        previewContainer.innerHTML = '';
        compressingMessage.style.display = 'block'; // Show compressing message
        const files = Array.from(event.target.files);
        compressedImages = await displayImages(files);
        compressingMessage.style.display = 'none'; // Hide compressing message
        downloadAllBtn.style.display = 'inline-block'; // Show the download all button after displaying images
    }

    async function compressImage(file) {
        console.log("Compressing file:", file.name);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedImage = await imageCompression(file, options);
        console.log("Successfully compressed:", file.name);
        return compressedImage;
    }

    async function displayImages(files) {
        const compressedImages = await Promise.all(files.map(compressImage));
        compressedImages.forEach((image, index) => {
            const imageUrl = URL.createObjectURL(image);
            
            const container = document.createElement('div');
            container.classList.add('preview-item');

            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '100px'; 
            img.style.height = 'auto'; 
            container.appendChild(img);

            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = `Download Image ${index + 1}`;
            downloadBtn.className = 'download-link-each';
            downloadBtn.onclick = () => downloadImage(image, `compressed_image_${index + 1}.jpg`);
            container.appendChild(downloadBtn);

            previewContainer.appendChild(container);
        });
        return compressedImages; // Add this line to return the compressedImages array
    }

    function downloadImage(image, fileName) {
        const imageUrl = URL.createObjectURL(image);
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async function generateZip() {
        console.log("Number of compressed images:", compressedImages.length);
        if (compressedImages.length > 0) {
            const zip = new JSZip();
            compressedImages.forEach((image, index) => {
                const fileName = `compressed_image_${index + 1}.jpg`;
                zip.file(fileName, image);
                console.log(`Added image ${index + 1} to zip file:`, fileName);
            });
            return await zip.generateAsync({ type: 'blob' });
        } else {
            console.error("No compressed images found to generate ZIP file.");
            return null;
        }
    }

    downloadAllBtn.addEventListener('click', async function() {
        const files = Array.from(fileInput.files);
        compressingMessage.style.display = 'block'; // Show compressing message
        const compressedImages = await Promise.all(files.map(compressImage));
        console.log("Number of compressed images:", compressedImages.length);
        const zipBlob = await generateZip(compressedImages);
        compressingMessage.style.display = 'none'; // Hide compressing message
        saveAs(zipBlob, 'compressed_images.zip');
    });
});
