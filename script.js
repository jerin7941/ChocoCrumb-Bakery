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
let discountRate = 0;
const contactWhatsApp = '9074008178';
const contactEmail = 'jerinshaji7941@gmail.com';

// LocalStorage Persistent Reviews Database Setup
const getReviews = (productId) => {
    let reviews = JSON.parse(localStorage.getItem(`chococrumb_reviews_${productId}`));
    if (!reviews) {
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
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterAndRender();
        });
    }

    const categoryPills = document.querySelectorAll('.pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            selectedCategory = pill.dataset.category;
            filterAndRender();
        });
    });

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortBy = e.target.value;
            filterAndRender();
        });
    }

    const closeDetailModal = document.getElementById('closeDetailModal');
    if (closeDetailModal) closeDetailModal.addEventListener('click', closeProductModal);

    const closeCheckoutModal = document.getElementById('closeCheckoutModal');
    if (closeCheckoutModal) closeCheckoutModal.addEventListener('click', closeCheckout);

    const closeCartBtn = document.getElementById('closeCartBtn');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

    const applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) applyPromoBtn.addEventListener('click', applyPromoCode);

    const openCheckoutBtn = document.getElementById('openCheckoutBtn');
    if (openCheckoutBtn) openCheckoutBtn.addEventListener('click', openCheckout);

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => { e.preventDefault(); });
    }

    window.addEventListener('click', (e) => {
        const detailOverlay = document.getElementById('productDetailModal');
        const checkoutOverlay = document.getElementById('checkoutModal');
        if (e.target === detailOverlay) closeProductModal();
        if (e.target === checkoutOverlay) closeCheckout();
    });
}

// Filter and Render Products
function filterAndRender() {
    let filtered = products.filter(product => {
        const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchSearch = product.name.toLowerCase().includes(searchQuery) ||
                            product.description.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
    });

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    renderProducts(filtered);
}

// Render dynamic product cards
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
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)" title="Add to Wishlist">❤️</button>
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

// Stars HTML helper
function renderStarsHTML(rating) {
    let html = '';
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    for (let i = 1; i <= 5; i++) {
        if (i <= full) html += '★';
        else if (i === full + 1 && half) html += '☆';
        else html += '☆';
    }
    return html;
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// Wishlist toggle
function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    const index = wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);
    if (index === -1) {
        wishlist.push(productId);
        showToast('❤️ Added ' + product.name + ' to Wishlist!');
    } else {
        wishlist.splice(index, 1);
        showToast('💔 Removed ' + product.name + ' from Wishlist.');
    }
    localStorage.setItem('chococrumb_wishlist', JSON.stringify(wishlist));
    const card = document.querySelector('.cookie-card[data-id="' + productId + '"]');
    if (card) {
        const btn = card.querySelector('.wishlist-btn');
        if (btn) btn.classList.toggle('active');
    }
}

// Buy Now
function buyNowImmediate(productId) {
    addToCart(productId, 1, 'Standard', true);
}

// Add to Cart
function addToCart(productId, quantity = 1, option = 'Standard', isBuyNow = false) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId && item.option === option);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, option: option, quantity: quantity });
    }

    localStorage.setItem('chococrumb_cart', JSON.stringify(cart));
    updateCartUI();
    showToast('🍪 ' + product.name + ' (' + option + ') added to Cart!');

    if (isBuyNow) openCheckout();
    else openCart();
}

// Change quantity in cart
function changeCartQuantity(productId, option, amount) {
    const index = cart.findIndex(item => item.id === productId && item.option === option);
    if (index === -1) return;
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
        showToast('🗑️ Item removed from Cart.');
    }
    localStorage.setItem('chococrumb_cart', JSON.stringify(cart));
    updateCartUI();
}

// Remove cart item
function removeCartItem(productId, option) {
    const index = cart.findIndex(item => item.id === productId && item.option === option);
    if (index === -1) return;
    cart.splice(index, 1);
    localStorage.setItem('chococrumb_cart', JSON.stringify(cart));
    updateCartUI();
    showToast('🗑️ Item removed from Cart.');
}

