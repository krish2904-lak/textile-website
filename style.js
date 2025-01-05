document.addEventListener("DOMContentLoaded", function () {
  // Get the form values
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const telInput = document.getElementById('tel');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const captchaInput = document.getElementById('captcha');
  const submitButton = document.getElementById('submit');

  // Validation patterns
  const mobilePattern = /^[0-9]{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form submission event listener
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate the form fields
    if (validateForm()) {
      // Send the form data to the server-side script (submit_contact.php)
      const formData = new FormData(contactForm);
      fetch('submit_contact.php', {
        method: 'POST',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle the response from the server-side script
      })
      .catch((error) => {
        console.error(error);
      });
    }
  });

  // Validate the form fields
  function validateForm() {
    let isValid = true;

    // Check if all required fields are filled
    if (!nameInput.value || !mobileInput.value || !emailInput.value || !messageInput.value || !captchaInput.value) {
      isValid = false;
      alert('Please fill in all required fields');
    }

    // Check if the mobile number is valid
    if (!mobilePattern.test(mobileInput.value)) {
      isValid = false;
      alert('Invalid mobile number');
    }

    // Check if the email address is valid
    if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      alert('Invalid email address');
    }

    return isValid;
  }

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.5726, lng: 88.3639 },
      zoom: 12
    });
  }

  // Bootstrap carousel initialization
  const carouselElement = document.querySelector('#demo');
  if (carouselElement) {
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 3000, // 3 seconds auto-slide
      ride: 'carousel',
    });
  }

  // Collection buttons functionality
  const collectionButtons = document.querySelectorAll('.collection-button');
  collectionButtons.forEach(button => {
    button.addEventListener('click', function () {
      alert("View More button clicked!");
      // You can add logic to redirect or show more details here
    });
  });

  // Stats section animation on scroll (optional)
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    window.addEventListener('scroll', function () {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight;

      if (sectionPos < screenPos) {
        statsSection.classList.add('animate');
      }
    });
  }
});
function showOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay.style.display = 'block';
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10); // Trigger CSS transition
}

function closeOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay.classList.remove('active');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500); // Wait for fade out
}
function showOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('active');
}

function closeOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.remove('active');
}
// Toggle Chat Window
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
}

// Send User Message and Bot Response
function sendMessage() {
  const userInput = document.getElementById('user-input');
  const chatContent = document.getElementById('chat-content');
  const message = userInput.value.trim();

  if (message) {
      displayUserMessage(message);
      userInput.value = ''; // Clear input

      // Simulate bot typing with a delay
      showTypingIndicator();
      setTimeout(() => {
          hideTypingIndicator();
          displayBotResponse(message);
          chatContent.scrollTop = chatContent.scrollHeight; // Auto-scroll
      }, 1000);
  }
}

// Display User Message
function displayUserMessage(message) {
  const chatContent = document.getElementById('chat-content');
  const userMessage = document.createElement('p');
  userMessage.className = 'user-message';
  userMessage.innerHTML = `<strong>You:</strong> ${message} <span class="timestamp">${getTimestamp()}</span>`;
  chatContent.appendChild(userMessage);
}

// Display Bot Response Based on User Input
function displayBotResponse(message) {
  const chatContent = document.getElementById('chat-content');
  const botMessage = document.createElement('p');
  botMessage.className = 'bot-message';

  // Predefined responses based on user input keywords
  let response;
  if (/hello|hi|hey/i.test(message)) {
      response = "Hello! How can I help you with our textiles?";
  } else if (/price|cost/i.test(message)) {
      response = "Our products vary in price. Please visit the product page for detailed pricing.";
  } else if (/fabric|material/i.test(message)) {
      response = "We offer various fabrics, including cotton, polyester, silk, and more. What are you interested in?";
  } else {
      response = "I'm here to help! Could you please clarify your question?";
  }

  botMessage.innerHTML = `<strong>Bot:</strong> ${response} <span class="timestamp">${getTimestamp()}</span>`;
  chatContent.appendChild(botMessage);
}

