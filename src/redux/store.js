import { configureStore } from '@reduxjs/toolkit'
import rootProducer from '../redux/reducers/rootProducer';
export const store = configureStore({
  reducer: rootProducer ,
})

export default store;