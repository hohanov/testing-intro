const PROMO_CODE = 'SAVE10';
const PROMO_RATE = 0.1;
const PROMO_MIN_SUBTOTAL = 20000;
const DELIVERY_PRICE = 30000;
const FREE_DELIVERY_SUBTOTAL = 50000;

function assertQuantity(quantity, stock) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество товара должно быть положительным целым числом.');
  }
  if (quantity > stock) {
    throw new RangeError(`На складе есть только ${stock} шт. этого товара.`);
  }
}

function addToCart(cart, product, quantity = 1) {
  const existing = cart.find((item) => item.id === product.id);
  const nextQuantity = (existing ? existing.quantity : 0) + quantity;

  assertQuantity(quantity, product.stock);
  assertQuantity(nextQuantity, product.stock);

  if (!existing) return [...cart, { ...product, quantity: nextQuantity }];
  return cart.map((item) => (item.id === product.id ? { ...item, quantity: nextQuantity } : item));
}

function changeQuantity(cart, productId, quantity) {
  const existing = cart.find((item) => item.id === productId);
  if (!existing) return cart;

  assertQuantity(quantity, existing.stock);

  return cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  const hasDiscount = promoCode === PROMO_CODE && subtotal >= PROMO_MIN_SUBTOTAL;
  const discount = hasDiscount ? Math.round(subtotal * PROMO_RATE) : 0;
  const delivery = subtotal > 0 && subtotal < FREE_DELIVERY_SUBTOTAL ? DELIVERY_PRICE : 0;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
