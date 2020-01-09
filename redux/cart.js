let initialState = {
  cartList: [],
  total: 0
}

const cartReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_USER_LIST':
      const isFound = state.find(product => action.payload.product_id == product.product_id)
      if (isFound) {
        for (let product of state) {
          if (product.product_id == action.payload.product_id) {
            product.quantity += action.payload.quantity;
          }
        }
        return state
      } else {
        return [...state, action.payload]
      }

    default:
      return state
  }
}

export default cartReducer

export const action = {
  setCartList: (data) => {
    return {
      type: 'SET_CART_LIST',
      payload: data
    }
  }
}