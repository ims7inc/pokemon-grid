import { CartItem } from "../store/slices/cart";

export const isAvailableinCart = (pokemonName: string, cartItems: CartItem[]) => {
  return cartItems.some((item) => item.name === pokemonName);
}