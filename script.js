// ChocoCrumb Premium - E-Commerce Engine & Integrations

// Product Catalog Database
const products = [
    {
        id: 1,
        name: 'Classic Choco-Chip',
        price: 45,
        category: 'classic',
        badge: 'Best Seller',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
        rating: 4.8,
        ratingCount: 124,
        description: 'Our time-honored signature cookie. Golden brown, butter-rich dough packed with premium Belgian semi-sweet chocolate chips and a delicate hint of Madagascar vanilla.',
        ingredients: 'Organic unbleached flour, premium brown sugar, pasture-raised butter, Belgian semi-sweet chocolate chips, farm eggs, Madagascar vanilla extract, sea salt.',
        allergens: 'Contains wheat, dairy, eggs. Manufactured in a facility that processes nuts.'
    },
    {
        id: 2,
        name: 'Double Chocolate Lava',
        price: 60,
        category: 'stuffed',
        badge: 'Signature',
        image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        ratingCount: 96,
        description: 'An indulgent dark cocoa cookie with a rich, soft, molten dark chocolate lava center. Specially baked to flow smoothly when warmed for a truly luxurious experience.',
        ingredients: 'Dutch-process dark cocoa powder, rich dark chocolate chunks, pasture butter, brown sugar, organic flour, farm eggs, espresso powder (enhancer).',
        allergens: 'Contains wheat, dairy, eggs. May contain traces of nuts.'
    },
    {
        id: 3,
        name: 'Nutella Stuffed Premium',
        price: 75,
        category: 'stuffed',
        badge: 'Hot Seller',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        ratingCount: 185,
        description: 'Thick, ultra-soft cookie dough generously stuffed with creamy hazelnut Nutella spread, baked to golden perfection and topped with roasted hazelnut crumbs.',
        ingredients: 'Organic flour, Nutella hazelnut spread, butter, golden brown sugar, chopped roasted hazelnuts, sea salt crystals.',
        allergens: 'Contains wheat, dairy, eggs, hazelnuts, soy.'
    },
    {
        id: 4,
        name: 'Lotus Biscoff Delight',
        price: 75,
        category: 'gourmet',
        badge: 'New Arrival',
        image: 'https://images.unsplash.com/photo-1558961309-db6f1aa3d376?auto=format&fit=crop&q=80&w=600',
        rating: 4.7,
        ratingCount: 78,
        description: 'A spice-infused brown butter cookie base swirled with smooth Lotus Biscoff cookie butter, topped with caramelized Biscoff biscuit crumbs and a gold drizzle.',
        ingredients: 'Brown butter cookie base, Lotus Biscoff cookie spread, crushed Lotus biscuits, cinnamon, nutmeg, organic cane sugar.',
        allergens: 'Contains wheat, dairy, soy. Vegan option available.'
    },
    {
        id: 5,
        name: 'Choco-Nut Crunch',
        price: 65,
        category: 'crunchy',
        badge: 'Popular',
        image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600',
        rating: 4.6,
        ratingCount: 64,
        description: 'For the lovers of crunch. A perfect harmony of silky milk chocolate chips, roasted almonds, and toasted walnuts folded into a light, crispy butter cookie.',
        ingredients: 'Flour, butter, white chocolate, milk chocolate chunks, roasted almond slivers, toasted walnut bits, brown sugar.',
        allergens: 'Contains wheat, dairy, eggs, almonds, walnuts.'
    },
    {
        id: 6,
        name: 'Golden Almond Crisp',
        price: 80,
        category: 'crunchy',
        badge: 'Premium',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
        rating: 4.8,
        ratingCount: 42,
        description: 'Delicate butter cookie dough topped with a dense layer of caramelized roasted almond slices and finished with a pinch of hand-harvested flaky French sea salt.',
        ingredients: 'Pasture butter, organic wheat flour, honey, heavy cream, roasted almond slices, Maldon sea salt flakes.',
        allergens: 'Contains wheat, dairy, almonds.'
    }
];