// Show Typing Indicator
function showTypingIndicator() {
  document.getElementById('typing-indicator').style.display = 'block';
}

// Hide Typing Indicator
function hideTypingIndicator() {
  document.getElementById('typing-indicator').style.display = 'none';
}

// Get Current Timestamp
function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
// Show and hide the form
function showCustomizationForm() {
  document.getElementById('customization-form').style.display = 'flex';
}

function closeCustomizationForm() {
  document.getElementById('customization-form').style.display = 'none';
}

// Handle form submission with preview
document.getElementById('customizationRequestForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const color = document.getElementById('custom-color').value;
  const pattern = document.getElementById('custom-pattern').value;
  const texture = document.getElementById('custom-texture').value;
  const quantity = document.getElementById('custom-quantity').value;
  const stockCheck = document.getElementById('stock-check').checked;
  const fileInput = document.getElementById('custom-file');

  if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      alert(`Customization request:\nColor: ${color}\nPattern: ${pattern}\nTexture: ${texture}\nQuantity: ${quantity}\nFile: ${file.name}\nIn-stock: ${stockCheck ? 'Yes' : 'No'}`);
  } else {
      alert('Please upload a sample image or reference.');
  }

  closeCustomizationForm();
});
function toggleSection(sectionId) {
  const content = document.getElementById(sectionId);
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
}
function searchFunction() {
  const query = document.getElementById('search-input').value;
  alert(`Searching for: ${query}`);
  // Implement actual search functionality here
}
function filterCollections() {
  const selectedCategory = document.getElementById('fabric-category').value;
  const cards = document.querySelectorAll('.fabric-card');

  cards.forEach(card => {
      if (selectedCategory === '' || card.getAttribute('data-category') === selectedCategory) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}
function addToCart(productName) {
  const cards = document.querySelectorAll('.fabric-card');
  let quantity = 0;

  cards.forEach(card => {
      const productTitle = card.querySelector('h3').innerText;
      if (productTitle === productName) {
          const quantityInput = card.querySelector('.quantity');
          quantity = parseInt(quantityInput.value);
      }
  });

  if (quantity > 0) {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      cart[productName] = (cart[productName] || 0) + quantity;

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${quantity} metres of ${productName} has been added to your cart.`);
  } else {
      alert("Please enter a valid quantity.");
  }
}

function enquire(productName) {
  const cards = document.querySelectorAll('.fabric-card');
  let quantity = '';

  cards.forEach(card => {
      const productTitle = card.querySelector('h3').innerText;
      if (productTitle === productName) {
          const quantityInput = card.querySelector('.quantity');
          quantity = quantityInput.value;
      }
  });

  const enquiryDetails = {
      product: productName,
      quantity: quantity,
  };

  fetch('submit_enquiry.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryDetails),
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message); // Show success message
  })
  .catch(error => {
      console.error('Error:', error);
      alert("There was an error sending your enquiry. Please try again.");
  });
}
function showBookOverlay(id) {
  document.getElementById(id).style.display = 'flex';
}

// Close Overlay
function closeBookOverlay(id) {
  document.getElementById(id).style.display = 'none';
}

function changeSlide(direction, sliderId) {
  const slider = document.getElementById(sliderId);
  const slides = slider.getElementsByClassName('book-slide');
  
  // Find the current active slide
  let activeIndex = -1;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active')) {
      activeIndex = i;
      break;
    }
  }

  // Calculate the next active index
  let nextIndex = activeIndex + direction;
  if (nextIndex < 0) {
    nextIndex = slides.length - 1; // Loop to the last slide
  } else if (nextIndex >= slides.length) {
    nextIndex = 0; // Loop to the first slide
  }

  // Remove 'active' class from all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }

  // Add 'active' class to the next slide
  slides[nextIndex].classList.add('active');
}
