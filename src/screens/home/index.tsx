/**
 * Created by Manikanta Ikkurthi
 */

import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import PokemonItem from '../../components/pokemon/pokemon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPokeMons, fetchPokeMons } from '../../store/slices/home';
import { CartItem, addToCart, removeFromCart, decreaseQyt } from '../../store/slices/cart';
import { RootState } from '../../store';

const PokemonComponent = () => {
  const dispatch = useDispatch();
  const pokemonReducer = useSelector((state: RootState) => state.pokemons);
  const cartReducer = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchPokeMons());
  }, [])

  const fetchNextPokeMon = () => {
    dispatch(fetchNextPokeMons(pokemonReducer?.pokemonState?.next))
  }

  const onAddPress = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const onRemovePress = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const onDecreasePress = (item: CartItem) => {
    dispatch(decreaseQyt(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={pokemonReducer?.pokemonState?.results}
          keyExtractor={(item) => item.name}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          onEndReachedThreshold={0.8}
          onEndReached={fetchNextPokeMon}
          renderItem={({ item }) => (
            <PokemonItem
              name={item.name}
              imageUrl={item.url}
              onAdd={onAddPress}
              onRemove={onRemovePress}
              onDecrease={onDecreasePress}
              cartItems={cartReducer.cartItems}
            />
          )}
        />
        {(pokemonReducer?.loading || pokemonReducer?.extraLoading) && (
          <ActivityIndicator style={styles.loaderStyle} size={'large'} />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc'
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50
  }
})

export default PokemonComponent;