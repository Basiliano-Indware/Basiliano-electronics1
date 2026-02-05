// ================= FILTER FUNCTIONS =================

// index.html filter
function filterCategory(category) {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// navbar filter
function applyNavbarSearch() {
    let searchInput = document.getElementById("navSearchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        let name = card.querySelector("h3").innerText.toLowerCase();
        if (name.includes(searchInput)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Working filter system (search + category + price)
function applyFilters() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let category = document.getElementById("categoryFilter").value;
    let priceFilter = document.getElementById("priceFilter").value;
    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        let name = card.querySelector("h3").innerText.toLowerCase();
        let productCategory = card.dataset.category;
        let productPrice = parseInt(card.dataset.price);

        let matchesSearch = name.includes(searchInput);
        let matchesCategory = (category === "all" || category === productCategory);
        let matchesPrice =
            priceFilter === "all" ||
            (priceFilter === "low" && productPrice < 10000) ||
            (priceFilter === "mid" && productPrice >= 10000 && productPrice <= 30000) ||
            (priceFilter === "high" && productPrice > 30000);

        if (matchesSearch && matchesCategory && matchesPrice) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// ================= PRODUCT DATA =================

const products = [
    { id: 1, name: "43 Inch TV", price: 26000, image: "myimages/43inchtv.webp", description: "High-quality 43 inch Smart TV with crystal-clear display." },
    { id: 2, name: "32 Inch TV", price: 12000, image: "myimages/tv1.webp", description: "Affordable 32 inch TV with HDMI and USB support." },
    { id: 3, name: "Taghood Woofer", price: 5500, image: "myimages/woofer.png", description: "Powerful woofer for deep bass and clear sound." },
    { id: 4, name: "Alyoil woofer", price: 1000, image: "myimages/woofer2.webp", description: "Compact but powerful home audio system." },
    { id: 5, name: "Smart Watch", price: 1200, image: "myimages/watch.webp", description: "Modern smartwatch with health tracking features." },
    { id: 6, name: "Headphones", price: 800, image: "myimages/headphones.webp", description: "Comfortable headphones with clear audio and good bass." },
    { id: 7, name: "iPhone 17 Pro", price: 46000, image: "myimages/iphonepic.webp", description: "Next-gen iPhone with advanced performance and camera." },
    { id: 8, name: "Samsung S24", price: 24000, image: "myimages/samsungpic.webp", description: "Flagship Samsung phone with great value and performance." },
    { id: 9, name: "Electric Kettle", price: 1000, image: "myimages/kettlepic.webp", description: "Fast-boiling electric kettle for convenience." }
];

// ================= PRODUCT PAGE DISPLAY =================

let params = new URLSearchParams(window.location.search);
let productId = params.get("id");
let product = products.find(p => p.id == productId);

if (product) {
    const img = document.getElementById("productImage");
    const name = document.getElementById("productName");
    const price = document.getElementById("productPrice");
    const desc = document.getElementById("productDescription");

    if (img) img.src = product.image;
    if (name) name.innerText = product.name;
    if (price) price.innerText = "Price: KSh " + product.price;
    if (desc) desc.innerText = product.description;
}

// ================= CART FUNCTIONS =================

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelectorAll(".cart .count").forEach(span => span.innerText = cart.length);
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart!");
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const container = document.getElementById("cartContainer");
    if (!container) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <h3>${item.name}</h3>
                    <p>KSh ${item.price}</p>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    const totalPrice = document.getElementById("totalPrice");
    if (totalPrice) totalPrice.innerText = total;

    updateCartCount();
}

// ================= AUTH =================

function signupUser() {
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!username || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username === username)) {
        alert("Username already exists");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "Login.html";
}

function validateSignupForm() {
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    signupUser();
    return true;
}

function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
}

function validateLoginForm() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return false;
    }

    loginUser();
    return true;
}

// ================= CONTACT =================

function sendMessage() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    alert("Message sent successfully! We will reply soon.");
}

// ================= BUY NOW / PAYMENT =================

function buyNow(productId) {
    window.location.href = `payment.html?id=${productId}`;
}

// Only run on payment.html
if (document.getElementById("pay-product-img")) {
    let params = new URLSearchParams(window.location.search);
    let payId = parseInt(params.get("id"));
    let selectedProduct = products.find(p => p.id === payId);

    if (selectedProduct) {
        document.getElementById("pay-product-name").textContent = selectedProduct.name;
        document.getElementById("pay-product-price").textContent = "KSh " + selectedProduct.price;
        document.getElementById("pay-product-img").src = selectedProduct.image;
    }
}

// ================= PAYMENT FORM VALIDATION =================

const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value.trim();

        if (!fullName || !phone || !address || !cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all fields.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Phone must be exactly 10 digits.");
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Card number must be 16 digits.");
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            alert("CVV must be 3 or 4 digits.");
            return;
        }

        paymentForm.submit();
    });
}

// ================= FEEDBACK FORM =================

const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("fbName").value;
        const rating = document.getElementById("fbRating").value;
        const comment = document.getElementById("fbComment").value;

        const data = { name, rating, comment };

        fetch("https://sheetdb.io/api/v1/fw9xkh0rt2fha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("feedbackMessage").innerText = "Feedback submitted successfully!";
                feedbackForm.reset();
            })
            .catch(error => {
                document.getElementById("feedbackMessage").innerText = "Error submitting feedback, please try again.";
                console.error(error);
            });
    });
}

// ================= FORGOT PASSWORD =================

function sendResetLink() {
    const email = document.getElementById("fpEmail").value;
    if (email) {
        alert(`A reset link has been sent to ${email}`);
        document.getElementById("fpEmail").value = "";
    }
}

// ================= MOBILE NAV TOGGLE =================

const toggleBtn = document.querySelector(".togglebtn");
const navLinks = document.querySelector(".nav-links");

// Toggle open/close
toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active"); // animates X
  navLinks.classList.toggle("open");    // shows/hides menu
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    toggleBtn.classList.remove("active");
    navLinks.classList.remove("open");
  });
});
