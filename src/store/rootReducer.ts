import { combineReducers } from '@reduxjs/toolkit';
import HomeReducer from './slices/home';
import CartReducer from './slices/cart';

const rootReducer = combineReducers({
  pokemons: HomeReducer,
  cart: CartReducer
});

export default rootReducer;