// App State Management
let cart = JSON.parse(localStorage.getItem('chococrumb_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('chococrumb_wishlist')) || [];
let selectedCategory = 'all';
let searchQuery = '';
let sortBy = 'default';
let promoCode = '7941';
let discountRate = 0; // 0.15 for CRUMB15
const contactWhatsApp = '9074008178';
const contactEmail = 'jerinshaji7941@gmail.com';

// LocalStorage Persistent Reviews Database Setup
const getReviews = (productId) => {
    let reviews = JSON.parse(localStorage.getItem(`chococrumb_reviews_${productId}`));
    if (!reviews) {
        // Mock initial reviews to make the website feel active and authentic
        reviews = [
            { author: 'Kiran P.', rating: 5, date: '2026-05-10', text: 'അതിശയകരമായ രുചി! വെളിയിൽ നല്ല ക്രിസ്പിയും ഉള്ളിൽ സോഫ്റ്റും ആണ്. വീണ്ടും വാങ്ങും!' },
            { author: 'Amanda M.', rating: 5, date: '2026-05-22', text: 'Absolutely the best cookies I have ever had! The chocolate chips are melt-in-your-mouth delicious.' }
        ];
        localStorage.setItem(`chococrumb_reviews_${productId}`, JSON.stringify(reviews));
    }
    return reviews;
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    setupEventListeners();
    initRatingStarsSelect();
});

// Setup DOM Event Listeners
function setupEventListeners() {
    // Search input handler with debounce delay
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterAndRender();
        });
    }

    // Category pills handler
    const categoryPills = document.querySelectorAll('.pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            selectedCategory = pill.dataset.category;
            filterAndRender();
        });
    });

    // Sorting handler
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortBy = e.target.value;
            filterAndRender();
        });
    }

    // Modal Close Triggers
    const closeDetailModal = document.getElementById('closeDetailModal');
    if (closeDetailModal) {
        closeDetailModal.addEventListener('click', closeProductModal);
    }
    
    const closeCheckoutModal = document.getElementById('closeCheckoutModal');
    if (closeCheckoutModal) {
        closeCheckoutModal.addEventListener('click', closeCheckout);
    }

    // Cart Drawer Close
    const closeCartBtn = document.getElementById('closeCartBtn');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    // Promo Code form
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }

    // Direct Checkout modal open
    const openCheckoutBtn = document.getElementById('openCheckoutBtn');
    if (openCheckoutBtn) {
        openCheckoutBtn.addEventListener('click', openCheckout);
    }

    // Checkout Forms Actions
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Handled by separate buttons
        });
    }

    // Handle clicks outside modals to close them
    window.addEventListener('click', (e) => {
        const detailOverlay = document.getElementById('productDetailModal');
        const checkoutOverlay = document.getElementById('checkoutModal');
        const cartDrawer = document.getElementById('cartDrawer');
        
        if (e.target === detailOverlay) closeProductModal();
        if (e.target === checkoutOverlay) closeCheckout();
    });
}

