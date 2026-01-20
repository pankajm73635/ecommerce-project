// --- 1. SECURITY CHECK ---
if (localStorage.getItem("userLoggedIn") !== "true") {
    // अगर लॉगिन नहीं है और यूजर स्टोर पेज पर है, तो लॉगिन पेज पर भेजें
    if (!window.location.pathname.includes("login.html")) {
        window.location.href = "login.html";
    }
}

// --- 2. PRODUCT DATA ---
const products = [
    { id: 1, name: "Shoes", price: 1999, img: "Shoe.jpg" },
    { id: 2, name: "T-shirt", price: 799, img: "T-shirt.jpg" },
    { id: 3, name: "Backpack", price: 1499, img: "backpack.jpg" }
];

let cart = [];

// --- 3. DISPLAY PRODUCTS ---
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// --- 4. CART LOGIC ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    alert(product.name + " added to cart!");
}

function updateCartUI() {
    const cartBtn = document.getElementById('cartBtn');
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if(cartBtn) cartBtn.innerText = `Cart (${cart.length})`;
    
    if(cartItems) {
        cartItems.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if(totalPriceElement) totalPriceElement.innerText = total;
}

// --- 5. WHATSAPP CHECKOUT (Naya Feature) ---
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const myNumber = "917045585298"; // आपका नंबर
    let message = "Hello Pankaj! I want to order:%0A";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₹${item.price}%0A`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `%0A*Total Amount: ₹${total}*`;

    // WhatsApp API का उपयोग करके लिंक खोलना
    window.open(`https://api.whatsapp.com/send?phone=${myNumber}&text=${message}`, '_blank');
}

// --- 6. UTILITIES ---
function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

function logout() {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "login.html";
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if(modal) {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    }
}

// --- 7. INITIALIZE ---
window.onload = () => {
    renderProducts(products);
    const cartBtn = document.getElementById('cartBtn');
    if(cartBtn) cartBtn.onclick = toggleCart;
};
