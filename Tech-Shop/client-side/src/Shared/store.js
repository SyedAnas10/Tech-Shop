import { configureStore } from '@reduxjs/toolkit';

import inventoryReducer from '../Redux/InventorySlice'

export default configureStore({
  reducer: {
    products: inventoryReducer
  }
})