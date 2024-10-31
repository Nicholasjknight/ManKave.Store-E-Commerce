document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    const category = document.querySelector('.category-dropdown').value;
    const query = document.querySelector('.search-input').value;
    console.log(`Searching for "${query}" in category "${category}"`);
    // Implement further code here to perform the actual search
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Carousel Slideshow Code
let currentIndex = 0;
const images = document.querySelectorAll(".carousel img");

// Initial display of the first image
images[currentIndex].classList.add("visible");

function showNextImage() {
    images[currentIndex].classList.remove("visible"); // Hide current image
    currentIndex = (currentIndex + 1) % images.length; // Move to next image
    images[currentIndex].classList.add("visible"); // Show the new current image
}

setInterval(showNextImage, 3000); // Change image every 3 seconds
// Function to load and display products from a CSV file
function loadProducts() {
    Papa.parse("products\products_export.csv", {
        download: true,
        header: true,
        complete: function(results) {
            const products = results.data;
            displayProducts(products);
        }
    });
}

// Function to display products on the page
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        // Ensure essential fields are available
        const title = product['Title'];
        const price = product['Variant Price'];
        const imageSrc = product['Image Src'];
        const description = product['Body (HTML)'];
        
        // Create product card
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${imageSrc}" alt="${title}">
            <h3>${title}</h3>
            <p class="price">$${price}</p>
            <p>${description}</p>
        `;

        productList.appendChild(productCard);
    });
}

// Load products on page load
document.addEventListener("DOMContentLoaded", loadProducts);
