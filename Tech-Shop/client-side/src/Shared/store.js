import { configureStore } from '@reduxjs/toolkit';

import inventoryReducer from '../Redux/InventorySlice'
import pcmakeReducer from '../Redux/PCmakeSlice'

export default configureStore({
  reducer: {
    products: inventoryReducer,
    makeList: pcmakeReducer
  }
})