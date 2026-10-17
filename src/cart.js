function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

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

function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
