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

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000
    ? Math.round(subtotal * 0.1)
    : 0;
  const delivery = subtotal >= 50000 ? 0 : 30000;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