// Filter and Render Products according to Search, Categories, and Sort
function filterAndRender() {
    let filtered = products.filter(product => {
        const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchSearch = product.name.toLowerCase().includes(searchQuery) || 
                            product.description.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
    });

    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

// Render dynamic gourmet product cards
function renderProducts(productsList = products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (productsList.length === 0) {
        grid.innerHTML = `
            <div class="empty-cart-state" style="grid-column: 1 / -1; padding: 60px 20px;">
                <div class="empty-cart-icon">🔍</div>
                <h3>വിഭവങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല!</h3>
                <p>മറ്റൊരു പദം തിരഞ്ഞു നോക്കൂ അല്ലെങ്കിൽ മറ്റ് കാറ്റഗറി തിരഞ്ഞെടുക്കൂ.</p>
            </div>
        `;
        return;
    }

    productsList.forEach(product => {
        const isWishlisted = wishlist.includes(product.id);
        const card = document.createElement('div');
        card.className = 'cookie-card';
        card.setAttribute('data-id', product.id);

        card.innerHTML = `
            ${product.badge ? `<div class="card-badge">${product.badge}</div>` : ''}
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)" title="Add to Wishlist">
                ❤️
            </button>
            <div class="cookie-img-container">
                <img src="${product.image}" alt="${product.name}" class="cookie-image" loading="lazy">
                <div class="cookie-img-overlay">
                    <button class="quick-view-btn" onclick="openProductModal(${product.id})">Quick View</button>
                </div>
            </div>
            <div class="card-body">
                <div class="card-category">${product.category}</div>
                <h3>${product.name} Cookie</h3>
                <div class="rating-container">
                    <div class="stars">${renderStarsHTML(product.rating)}</div>
                    <div class="rating-count">(${product.ratingCount})</div>
                </div>
                <div class="card-footer">
                    <div class="card-price">₹ ${product.price}<span>/pc</span></div>
                    <div class="card-actions">
                        <button class="btn-icon" onclick="addToCart(${product.id}, 1, 'Standard', false)" title="Add to Cart">🛒</button>
                        <button class="btn-buy-now" onclick="buyNowImmediate(${product.id})">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Helper: Generates Stars HTML based on floating rating number
function renderStarsHTML(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '★';
        } else if (i === fullStars + 1 && halfStar) {
            starsHTML += '☆'; // We can use half filled if unicode supports it, otherwise outline star
        } else {
            starsHTML += '☆';
        }
    }
    return starsHTML;
}

// Toast notification trigger
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const toastMsg = toast.querySelector('.toast-msg');
    toastMsg.textContent = message;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Toggle Favorite Wishlist
function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    
    const index = wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showToast(`❤️ Added ${product.name} to Wishlist!`);
    } else {
        wishlist.splice(index, 1);
        showToast(`💔 Removed ${product.name} from Wishlist.`);
    }
    
    localStorage.setItem('chococrumb_wishlist', JSON.stringify(wishlist));
    
    // Update card wishlist icons instantly
    const card = document.querySelector(`.cookie-card[data-id="${productId}"]`);
    if (card) {
        const btn = card.querySelector('.wishlist-btn');
        if (btn) btn.classList.toggle('active');
    }
}

// Immediate Buy Now button click handler (bypasses regular cart flow and opens checkout modal directly)
function buyNowImmediate(productId) {
    // Add specifically this product to cart (or empty cart and add just this one if wanted, but standard high-end e-commerce adds it and routes to checkout instantly)
    addToCart(productId, 1, 'Standard', true);
}

// Cart Mechanics: Add Item
function addToCart(productId, quantity = 1, option = 'Standard', isBuyNow = false) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if item with exact product ID and custom option already in cart
    const existingIndex = cart.findIndex(item => item.id === productId && item.option === option);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            option: option,
            quantity: quantity
        });
    }

    // Persist cart
    localStorage.setItem('chococrumb_cart', JSON.stringify(cart));
    
    // Sync UI
    updateCartUI();
    showToast(`🍪 ${product.name} (${option}) added to Cart!`);

    // If Buy Now, bypass slide drawer and open Checkout directly
    if (isBuyNow) {
        openCheckout();
    } else {
        // Open sliding cart drawer
        openCart();
    }
}

// Cart Mechanics: Quantity Alterations
function changeCartQuantity(productId, option, amount) {
    const index = cart.findIndex(item => item.id === productId && item.option === option);
    if (index === -1) return;

    cart[index].quantity += amount;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
        showToast("🗑️ Item removed from Cart.");
    }

    localStorage.setItem('chococrumb_cart', JSON.stringify(cart));
    updateCartUI();
}

// Cart Mechanics: Remove item altogether
function removeCartItem(productId, option) {
    const index = cart.findIndex(item => item.id === productId && item.option === option);
    if (index === -1) return;
    
    cart.splice(index, 1);
    localStorage.setItem('chococrumb_cart', JSON.stringify(cart));
    updateCartUI();
    showToast("🗑️ Item removed from Cart.");
}

// Update complete Shopping Cart Elements in the sidebar drawer
function updateCartUI() {
    const badge = document.getElementById('cartBadgeCount');
    const list = document.getElementById('cartItemList');
    const drawerFooter = document.getElementById('drawerFooter');
    
    // Clear elements
    if (list) list.innerHTML = '';
    
    // Calculate total count
    const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (badge) {
        badge.textContent = totalItemsCount;
        badge.style.display = totalItemsCount > 0 ? 'flex' : 'none';
    }

    if (cart.length === 0) {
        if (list) {
            list.innerHTML = `
                <div class="empty-cart-state">
                    <div class="empty-cart-icon">🛒</div>
                    <h3>കാർട്ട് ശൂന്യമാണ്</h3>
                    <p>ഞങ്ങളുടെ പ്രീമിയം കുക്കികൾ കാർട്ടിലേക്ക് ചേർക്കാൻ തുടങ്ങൂ!</p>
                </div>
            `;
        }
        if (drawerFooter) drawerFooter.style.display = 'none';
        return;
    }

    if (drawerFooter) drawerFooter.style.display = 'block';

    // Populate items
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name} Cookie</h4>
                <div class="cart-item-desc">Option: ${item.option}</div>
                <div class="cart-item-row">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeCartQuantity(${item.id}, '${item.option}', -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeCartQuantity(${item.id}, '${item.option}', 1)">+</button>
                    </div>
                    <div class="cart-item-price">₹ ${item.price * item.quantity}</div>
                </div>
            </div>
            <button class="remove-cart-item" onclick="removeCartItem(${item.id}, '${item.option}')" title="Remove Item">✖</button>
        `;
        if (list) list.appendChild(li);
    });

    // Calculate checkout pricing blocks
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * discountRate;
    
    // Delivery fee is ₹50, but FREE if subtotal exceeds ₹500
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const finalTotal = subtotal - discount + deliveryFee;

    // Push calculations to Drawer DOM
    const subtotalText = document.getElementById('cartSubtotalText');
    const discountText = document.getElementById('cartDiscountText');
    const deliveryText = document.getElementById('cartDeliveryText');
    const totalText = document.getElementById('cartTotalText');

    if (subtotalText) subtotalText.textContent = `₹ ${subtotal}`;
    if (discountText) discountText.textContent = `- ₹ ${discount.toFixed(0)}`;
    if (deliveryText) deliveryText.textContent = deliveryFee === 0 ? 'FREE' : `₹ ${deliveryFee}`;
    if (totalText) totalText.textContent = `₹ ${finalTotal.toFixed(0)}`;

    // Handle Discount label visibility
    const promoRow = document.getElementById('promoRow');
    if (promoRow) {
        promoRow.style.display = discountRate > 0 ? 'flex' : 'none';
    }
}

// Side Drawer Handles
function openCart() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.classList.add('open');
}

