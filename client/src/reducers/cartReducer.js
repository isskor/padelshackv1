let initialState = [];

// load from local storage
if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem('cart'));
  } else {
    initialState = [];
  }
}

const addItemToCart = (cartItems, cartItemToAdd, count) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToAdd._id
  );
  let newCart;
  if (existingCartItem) {
    newCart = cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, count: count || cartItem.count + 1 }
        : cartItem
    );
  } else {
    newCart = [...cartItems, { ...cartItemToAdd, count: 1 }];
  }
  localStorage.setItem('cart', JSON.stringify(newCart));
  return newCart;
};

const decreaseItemFromCart = (cartItems, cartItemToDecrease) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToDecrease._id
  );
  let newCart;
  if (existingCartItem.count === 1) {
    return removeItemFromCart(cartItems, cartItemToDecrease);
  } else {
    newCart = cartItems.map((cartItem) =>
      cartItem._id === cartItemToDecrease._id
        ? { ...cartItem, count: cartItem.count - 1 }
        : cartItem
    );
  }
  localStorage.setItem('cart', JSON.stringify(newCart));
  return newCart;
};

const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCart = cartItems.filter((item) => item._id !== itemToRemove._id);

  localStorage.setItem('cart', JSON.stringify(newCart));
  return newCart;
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, count } = action.payload;
      return addItemToCart(state, product, count);
    case 'DECREASE_FROM_CART':
      return decreaseItemFromCart(state, action.payload);
    case 'REMOVE_FROM_CART':
      return removeItemFromCart(state, action.payload);
    case 'EMPTY_CART':
      return [];
    default:
      return state;
  }
};
