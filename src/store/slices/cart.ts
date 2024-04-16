import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { isAvailableinCart } from '../../utils/utils';

export interface CartItem {
  name: string;
  url: string;
  qty: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [] as CartItem[]
  },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const pokemon = action.payload?.name;
      const isInCart = isAvailableinCart(pokemon, state.cartItems);
      let cartItems = [...state.cartItems];
      if (isInCart) {
        cartItems = cartItems.map((item) => item.name === pokemon ? { ...item, qty: item.qty + 1 } : item)
      } else {
        const pokeMonItem: CartItem = { ...action.payload, qty: 1 };
        cartItems.push(pokeMonItem);
      }
      state.cartItems = cartItems;
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const cartItems = state.cartItems.filter((item) => item.name !== action.payload.name);
      state.cartItems = cartItems;
    },
    decreaseQyt: (state, action) => {
      const pokemon = action.payload?.name;
      let cartItems = [...state.cartItems];
      cartItems = cartItems.map((item) => item.name === pokemon ? { ...item, qty: item.qty - 1 } : item)
      state.cartItems = cartItems;
    }
  }
})

export const { addToCart, removeFromCart, decreaseQyt } = cartSlice.actions;

export default cartSlice.reducer;