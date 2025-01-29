const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ITEM": {
      const newItem = action.payload

      console.log('-- action.payload: ', action.payload)
      console.log('-- state item: ', newItem)
      console.log('-- new item: ', newItem.id)
      
      const existingItem = state.find(
        (item) => item.id === newItem.id
      )

      console.log('-- existing item: ', existingItem)
      
      if (existingItem) {
        return state
      } else {
        return [
          ...state,
          { ...newItem, orderId: Math.floor(Math.random() * 100) },
        ]
      }
    }
    case "MODIFY_QUANTITY": {
      const { itemId, newQuantity } = action.payload

      return state.map((item) =>
        item.orderId !== itemId ? item : { ...item, quantity: newQuantity }
      )
    }
    case "REMOVE_ITEM": {
      const orderId = action.payload.orderId
      return state.filter((item) => item.orderId !== orderId)
    }
    default:
      return state
  }
}

export const addItem = (item) => {
  return {
    type: "NEW_ITEM",
    payload: item,
  }
}

export const changeQuantity = (itemId, newQuantity) => {
  return {
    type: "MODIFY_QUANTITY",
    payload: { itemId, newQuantity },
  }
}

export const deleteItem = (orderId) => {
  return {
    type: "REMOVE_ITEM",
    payload: { orderId },
  }
}

export default cartReducer
