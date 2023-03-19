import * as actionTypes from './cart-types'

const initialState = {
  products: [], // Id, name, price, category
  cart: [], // id, name, price, quantity
  currentItem: null,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // get item data from products data
      const item = state.products.find((prod) => prod.id === action.payload.id)
      // check if the cart has already been added
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      )
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      }
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      }
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      }
    default:
      return state
  }
}

export default cartReducer
