
// Color Customization Tool
const colorInput = document.getElementById('color-selector');
const fabricImage = document.getElementById('fabric-image');

colorInput.addEventListener('input', function() {
    const selectedColor = colorInput.value;
    fabricImage.style.filter = `hue-rotate(${selectedColor}deg)`;
});
// Virtual Try-On: Change Fabric on Clothing
const fabricOptions = document.querySelectorAll('.fabric-option');
const clothingItem = document.getElementById('clothing-item');

fabricOptions.forEach(option => {
    option.addEventListener('click', function() {
        const selectedFabric = option.getAttribute('data-fabric');
        clothingItem.src = `photos/${selectedFabric}`;
    });
});

