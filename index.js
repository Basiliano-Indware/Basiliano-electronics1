
//index.html filter
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
//navbar filter
function applyNavbarSearch() {
    let searchInput = document.getElementById("navSearchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        let name = card.querySelector("h3").innerText.toLowerCase();
        if(name.includes(searchInput)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}



//<!-- WORKING FILTER SYSTEM -->

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
// PRODUCT DATA
const products = [
    {
        id: 1,
        name: "43 Inch TV",
        price: 26000,
        image: "myimages/43inchtv.webp",
        description: "High-quality 43 inch Smart TV with crystal-clear display."
    },
    {
        id: 2,
        name: "32 Inch TV",
        price: 12000,
        image: "myimages/tv1.webp",
        description: "Affordable 32 inch TV with HDMI and USB support."
    },
    {
        id: 3,
        name: "Taghood Woofer",
        price: 5500,
        image: "myimages/woofer.png",
        description: "Powerful woofer for deep bass and clear sound."
    },
    {
        id: 4,
        name: "Alyoil woofer",
        price: 1000,
        image: "myimages/woofer2.webp",
        description: "The Alyoil Woofer is a compact but powerful home audio system designed for deep bass and clear sound output. It features enhanced subwoofer drivers and balanced stereo speakers that deliver impressive performance in small and medium-sized rooms."
    },
    {
        id: 5,
        name: "Smart Watch",
        price: 1200,
        image: "myimages/watch.webp",
        description: "A modern and stylish smartwatch built to keep you connected on the go. It features health-tracking functions such as heart-rate monitoring, sleep tracking, step counting, and notifications for calls, messages, and apps."
    },
    {
        id: 6,
        name: "Headphones",
        price: 800,
        image: "myimages/headphones.webp",
        description: "Lightweight and comfortable headphones designed for everyday music listening, gaming, or online classes. They provide clear audio, good bass, and a noise-isolating ear-cup design that helps reduce background sounds."
    },
    {
        id: 7,
        name: "iphone 17pro",
        price: 46000,
        image: "myimages/iphonepic.webp",
        description: "The iPhone 17 Pro delivers next-generation performance with its advanced A19 Bionic chip, stunning OLED display, and professional-grade camera system."
    },
    {
        id: 8,
        name: "Samsung S24",
        price: 24000,
        image: "myimages/samsungpic.webp",
        description: "Samsung S24 brings flagship performance at great value. Featuring a bright AMOLED display, high-resolution camera, fast charging, and powerful processor, it is ideal for photography, social media, multitasking, and entertainment."
    },
    {
        id: 9,
        name: "Electric Kettle",
        price: 1000,
        image: "myimages/kettlepic.webp",
        description: "A fast-boiling electric kettle designed for convenience and safety."
    }
];




// GET ID FROM URL
let params = new URLSearchParams(window.location.search);
let productId = params.get("id");

// FIND PRODUCT
let product = products.find(p => p.id == productId);

// DISPLAY PRODUCT
if (product) {
    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = "Price: KSh " + product.price;
    document.getElementById("productDescription").innerText = product.description;
}


// ADD TO CART
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}
let currentProduct = null;


document.addEventListener("DOMContentLoaded", function () {

    let currentProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (currentProduct) {
        const productImage = document.getElementById("productImage");
        const productName = document.getElementById("productName");
        const productPrice = document.getElementById("productPrice");
        const productDescription = document.getElementById("productDescription");

        if (productImage) productImage.src = currentProduct.image;
        if (productName) productName.innerText = currentProduct.name;
        if (productPrice) productPrice.innerText = "KSh " + currentProduct.price;
        if (productDescription) productDescription.innerText = currentProduct.description || "";
    } 
    else {
     //   alert("Product not found!");
    }

});



// LOAD CART
// ----------------- CART FUNCTIONS -----------------
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelectorAll(".cart .count").forEach(span => span.innerText = cart.length);
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Now this works because function is defined
    alert("Added to cart!");
}

// Remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Display cart items
function displayCart() {
    const container = document.getElementById("cartContainer");
    if(!container) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item,index)=>{
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

    document.getElementById("totalPrice").innerText = total;
    updateCartCount();
}
//signup
function signupUser() {
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if(!username || !email || !password){
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.find(u => u.username === username)){
        alert("Username already exists");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "Login.html"; // redirect to login
}
function validateSignupForm() {
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return false;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // If all checks pass, proceed
    signupUser(); 
    return true;
}

//login
function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if(!username || !password){
        alert("Please enter both username and password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if(user){
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html"; // redirect to homepage
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

    // Proceed if all checks pass
    loginUser();
    return true;
}

//contact
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
//buy now
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
}//
 // ---------------------------
       //PAYMENT FORM VALIDATION
   // ----------------------------*/
    const paymentForm = document.getElementById("paymentForm");

    if (paymentForm) {
        paymentForm.addEventListener("submit", function(e) {
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




// Feedback form submission
const feedbackForm = document.getElementById("feedbackForm");
if(feedbackForm){
    feedbackForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById("fbName").value;
        const rating = document.getElementById("fbRating").value;
        const comment = document.getElementById("fbComment").value;

        const data = {
            name: name,
            rating: rating,
            comment: comment
        };

        // Replace YOUR_SHEETDB_URL with the URL from SheetDB
        fetch("https://sheetdb.io/api/v1/fw9xkh0rt2fha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
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
//forgotpassword
function sendResetLink() {
    const email = document.getElementById('fpEmail').value;
    if(email) {
        alert(`A reset link has been sent to ${email}`);
        document.getElementById('fpEmail').value = '';
    }
}
   // ---------------- MOBILE NAV TOGGLE ----------------
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("togglebtn");
  const navLinks = document.getElementById("nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("active");
      navLinks.classList.toggle("open");


    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggleBtn.classList.remove("active");
      }
                            }
      });
    });
  });