// Update cart UI
function updateCartUI() {
    const badge = document.getElementById('cartBadgeCount');
    const list = document.getElementById('cartItemList');
    const drawerFooter = document.getElementById('drawerFooter');

    if (list) list.innerHTML = '';

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

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * discountRate;
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const finalTotal = subtotal - discount + deliveryFee;

    const subtotalText = document.getElementById('cartSubtotalText');
    const discountText = document.getElementById('cartDiscountText');
    const deliveryText = document.getElementById('cartDeliveryText');
    const totalText = document.getElementById('cartTotalText');

    if (subtotalText) subtotalText.textContent = '₹ ' + subtotal;
    if (discountText) discountText.textContent = '- ₹ ' + discount.toFixed(0);
    if (deliveryText) deliveryText.textContent = deliveryFee === 0 ? 'FREE' : '₹ ' + deliveryFee;
    if (totalText) totalText.textContent = '₹ ' + finalTotal.toFixed(0);

    const promoRow = document.getElementById('promoRow');
    if (promoRow) promoRow.style.display = discountRate > 0 ? 'flex' : 'none';
}

// Cart drawer
function openCart() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.classList.add('open');
}
function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) drawer.classList.remove('open');
}

// Promo code
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

// Product modal
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

    if (galleryImg) galleryImg.src = product.image;
    if (tag) { tag.textContent = product.badge || product.category; tag.style.display = 'block'; }
    if (title) title.textContent = product.name + ' Cookie';
    if (price) price.textContent = '₹ ' + product.price;
    if (desc) desc.textContent = product.description;
    if (ingredients) ingredients.textContent = product.ingredients;
    if (allergens) allergens.textContent = product.allergens;

    const pills = document.querySelectorAll('#modalOptionPills .option-pill');
    pills.forEach(pill => {
        pill.classList.remove('active');
        if (pill.dataset.option === 'Standard') pill.classList.add('active');
    });

    const quantityVal = document.getElementById('modalQuantityValue');
    if (quantityVal) quantityVal.textContent = '1';

    renderReviews();
    if (modal) modal.classList.add('open');
}

function closeProductModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.remove('open');
    currentActiveProductId = null;
}

function changeModalQuantity(amount) {
    const quantityVal = document.getElementById('modalQuantityValue');
    if (!quantityVal) return;
    let val = parseInt(quantityVal.textContent) + amount;
    if (val < 1) val = 1;
    quantityVal.textContent = val;
}

function selectOptionPill(element) {
    document.querySelectorAll('#modalOptionPills .option-pill').forEach(p => p.classList.remove('active'));
    element.classList.add('active');
}

function addModalProductToCart() {
    if (!currentActiveProductId) return;
    const quantityVal = document.getElementById('modalQuantityValue');
    const activePill = document.querySelector('#modalOptionPills .option-pill.active');
    const qty = quantityVal ? parseInt(quantityVal.textContent) : 1;
    const option = activePill ? activePill.dataset.option : 'Standard';
    addToCart(currentActiveProductId, qty, option, false);
    closeProductModal();
}

// Reviews
function renderReviews() {
    const list = document.getElementById('reviewsList');
    if (!list || !currentActiveProductId) return;
    list.innerHTML = '';
    const productReviews = getReviews(currentActiveProductId);
    if (productReviews.length === 0) {
        list.innerHTML = '<p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">No reviews yet. Be the first to review!</p>';
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

function submitReview() {
    if (!currentActiveProductId) return;
    const nameInput = document.getElementById('reviewAuthorName');
    const textInput = document.getElementById('reviewTextarea');
    if (!nameInput || !textInput) return;
    const author = nameInput.value.trim();
    const text = textInput.value.trim();
    if (!author || !text) { alert('Please fill out your name and review message!'); return; }

    const newReview = { author, rating: currentRatingSelection, date: new Date().toISOString().split('T')[0], text };
    const currentReviews = getReviews(currentActiveProductId);
    currentReviews.unshift(newReview);
    localStorage.setItem('chococrumb_reviews_' + currentActiveProductId, JSON.stringify(currentReviews));

    nameInput.value = '';
    textInput.value = '';
    currentRatingSelection = 5;
    document.querySelectorAll('#ratingSelect .star').forEach(s => s.classList.add('active'));
    renderReviews();
    showToast('🌟 Review posted successfully! Thank you.');
}

// Checkout Modal
function openCheckout() {
    if (cart.length === 0) { showToast('🛒 Your cart is empty! Add products first.'); return; }
    closeCart();

    const modal = document.getElementById('checkoutModal');
    const summaryList = document.getElementById('checkoutSummaryItems');
    if (summaryList) summaryList.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'checkout-summary-item';
        li.innerHTML = `
            <span class="checkout-summary-item-name">${item.name} (${item.option}) <span style="color:var(--accent-gold);">x${item.quantity}</span></span>
            <span class="checkout-summary-item-price">₹ ${item.price * item.quantity}</span>
        `;
        if (summaryList) summaryList.appendChild(li);
    });

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * discountRate;
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const finalTotal = subtotal - discount + deliveryFee;

    const st = document.getElementById('checkoutSubtotalText');
    const dt = document.getElementById('checkoutDiscountText');
    const dv = document.getElementById('checkoutDeliveryText');
    const tt = document.getElementById('checkoutTotalText');

    if (st) st.textContent = '₹ ' + subtotal;
    if (dt) dt.textContent = '- ₹ ' + discount.toFixed(0);
    if (dv) dv.textContent = deliveryFee === 0 ? 'FREE' : '₹ ' + deliveryFee;
    if (tt) tt.textContent = '₹ ' + finalTotal.toFixed(0);

    const checkoutPromoRow = document.getElementById('checkoutPromoRow');
    if (checkoutPromoRow) checkoutPromoRow.style.display = discountRate > 0 ? 'flex' : 'none';

    if (modal) modal.classList.add('open');
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('open');
}

