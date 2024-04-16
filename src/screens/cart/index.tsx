import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PokemonItem from '../../components/pokemon/pokemon';
import { CartItem, addToCart, decreaseQyt, removeFromCart } from '../../store/slices/cart';
import { RootState } from '../../store';

const CartScreen = () => {

  const cartReducer = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const onAddPress = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const onRemovePress = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const onDecreasePress = (item: CartItem) => {
    dispatch(decreaseQyt(item));
  };

  /**
   * When list is empty this message will display
   */
  const emptyComponent = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTxt}>Please add items to cart</Text>
    </View>
  )

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={cartReducer.cartItems}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item) => `cart-item-${item.name}`}
        renderItem={({ item }) => (
          <PokemonItem
            name={item.name}
            imageUrl={item.url}
            onAdd={onAddPress}
            onRemove={onRemovePress}
            onDecrease={onDecreasePress}
            isCartPage
            cartItems={cartReducer.cartItems}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyTxt: {
    fontSize: 20,
    fontWeight: '700'
  }
})

export default CartScreen;