function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.classList.remove('open');
}

// Promo code application (CRUMB15 -> 15% off)
function applyPromoCode() {
    const input = document.getElementById('promoInput');
    const feedback = document.getElementById('promoFeedback');
    
    if (!input || !feedback) return;
    
    const value = input.value.toUpperCase().trim();
    
    if (value === 'CRUMB15') {
        discountRate = 0.15;
        feedback.className = 'promo-feedback success';
        feedback.textContent = 'Promo Applied: 15% Discount Added!';
        updateCartUI();
    } else {
        feedback.className = 'promo-feedback error';
        feedback.textContent = 'Invalid promo code. Try CRUMB15';
    }
}

// Open Detailed Product Modal (Reviews persistent logic inside)
let currentActiveProductId = null;
let currentRatingSelection = 5;

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentActiveProductId = productId;
    
    const modal = document.getElementById('productDetailModal');
    const galleryImg = document.getElementById('modalProductImg');
    const tag = document.getElementById('modalProductTag');
    const title = document.getElementById('modalProductTitle');
    const price = document.getElementById('modalProductPrice');
    const desc = document.getElementById('modalProductDesc');
    const ingredients = document.getElementById('modalProductIngredients');
    const allergens = document.getElementById('modalProductAllergens');
    
    // Set dynamic properties
    if (galleryImg) galleryImg.src = product.image;
    if (tag) {
        tag.textContent = product.badge || product.category;
        tag.style.display = product.badge || product.category ? 'block' : 'none';
    }
    if (title) title.textContent = product.name + ' Cookie';
    if (price) price.textContent = `₹ ${product.price}`;
    if (desc) desc.textContent = product.description;
    if (ingredients) ingredients.textContent = product.ingredients;
    if (allergens) allergens.textContent = product.allergens;

    // Reset option active pills
    const pills = document.querySelectorAll('#modalOptionPills .option-pill');
    pills.forEach(pill => {
        pill.classList.remove('active');
        if (pill.dataset.option === 'Standard') pill.classList.add('active');
    });

    // Reset quantity selection in modal
    const quantityVal = document.getElementById('modalQuantityValue');
    if (quantityVal) quantityVal.textContent = '1';

    // Renders custom reviews
    renderReviews();

    // Render Modal display
    if (modal) modal.classList.add('open');
}

function closeProductModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.remove('open');
    currentActiveProductId = null;
}

// Modal Quantity Selector changes
function changeModalQuantity(amount) {
    const quantityVal = document.getElementById('modalQuantityValue');
    if (!quantityVal) return;
    
    let currentVal = parseInt(quantityVal.textContent);
    currentVal += amount;
    
    if (currentVal < 1) currentVal = 1;
    quantityVal.textContent = currentVal;
}

// Set Active Option Pill (Standard vs Eggless) in Modal
function selectOptionPill(element) {
    const pills = document.querySelectorAll('#modalOptionPills .option-pill');
    pills.forEach(p => p.classList.remove('active'));
    element.classList.add('active');
}

// Modal Add to Cart Action
function addModalProductToCart() {
    if (!currentActiveProductId) return;
    
    const quantityVal = document.getElementById('modalQuantityValue');
    const activePill = document.querySelector('#modalOptionPills .option-pill.active');
    
    const qty = quantityVal ? parseInt(quantityVal.textContent) : 1;
    const option = activePill ? activePill.dataset.option : 'Standard';
    
    addToCart(currentActiveProductId, qty, option, false);
    closeProductModal();
}

// Render dynamic reviews from LocalStorage
function renderReviews() {
    const list = document.getElementById('reviewsList');
    if (!list || !currentActiveProductId) return;
    
    list.innerHTML = '';
    const productReviews = getReviews(currentActiveProductId);

    if (productReviews.length === 0) {
        list.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">No reviews yet. Be the first to review!</p>`;
        return;
    }

    productReviews.forEach(r => {
        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
            <div class="review-header">
                <span class="review-author">${r.author}</span>
                <span class="stars">${renderStarsHTML(r.rating)}</span>
            </div>
            <div class="review-date" style="margin-bottom:5px;">${r.date}</div>
            <p class="review-text">${r.text}</p>
        `;
        list.appendChild(item);
    });
}

// Rating selection click event setup inside Add Review box
function initRatingStarsSelect() {
    const stars = document.querySelectorAll('#ratingSelect .star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.dataset.val);
            currentRatingSelection = val;
            
            stars.forEach(s => {
                s.classList.remove('active');
                if (parseInt(s.dataset.val) <= val) s.classList.add('active');
            });
        });
    });
}

// Submit a new review to LocalStorage
function submitReview() {
    if (!currentActiveProductId) return;
    
    const nameInput = document.getElementById('reviewAuthorName');
    const textInput = document.getElementById('reviewTextarea');
    
    if (!nameInput || !textInput) return;
    
    const author = nameInput.value.trim();
    const text = textInput.value.trim();
    
    if (!author || !text) {
        alert("Please fill out your name and review message!");
        return;
    }

    const newReview = {
        author: author,
        rating: currentRatingSelection,
        date: new Date().toISOString().split('T')[0],
        text: text
    };

    // Load, push, and save
    const currentReviews = getReviews(currentActiveProductId);
    currentReviews.unshift(newReview); // Place newest first
    localStorage.setItem(`chococrumb_reviews_${currentActiveProductId}`, JSON.stringify(currentReviews));

    // Clear form inputs
    nameInput.value = '';
    textInput.value = '';
    
    // Reset rating stars selectors to 5 stars
    currentRatingSelection = 5;
    const stars = document.querySelectorAll('#ratingSelect .star');
    stars.forEach(s => s.classList.add('active'));

    // Rerender reviews and alert success
    renderReviews();
    showToast("🌟 Review posted successfully! Thank you.");
}

// Checkout Modal management
function openCheckout() {
    if (cart.length === 0) {
        showToast("🛒 Your cart is empty! Add products first.");
        return;
    }

    // Close cart drawer just in case
    closeCart();

    const modal = document.getElementById('checkoutModal');
    const summaryList = document.getElementById('checkoutSummaryItems');
    
    // Clear list
    if (summaryList) summaryList.innerHTML = '';

    // Populate checkout panel sidebar details
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'checkout-summary-item';
        li.innerHTML = `
            <span class="checkout-summary-item-name">${item.name} (${item.option}) <span style="color:var(--accent-gold);">x${item.quantity}</span></span>
            <span class="checkout-summary-item-price">₹ ${item.price * item.quantity}</span>
        `;
        if (summaryList) summaryList.appendChild(li);
    });

    // Populate pricing
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * discountRate;
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const finalTotal = subtotal - discount + deliveryFee;

    const subtotalText = document.getElementById('checkoutSubtotalText');
    const discountText = document.getElementById('checkoutDiscountText');
    const deliveryText = document.getElementById('checkoutDeliveryText');
    const totalText = document.getElementById('checkoutTotalText');

    if (subtotalText) subtotalText.textContent = `₹ ${subtotal}`;
    if (discountText) discountText.textContent = `- ₹ ${discount.toFixed(0)}`;
    if (deliveryText) deliveryText.textContent = deliveryFee === 0 ? 'FREE' : `₹ ${deliveryFee}`;
    if (totalText) totalText.textContent = `₹ ${finalTotal.toFixed(0)}`;

    const checkoutPromoRow = document.getElementById('checkoutPromoRow');
    if (checkoutPromoRow) {
        checkoutPromoRow.style.display = discountRate > 0 ? 'flex' : 'none';
    }

    if (modal) modal.classList.add('open');
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('open');
}

// DUAL-CHANNEL CHECKOUT SYSTEM TRIGGER (EMAIL VIA FORMSUBMIT AJAX & PRE-FORMATTED WHATSAPP ROUTER)
function processOrder(channel) {
    const nameInput = document.getElementById('custName');
    const emailInput = document.getElementById('custEmail');
    const phoneInput = document.getElementById('custPhone');
    const addressInput = document.getElementById('custAddress');
    const notesInput = document.getElementById('custNotes');

    if (!nameInput || !emailInput || !phoneInput || !addressInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const notes = notesInput ? notesInput.value.trim() : 'None';

    // Simple Form Validations
    if (!name || !email || !phone || !address) {
        showToast("⚠️ Please fill out all required shipping fields!");
        return;
    }

    // Calculations summary
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * discountRate;
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const finalTotal = subtotal - discount + deliveryFee;

    // Items list description
    const itemsFormattedList = cart.map(item => `${item.quantity}x ${item.name} (${item.option}) - ₹${item.price * item.quantity}`).join('\n');

    // CHANNEL 1: WHATSAPP DIRECT MESSAGE (TO 6235890426)
    if (channel === 'whatsapp') {
        const message = `*🍪 CHOCOCRUMB PREMIUM ORDER RECEIVED 🍪*\n` +
                        `===================================\n` +
                        `*Customer Details:*\n` +
                        `👤 *Name:* ${name}\n` +
                        `📧 *Email:* ${email}\n` +
                        `📞 *Phone:* ${phone}\n` +
                        `📍 *Shipping Address:* ${address}\n` +
                        `📝 *Instructions:* ${notes}\n\n` +
                        `*Order Details:*\n` +
                        `${itemsFormattedList}\n` +
                        `===================================\n` +
                        `*Subtotal:* ₹${subtotal}\n` +
                        `${discount > 0 ? `*Promo Code Discount:* -₹${discount.toFixed(0)}\n` : ''}` +
                        `*Delivery Charge:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n` +
                        `💰 *Grand Total:* ₹${finalTotal.toFixed(0)}\n\n` +
                        `Please confirm my order and share delivery schedule!`;

        const encodedMsg = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/91${contactWhatsApp}?text=${encodedMsg}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        // Clear cart, close checkout, and trigger success popup
        clearCartAfterPurchase();
        closeCheckout();
        showSuccessOverlay("WhatsApp Message Sent!", "Your order text has been sent directly to our store WhatsApp chat. We will reply shortly to confirm payment and delivery times!");
    } 
    // CHANNEL 2: EMAIL DELIVER TO OWNER (TO DOODHANX@GMAIL.COM VIA FORMSUBMIT AJAX API)
    else if (channel === 'email') {
        // Show high-end loading overlay
        const loading = document.getElementById('loadingOverlay');
        if (loading) loading.classList.add('show');

        // Prepare JSON payload for FormSubmit AJAX submission
        const payload = {
            "Customer Name": name,
            "Customer Email": email,
            "Customer Phone": phone,
            "Shipping Address": address,
            "Special Notes": notes,
            "Items Ordered": itemsFormattedList,
            "Subtotal Price": `₹${subtotal}`,
            "Discount Availed": `₹${discount.toFixed(0)}`,
            "Delivery Charges": deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`,
            "Final Grand Total": `₹${finalTotal.toFixed(0)}`,
            "_subject": `🍪 New Cookie Order Placed by ${name}!`,
            "_honey": "", // Anti-spam honeypot hidden field
            "_captcha": "false" // Disable standard FormSubmit recapcha redirect for seamless background JSON fetch
        };

        fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            // Hide loading spinner
            if (loading) loading.classList.remove('show');

            if (data.success === "true" || data.success === true) {
                // Clear cart, close checkout, and show success popup
                clearCartAfterPurchase();
                closeCheckout();
                showSuccessOverlay("Order Placed Successfully!", `Your order details have been securely sent directly to the bakery owners inbox at ${contactEmail}. We will review it and dispatch your cookies shortly!`);
            } else {
                showToast("❌ Email delivery failed. Please order via WhatsApp!");
            }
        })
        .catch(error => {
            if (loading) loading.classList.remove('show');
            console.error('Email delivery error:', error);
            showToast("⚠️ Network issue. Please use the 'Order via WhatsApp' button!");
        });
    }
}

// Clears cart and resets application states after completed purchases
function clearCartAfterPurchase() {
    cart = [];
    localStorage.removeItem('chococrumb_cart');
    updateCartUI();
}

// Custom Premium Success Screen Animation
function showSuccessOverlay(title, text) {
    const successOverlay = document.getElementById('successOverlay');
    const successTitle = document.getElementById('successOverlayTitle');
    const successText = document.getElementById('successOverlayText');

    if (successTitle) successTitle.textContent = title;
    if (successText) successText.textContent = text;

    if (successOverlay) successOverlay.classList.add('show');
}

function closeSuccessOverlay() {
    const successOverlay = document.getElementById('successOverlay');
    if (successOverlay) successOverlay.classList.remove('show');
}
