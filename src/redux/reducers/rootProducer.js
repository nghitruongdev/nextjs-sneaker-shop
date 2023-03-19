import { combineReducers } from "redux";
import cartReducer from '../Cart/cart-reducer';
// All the producers will be passed in rootReducers here
const rootReducer = combineReducers({
    cart: cartReducer,
});

export default rootReducer;