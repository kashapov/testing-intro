function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Quantity must be positive');
  }

  const existing = cart.find((item) => item.id === product.id);
  const nextQuantity = existing ? existing.quantity + quantity : quantity;

  if (nextQuantity > product.stock) {
    throw new RangeError('Quantity exceeds stock');
  }

  if (existing) {
    return cart.map((item) => (
      item.id === product.id ? { ...item, quantity: nextQuantity } : item
    ));
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Quantity must be positive');
  }

  const existing = cart.find((item) => item.id === productId);
  if (!existing) {
    return cart;
  }

  if (quantity > existing.stock) {
    throw new RangeError('Quantity exceeds stock');
  }

  return cart.map((item) => (
    item.id === productId ? { ...item, quantity } : item
  ));
}

function removeFromCart(cart, productId) {
  if (!cart.some((item) => item.id === productId)) {
    return cart;
  }

  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function calculateOrderTotal() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