// Process Order (WhatsApp or Email)
function processOrder(channel) {
    const nameInput    = document.getElementById('custName');
    const emailInput   = document.getElementById('custEmail');
    const phoneInput   = document.getElementById('custPhone');
    const addressInput = document.getElementById('custAddress');
    const notesInput   = document.getElementById('custNotes');

    if (!nameInput || !emailInput || !phoneInput || !addressInput) return;

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const phone   = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const notes   = notesInput ? notesInput.value.trim() : '';

    if (!name || !email || !phone || !address) {
        showToast('⚠️ Please fill out all required shipping fields!');
        return;
    }

    const subtotal    = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount    = subtotal * discountRate;
    const deliveryFee = subtotal > 500 ? 0 : 50;
    const finalTotal  = subtotal - discount + deliveryFee;

    const itemsFormattedList = cart.map(item =>
        item.quantity + 'x ' + item.name + ' (' + item.option + ') - Rs.' + (item.price * item.quantity)
    ).join('\n');

    // Build order data object for PDF
    const orderData = {
        name, email, phone, address,
        notes: notes || 'None',
        items: JSON.parse(JSON.stringify(cart)), // deep copy before cart clears
        subtotal, discount, deliveryFee, finalTotal,
        channel,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        invoiceNo: 'CC-' + Date.now().toString().slice(-6)
    };

    if (channel === 'whatsapp') {
        const message =
            '*🍪 CHOCOCRUMB PREMIUM ORDER RECEIVED 🍪*\n' +
            '===================================\n' +
            '*Customer Details:*\n' +
            '👤 *Name:* ' + name + '\n' +
            '📧 *Email:* ' + email + '\n' +
            '📞 *Phone:* ' + phone + '\n' +
            '📍 *Shipping Address:* ' + address + '\n' +
            '📝 *Instructions:* ' + (notes || 'None') + '\n\n' +
            '*Order Details:*\n' +
            itemsFormattedList + '\n' +
            '===================================\n' +
            '*Subtotal:* Rs.' + subtotal + '\n' +
            (discount > 0 ? '*Promo Discount:* -Rs.' + discount.toFixed(0) + '\n' : '') +
            '*Delivery:* ' + (deliveryFee === 0 ? 'FREE' : 'Rs.' + deliveryFee) + '\n' +
            '💰 *Grand Total:* Rs.' + finalTotal.toFixed(0) + '\n\n' +
            'Please confirm my order and share delivery schedule!';

        window.open('https://wa.me/91' + contactWhatsApp + '?text=' + encodeURIComponent(message), '_blank');

        clearCartAfterPurchase();
        closeCheckout();
        showSuccessOverlay(
            'WhatsApp Message Sent!',
            'Your order has been sent to our store WhatsApp. We will reply shortly to confirm!',
            orderData
        );

    } else if (channel === 'email') {
        const loading = document.getElementById('loadingOverlay');
        if (loading) loading.classList.add('show');

        const payload = {
            'Customer Name': name,
            'Customer Email': email,
            'Customer Phone': phone,
            'Shipping Address': address,
            'Special Notes': notes || 'None',
            'Items Ordered': itemsFormattedList,
            'Subtotal Price': 'Rs.' + subtotal,
            'Discount Availed': 'Rs.' + discount.toFixed(0),
            'Delivery Charges': deliveryFee === 0 ? 'FREE' : 'Rs.' + deliveryFee,
            'Final Grand Total': 'Rs.' + finalTotal.toFixed(0),
            '_subject': '🍪 New Cookie Order by ' + name + '!',
            '_honey': '',
            '_captcha': 'false'
        };

        fetch('https://formsubmit.co/ajax/' + contactEmail, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(r => r.json())
        .then(data => {
            if (loading) loading.classList.remove('show');
            if (data.success === 'true' || data.success === true) {
                clearCartAfterPurchase();
                closeCheckout();
                showSuccessOverlay(
                    'Order Placed Successfully!',
                    'Your order has been sent to ' + contactEmail + '. We will dispatch your cookies shortly!',
                    orderData
                );
            } else {
                showToast('❌ Email delivery failed. Please order via WhatsApp!');
            }
        })
        .catch(err => {
            if (loading) loading.classList.remove('show');
            console.error('Email error:', err);
            showToast("⚠️ Network issue. Please use the 'Order via WhatsApp' button!");
        });
    }
}

// Clear cart after purchase
function clearCartAfterPurchase() {
    cart = [];
    localStorage.removeItem('chococrumb_cart');
    updateCartUI();
}

// Store last order data for PDF
let lastOrderData = null;

// Success overlay
function showSuccessOverlay(title, text, orderData) {
    const successOverlay = document.getElementById('successOverlay');
    const successTitle   = document.getElementById('successOverlayTitle');
    const successText    = document.getElementById('successOverlayText');
    if (successTitle) successTitle.textContent = title;
    if (successText)  successText.textContent  = text;
    if (orderData)    lastOrderData = orderData;
    if (successOverlay) successOverlay.classList.add('show');
}

function closeSuccessOverlay() {
    const successOverlay = document.getElementById('successOverlay');
    if (successOverlay) successOverlay.classList.remove('show');
}

// ================================================================
// PDF INVOICE — opens a styled print window → user saves as PDF
// Works on ANY browser, file:// protocol, NO external libraries
// ================================================================
function downloadPDFInvoice() {
    if (!lastOrderData) {
        showToast('⚠️ No order found. Place an order first, then download the invoice.');
        return;
    }

    const { name, email, phone, address, notes, items,
            subtotal, discount, deliveryFee, finalTotal,
            channel, date, invoiceNo } = lastOrderData;

    // Build item rows
    const itemRows = items.map((item, i) => {
        const prod = products.find(p => p.id === item.id) || {};
        const bg   = i % 2 === 0 ? '#fffdf9' : '#fff4e8';
        return '<tr style="background:' + bg + '">' +
            '<td style="padding:11px 14px;border:1px solid #f0e8d8;vertical-align:top">' +
                '<strong style="color:#231610;font-size:13px">' + item.name + ' Cookie</strong><br>' +
                '<span style="font-size:10px;color:#999">' + (prod.ingredients || '') + '</span>' +
            '</td>' +
            '<td style="padding:11px 14px;border:1px solid #f0e8d8;text-align:center;font-size:12px;color:#7c5844">' + item.option + '</td>' +
            '<td style="padding:11px 14px;border:1px solid #f0e8d8;text-align:center;font-size:12px">Rs. ' + item.price + '</td>' +
            '<td style="padding:11px 14px;border:1px solid #f0e8d8;text-align:center;font-size:13px;font-weight:700">' + item.quantity + '</td>' +
            '<td style="padding:11px 14px;border:1px solid #f0e8d8;text-align:right;font-size:13px;font-weight:700;color:#231610">Rs. ' + (item.price * item.quantity) + '</td>' +
        '</tr>' +
        '<tr style="background:' + bg + '">' +
            '<td colspan="5" style="padding:0 14px 10px;border:1px solid #f0e8d8;font-size:10px;color:#e24c4c;border-top:none">' +
                '<strong>Allergens:</strong> ' + (prod.allergens || '') +
            '</td>' +
        '</tr>';
    }).join('');

    const discountRow = discount > 0
        ? '<tr><td style="padding:10px 14px;font-size:12px;color:#2e7d32">Promo Discount (15%)</td>' +
          '<td style="padding:10px 14px;text-align:right;font-size:12px;font-weight:700;color:#2e7d32">- Rs. ' + discount.toFixed(0) + '</td></tr>'
        : '';

    const notesHtml = (notes && notes !== 'None' && notes.trim() !== '')
        ? '<br><span style="font-size:11px"><strong>📝 Notes:</strong> ' + notes + '</span>'
        : '';

    const html = '<!DOCTYPE html><html lang="en"><head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>ChocoCrumb Invoice ' + invoiceNo + '</title>' +
        '<style>' +
            '*{margin:0;padding:0;box-sizing:border-box}' +
            'body{font-family:Arial,Helvetica,sans-serif;background:#f5f0eb;color:#231610}' +
            '.page{max-width:800px;margin:20px auto;background:#fff;box-shadow:0 4px 30px rgba(0,0,0,.15)}' +
            '.header{background:linear-gradient(135deg,#231610 0%,#4a3429 100%);padding:32px 40px;display:flex;justify-content:space-between;align-items:flex-start}' +
            '.brand-name{font-size:30px;font-weight:900;color:#fff;letter-spacing:2px}' +
            '.brand-sub{font-size:9px;color:#d4af37;letter-spacing:5px;margin-top:5px}' +
            '.inv-right{text-align:right}' +
            '.inv-label{font-size:20px;font-weight:700;color:#d4af37;margin-bottom:5px}' +
            '.inv-meta{font-size:11px;color:#ccc;line-height:2}' +
            '.gold-bar{height:5px;background:linear-gradient(90deg,#d4af37,#b89222,#d4af37)}' +
            '.addresses{display:flex;border-bottom:2px solid #f0e8d8}' +
            '.addr{flex:1;padding:24px 32px}' +
            '.addr+.addr{border-left:1px solid #f0e8d8}' +
            '.addr-lbl{font-size:9px;font-weight:900;letter-spacing:3px;color:#d4af37;text-transform:uppercase;margin-bottom:10px}' +
            '.addr-name{font-size:16px;font-weight:700;margin-bottom:8px}' +
            '.addr-info{font-size:12px;color:#6e5e57;line-height:2}' +
            '.section{padding:24px 32px}' +
            '.sec-title{font-size:9px;font-weight:900;letter-spacing:3px;color:#d4af37;text-transform:uppercase;margin-bottom:14px}' +
            'table.items{width:100%;border-collapse:collapse}' +
            'thead tr{background:#231610}' +
            'thead th{padding:11px 14px;font-size:10px;letter-spacing:1px;color:#fff;font-weight:700;text-align:left}' +
            'th.c,td.c{text-align:center}' +
            'th.r,td.r{text-align:right}' +
            '.summary-wrap{display:flex;justify-content:flex-end;padding:0 32px 24px}' +
            '.summary-box{width:300px;border:1px solid #f0e8d8;border-radius:8px;overflow:hidden}' +
            '.s-row{display:flex;justify-content:space-between;padding:12px 16px;font-size:12px;border-bottom:1px solid #f0e8d8;background:#fffdf9}' +
            '.s-label{color:#6e5e57}' +
            '.s-val{font-weight:700}' +
            '.s-total{display:flex;justify-content:space-between;padding:14px 16px;background:#231610}' +
            '.s-total-lbl{color:#d4af37;font-weight:700;font-size:13px}' +
            '.s-total-val{color:#fff;font-weight:900;font-size:15px}' +
            '.payment-box{margin:0 32px 24px;background:#fff8f0;border-left:5px solid #d4af37;padding:14px 18px;font-size:12px;color:#6e5e57;border-radius:0 6px 6px 0}' +
            '.footer{background:#231610;padding:20px 32px;display:flex;justify-content:space-between;align-items:center}' +
            '.f-left{color:#d4af37;font-weight:700;font-size:12px}' +
            '.f-right{color:#aaa;font-size:11px;text-align:right;line-height:1.8}' +
            '.no-print{background:#231610;color:#fff;text-align:center;padding:16px;font-size:13px;font-weight:600;position:sticky;top:0;z-index:99}' +
            '.print-btn{background:#d4af37;border:none;padding:9px 24px;font-size:13px;font-weight:700;cursor:pointer;border-radius:5px;margin-left:16px;color:#231610}' +
            '.print-btn:hover{background:#fff}' +
            '@media print{' +
                '.no-print{display:none!important}' +
                'body{background:#fff}' +
                '.page{box-shadow:none;margin:0;max-width:100%}' +
                '*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}' +
            '}' +
        '</style></head><body>' +

        '<div class="no-print">' +
            '📄 To save as PDF: click the button below → choose <strong style="color:#d4af37">Save as PDF</strong> as the destination printer → click Save' +
            '<button class="print-btn" onclick="window.print()">🖨️ Save as PDF</button>' +
        '</div>' +

        '<div class="page">' +

            '<div class="header">' +
                '<div>' +
                    '<div class="brand-name">ChocoCrumb</div>' +
                    '<div class="brand-sub">P R E M I U M &nbsp; B A K E R Y</div>' +
                '</div>' +
                '<div class="inv-right">' +
                    '<div class="inv-label">TAX INVOICE</div>' +
                    '<div class="inv-meta">' +
                        'Invoice No: <strong>' + invoiceNo + '</strong><br>' +
                        'Date: ' + date + '<br>' +
                        'Order via: ' + (channel === 'whatsapp' ? 'WhatsApp' : 'Email') +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="gold-bar"></div>' +

            '<div class="addresses">' +
                '<div class="addr">' +
                    '<div class="addr-lbl">Bill To</div>' +
                    '<div class="addr-name">' + name + '</div>' +
                    '<div class="addr-info">' +
                        '📧 ' + email + '<br>' +
                        '📞 ' + phone + '<br>' +
                        '📍 ' + address.replace(/\n/g, ', ') +
                        notesHtml +
                    '</div>' +
                '</div>' +
                '<div class="addr">' +
                    '<div class="addr-lbl">From</div>' +
                    '<div class="addr-name">ChocoCrumb Premium</div>' +
                    '<div class="addr-info">' +
                        '📍 Cheppad, Alappuzha, Kerala 690507<br>' +
                        'India<br>' +
                        '📞 +91 9074008178<br>' +
                        '✉️ jerinshaji7941@gmail.com' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="section">' +
                '<div class="sec-title">Order Items</div>' +
                '<table class="items">' +
                    '<thead><tr>' +
                        '<th style="width:36%">ITEM &amp; INGREDIENTS</th>' +
                        '<th class="c" style="width:13%">OPTION</th>' +
                        '<th class="c" style="width:16%">UNIT PRICE</th>' +
                        '<th class="c" style="width:10%">QTY</th>' +
                        '<th class="r" style="width:25%">AMOUNT</th>' +
                    '</tr></thead>' +
                    '<tbody>' + itemRows + '</tbody>' +
                '</table>' +
            '</div>' +

            '<div class="summary-wrap">' +
                '<div class="summary-box">' +
                    '<div class="s-row"><span class="s-label">Subtotal</span><span class="s-val">Rs. ' + subtotal + '</span></div>' +
                    discountRow.replace('<tr>', '<div class="s-row" style="color:#2e7d32">').replace('</tr>', '</div>').replace('<td style="padding:10px 14px;font-size:12px;color:#2e7d32">', '<span>').replace('</td>', '</span>').replace('<td style="padding:10px 14px;text-align:right;font-size:12px;font-weight:700;color:#2e7d32">', '<span>').replace('</td>', '</span>') +
                    '<div class="s-row"><span class="s-label">Delivery Charges</span><span class="s-val">' + (deliveryFee === 0 ? '🎉 FREE' : 'Rs. ' + deliveryFee) + '</span></div>' +
                    '<div class="s-total"><span class="s-total-lbl">GRAND TOTAL</span><span class="s-total-val">Rs. ' + finalTotal.toFixed(0) + '</span></div>' +
                '</div>' +
            '</div>' +

            '<div class="payment-box">' +
                '💳 <strong style="color:#231610">Payment Method:</strong> Cash on Delivery (COD) or UPI on arrival. No advance payment required.' +
            '</div>' +

            '<div class="footer">' +
                '<div class="f-left">ChocoCrumb Premium &nbsp;|&nbsp; chococrumb.in</div>' +
                '<div class="f-right">' +
                    'Thank you for ordering from ChocoCrumb Premium! 🍪<br>' +
                    'Cheppad, Alappuzha, Kerala 690507, India' +
                '</div>' +
            '</div>' +

        '</div>' +

        '<script>' +
            'window.onload = function() { setTimeout(function(){ window.print(); }, 700); };' +
        '<\/script>' +
        '</body></html>';

    const win = window.open('', '_blank', 'width=860,height=720,scrollbars=yes');
    if (!win) {
        showToast('⚠️ Pop-ups blocked! Allow pop-ups for this site, then click Download PDF again.');
        return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    showToast('📄 Invoice opened! Click "Save as PDF" in the print dialog.');
}
