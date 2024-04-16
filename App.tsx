/**
 * Created by Manikanta Ikkurthi
 */

import React, { Suspense } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import store from './src/store';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = React.lazy(() => import('./src/screens/home'));
const CartScreen = React.lazy(() => import('./src/screens/cart'));

const Stack = createNativeStackNavigator();


/**
 * Custom Header Component will return Cart button 
 */
const HeaderComponent = ({ navigation }: any) => {

  /**
   * on clicking the Cart button it will navigate to cart screen
   */
  const onCartPress = () => {
    navigation.navigate('cart');
  }
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onCartPress} style={styles.cartBtn}>
        <Text style={styles.btnTxt}>Cart</Text>
      </TouchableOpacity>
    </View>
  )
}

/**
 * Application Routes declared here
 */
function AppRoutes() {
  return (
    <NavigationContainer>
      <Suspense fallback={<ActivityIndicator size={'small'} />}>
        <Stack.Navigator
          screenOptions={{
            header: ({ navigation }: any) => <HeaderComponent navigation={navigation} />
          }}
        >
          <Stack.Screen name='home' component={HomeScreen} />
          <Stack.Screen name='cart' component={CartScreen} />
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  )
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  cartBtn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'blue',
    borderRadius: 50,
    flexDirection: 'row'
  },
  btnTxt: {
    color: '#fff'
  },
});

export default App;
