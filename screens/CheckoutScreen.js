import { useDispatch, useSelector } from  'react-redux';
import HeaderSansLogo from '../Components/HeaderSansLogo';
import Title from '../Components/Title';
import ButtonNoIcon from '../Components/ButtonNoIcon';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import { removeFromCart, addOneArticle, removeOneArticle } from '../reducers/user';

const CartItem = ({ product_id, medName, quantity, medPrice, medImage }) => {
  const dispatch = useDispatch();

  const handleAddOneArticle = () => {
    dispatch(addOneArticle( {product_id, quantity : 1}));
  };

  const handleRemoveOneArticle = () => {
    dispatch(removeOneArticle({product_id, quantity:  1}));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({product_id, quantity}));
  };

  console.log(medName)

  return (
    <View style={[styles.cartItem, { backgroundColor: 'white' }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: medImage }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{medName}</Text>
        <Text style={styles.priceText}>Prix TTC: {medPrice} €</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={handleRemoveOneArticle}>
          <FontAwesome name="minus" color="#5FA59D" size={15} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={handleAddOneArticle}>
          <FontAwesome name="plus" color="#5FA59D" size={15} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemoveFromCart}>
          <FontAwesome name="trash" color="#154C79" size={15} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CheckoutScreen({navigation}) {
  const order = useSelector(state => state.user.value.order);
  console.log(order)
  const totalSelectedProducts = order.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = order.reduce((total, item) => total + item.quantity * item.medPrice, 0).toFixed(2);
  // const [isPrescriptionNeeded, setIsPrescriptionNeeded] = useState(false);

console.log(order)

// navigation:

const handleOrder = () => {
  const isPrescriptionNeeded = order.some((e) => e.needOrdonnance === true);
  if (isPrescriptionNeeded){
    navigation.navigate('UploadPrescription')
  }else{
    navigation.navigate('ChoosePharmacie')
  }
};

const products = order.map((item) => {
  return (
    <CartItem
    key={item.product_id}
    product_id={item.product_id}
    medName={item.medName}
    quantity={item.quantity}
    medPrice={item.medPrice}
    medImage={item.medImage}
  />
  )
})

let textProduit;
if (totalSelectedProducts<= 1){
  textProduit = `${totalSelectedProducts} produit`
}else{
  textProduit = `${totalSelectedProducts} produits`

}
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <HeaderSansLogo name="Votre panier" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Title title="Votre choix" />
                {products}
      <View style={styles.totalContainer}>
          <Text style={styles.totalProducts}>{textProduit}</Text>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>Total: {totalPrice} €</Text>
        </View>
      </View>
      <ButtonNoIcon textButton="Commander" onPress={() => handleOrder()} />
      </View>
    </KeyboardAvoidingView>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      width:'100%',

  },
  content: {
    flex:4,
    width:'90%',
    alignItems:'center',
    justifyContent: 'flex-start',
},
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      width:'100%',
      height: 80,
      borderColor: 'white',
      padding: 10,
      borderRadius: 8,
    },
    imageContainer: {
      width: '20%', 
      height: 100, 
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain', 
    },
    textContainer: {
      flex: 1, 
      marginLeft: 10,
    },
    nameText: {
      color: '#154C79',
    },
    priceText: {
      color: "#5FA59D" ,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 1,
      padding: 8,
    },
    quantityText: {
      marginHorizontal: 1,
    },
    totalContainer: {
      width:'100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop:30,
      marginBottom:30,
    },
    totalProducts: {
      fontSize: 20,
      color: '#AFB1B6',
    },
    totalPriceContainer: {
      backgroundColor: '#5FA59D',
      height:50,
      borderRadius: 8,
      justifyContent:'center',
      alignItems: 'center', 
      padding:10,
    },
    totalPrice: {
      fontSize: 15,
      color: 'white',
    },
      
  });