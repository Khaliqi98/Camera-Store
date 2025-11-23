import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, Dimensions } from 'react-native';

const products = [
  { id: '1', name: 'Canon 90D کمره عکاسی', price: 1300, image: require('../../assets/D90.jpeg') },
  { id: '2', name: 'Canon 5D mark 3 کمره عکاسی', price: 2500, image: require('../../assets/D5m3.jpeg') },
  { id: '3', name: 'Canon 5D mark 4 کمره عکاسی', price: 4999, image: require('../../assets/D5m4.jpeg') },
  { id: '4', name: 'Canon Linse 75/300mm', price: 105, image: require('../../assets/Canon 75.jpeg') },
  { id: '5', name: 'Canon Linse 75/200mm', price: 170, image: require('../../assets/Canon 70.jpeg') },
];

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [cart, setCart] = useState([]);
  const [viewCart, setViewCart] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const renderProduct = ({ item }) => (
    <View style={styles.product}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>قیمت: {item.price} $</Text>
      <Button
        title={viewCart ? "حذف" : "انتخاب کردن"}
        onPress={() => viewCart ? removeFromCart(item.id) : addToCart(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>کمره فروشی کنون</Text>

      <Button
        title={viewCart ? "بازگشت به فروشگاه" : "مشاهده لیست خرید"}
        onPress={() => setViewCart(!viewCart)}
      />

      <FlatList
        data={viewCart ? cart : products}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>لطفا جنس مورد نظر را انتخاب کنید</Text>}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {!viewCart && <Text style={styles.cart}>لیست خرید: {cart.length}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  title: { textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginBottom: 10 },
  row: { justifyContent: 'space-between' },
  product: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: (screenWidth / 2) - 20,
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  image: { width: 120, height: 120, marginBottom: 5, borderRadius: 10 },
  cart: { marginTop: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});