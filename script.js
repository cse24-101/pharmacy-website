const products = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Pain relief', price: 38.50, icon: '💊', color: '#d8eced', description: 'Everyday pain and fever relief' },
  { id: 2, name: 'Daily Multivitamins', category: 'Vitamins', price: 95.00, icon: '🍊', color: '#f9e8b6', description: '30 tablets for daily wellness' },
  { id: 3, name: 'Gentle Hand Wash', category: 'Personal care', price: 52.00, icon: '🧴', color: '#e4d8ee', description: 'Kind care for everyday hands' },
  { id: 4, name: 'First Aid Kit', category: 'First aid', price: 145.00, icon: '🩹', color: '#dcebc6', description: 'Home and travel essentials' },
  { id: 5, name: 'Vitamin C 1000mg', category: 'Vitamins', price: 78.00, icon: '🍋', color: '#f8e6a4', description: 'Immune support tablets' },
  { id: 6, name: 'Cooling Muscle Gel', category: 'Pain relief', price: 64.50, icon: '🧊', color: '#cde8ef', description: 'Soothing topical relief' },
  { id: 7, name: 'Daily Sunscreen SPF 50', category: 'Personal care', price: 112.00, icon: '☀️', color: '#f5dfc0', description: 'Broad spectrum daily protection' },
  { id: 8, name: 'Digital Thermometer', category: 'First aid', price: 89.00, icon: '🌡️', color: '#d4e7dc', description: 'Fast, easy temperature checks' }
];

let selectedFilter = 'all';
let cart = [];
const productGrid = document.querySelector('#product-grid');
const noResults = document.querySelector('#no-results');
const currency = value => `P${value.toFixed(2)}`;

function renderProducts() {
  const term = document.querySelector('#product-search').value.trim().toLowerCase();
  const visible = products.filter(product => (selectedFilter === 'all' || product.category === selectedFilter) && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term));
  productGrid.innerHTML = visible.map(product => `<article class="product-card"><div class="product-image" style="background:${product.color}"><span>${product.icon}</span></div><div class="product-details"><span class="product-category">${product.category}</span><h3>${product.name}</h3><p>${product.description}</p><div class="product-bottom"><strong>${currency(product.price)}</strong><button class="add-button" data-id="${product.id}">Add to cart</button></div></div></article>`).join('');
  noResults.hidden = visible.length !== 0;
}

function renderCart() {
  const items = document.querySelector('.cart-items');
  const empty = document.querySelector('.empty-cart');
  const summary = document.querySelector('.cart-summary');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.cart-count').textContent = count;
  empty.style.display = cart.length ? 'none' : 'block';
  summary.classList.toggle('visible', Boolean(cart.length));
  items.innerHTML = cart.map(item => `<div class="cart-item"><div><p>${item.name} <small>× ${item.quantity}</small></p><small>${currency(item.price)} each</small></div><div><strong>${currency(item.price * item.quantity)}</strong><br><button data-remove="${item.id}">Remove</button></div></div>`).join('');
  document.querySelector('.cart-total').textContent = currency(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const found = cart.find(item => item.id === id);
  found ? found.quantity++ : cart.push({ ...product, quantity: 1 });
  renderCart();
}

document.querySelector('#product-search').addEventListener('input', renderProducts);
document.querySelector('.filter-group').addEventListener('click', event => { if (!event.target.matches('.filter')) return; selectedFilter = event.target.dataset.filter; document.querySelectorAll('.filter').forEach(button => button.classList.toggle('active', button === event.target)); renderProducts(); });
productGrid.addEventListener('click', event => { if (event.target.matches('.add-button')) addToCart(Number(event.target.dataset.id)); });
document.querySelector('.cart-items').addEventListener('click', event => { if (!event.target.dataset.remove) return; cart = cart.filter(item => item.id !== Number(event.target.dataset.remove)); renderCart(); });
const panel = document.querySelector('.cart-panel'); const overlay = document.querySelector('.overlay');
function toggleCart(open) { panel.classList.toggle('open', open); overlay.classList.toggle('open', open); panel.setAttribute('aria-hidden', String(!open)); }
document.querySelector('.cart-button').addEventListener('click', () => toggleCart(true)); document.querySelector('.close-cart').addEventListener('click', () => toggleCart(false)); overlay.addEventListener('click', () => toggleCart(false));
document.querySelector('.checkout').addEventListener('click', () => { alert('This is a demonstration storefront. Please contact MediCare Pharmacy to place an order.'); });
document.querySelector('.menu-toggle').addEventListener('click', event => { const nav = document.querySelector('.main-nav'); const open = nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => { document.querySelector('.main-nav').classList.remove('open'); document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false'); }));
document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); event.currentTarget.querySelector('.form-message').textContent = 'Thanks — your message is ready to be sent. Our team will be in touch soon.'; event.currentTarget.reset(); });
document.querySelector('#year').textContent = new Date().getFullYear();
renderProducts(); renderCart();
