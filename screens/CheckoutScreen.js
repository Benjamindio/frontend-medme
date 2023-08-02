import React, { useState } from 'react';
import HeaderLogo from '../Components/HeaderLogo';
import Title from '../Components/Title';
import ButtonNoIcon from '../Components/ButtonNoIcon';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const CartItem = ({ name, quantity, price, onIncrement, onDecrement, onDelete }) => {
    return (
      <View style={[styles.cartItem, { backgroundColor: 'white' }]}>
        <Text>{name}</Text>
        <Text style={{ marginLeft: 10 , color: '#154C79' }}>{price} €</Text>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" color="#5FA59D" size={18} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 1 }}>{quantity}</Text>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name="plus" color="#5FA59D" size={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <FontAwesome name="trash" color="#154C79" size={15} />
        </TouchableOpacity>
      </View>
    );
  };


  
  export default function CheckoutScreen() {

    const [cartItems, setCartItems] = useState([
      { id: 1, name: 'Medicament 1', quantity: 2, price: 10 }, 
      { id: 2, name: 'Medicament 2', quantity: 1, price: 5 },
      
    ]);
  
    const handleIncrement = (itemId) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };
  
    const handleDecrement = (itemId) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    };
  
    const handleDelete = (itemId) => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    };

    
  
    const totalSelectedProducts = cartItems.reduce((total, item) => total + item.quantity, 0);
  
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <HeaderLogo name="Ma fiche santé" onPress={() => handlePress()} />
        </View>
        <View style={styles.titleContainer}><Title title="Votre choix" style={styles.title} /></View>
        <ScrollView style={styles.scrollView} >
          
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onDelete={() => handleDelete(item.id)} 
            />
          ))}
        </ScrollView>
        
        <View style={styles.totalContainer}>
      <View style={styles.totalProductsContainer}>
        <Text style={styles.totalProducts}>{totalSelectedProducts} produits</Text>
      </View>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPrice}>Total: {totalPrice} €</Text>
      </View>
    </View>
        <ButtonNoIcon textButton="Commander" /*onPress={() => { }*/ />
      </KeyboardAvoidingView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D9D9D9',
      width: "100%"
    },
    header: {
      width: '100%',
      height: "15%"
    },
    titleContainer: {
      width: "80%",
      marginTop: 15
    },
    scrollView: {
      width: '80%',
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      borderWidth: 25,
      borderColor: 'white',
      padding: 10,
      borderRadius: 8,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 50,
        padding: 20,
      },
      totalProductsContainer: {
        flex: 1, 
        justifyContent: 'flex-start',
      },
      totalProducts: {
        fontSize: 25,
        color: '#154C79',
      },
      totalPriceContainer: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#5FA59D',
        backgroundColor: '#5FA59D',
        borderRadius: 50,
        alignItems: 'center', 
      },
      totalPrice: {
        fontSize: 25,
        color: 'white',
      }
  });