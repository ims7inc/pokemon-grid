/**
 * Created by Manikanta Ikkurthi
 */
import React, { memo, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { isAvailableinCart } from '../../utils/utils';
import { CartItem } from '../../store/slices/cart';

interface PokemonProps {
  name: string;
  imageUrl: string;
  cartItems: CartItem[]
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
  isCartPage?: boolean;
}

const Pokemon: React.FC<PokemonProps> = memo(({ name, imageUrl, cartItems, isCartPage, onAdd, onRemove, onDecrease }: PokemonProps) => {

  const qty = useMemo(() => {
    const item = cartItems.find((cartItem: CartItem) => cartItem.name === name);
    return item?.qty || 0;
  }, [cartItems]);

  const onAddPress = () => {
    onAdd({ name: name, url: imageUrl, qty: qty });
  };

  const onRemovePress = () => {
    onRemove({ name: name, url: imageUrl, qty: qty });
  };

  const onDecreasePress = () => {
    if (qty && qty > 1) {
      onDecrease({ name: name, url: imageUrl, qty: qty });
    } else {
      onRemove({ name: name, url: imageUrl, qty: qty });
    }
  };

  const getUrl = useMemo(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageUrl.split('/').slice(-2, -1)}.png`
  }, [imageUrl]);

  const isInCart = useMemo(() => {
    return isAvailableinCart(name, cartItems);
  }, [name, cartItems]);
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: getUrl }} style={styles.image} />
        <Text>{name}</Text>
      </View>
        {isInCart && (
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onDecreasePress} style={styles.btnStyle}>
              <Text style={styles.textStyle}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textStyle}>{qty} qty</Text>
            <TouchableOpacity onPress={onAddPress} style={styles.btnStyle}>
              <Text style={styles.textStyle}>+</Text>
            </TouchableOpacity>
            {isCartPage && (
              <TouchableOpacity onPress={onRemovePress} style={styles.addCartBtn}>
                <Text style={styles.cartTextStyle}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {!isInCart && (
          <View style={styles.btnContainer}>
            <TouchableOpacity testID="add-to-cart-btn" onPress={onAddPress} style={styles.addCartBtn}>
              <Text style={styles.cartTextStyle}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    alignItems: 'center'
  },
  addCartBtn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginTop: 10
  },
  btnStyle: {
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#dcdcdc'
  },
  textStyle: {
    fontSize: 20
  },
  cartTextStyle: {
    color: '#fff'
  }
});

export default Pokemon;
