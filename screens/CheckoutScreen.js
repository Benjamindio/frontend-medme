import { useDispatch, useSelector } from  'react-redux';
import HeaderSansLogo from '../Components/HeaderSansLogo';
import Title from '../Components/Title';
import ButtonNoIcon from '../Components/ButtonNoIcon';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
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



  const handleGoToNextScreen = () => {
    navigation.navigate('ChoosePharmacie')
  }

  

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <HeaderSansLogo name="Votre panier" onPress={() => navigation.goBack()} />
      <View style={styles.titleContainer}><Title title="Votre choix" style={styles.title} /></View>
      <ScrollView style={styles.scrollView}>
        {order.map((item) => (
          <CartItem
            key={item.product_id}
            product_id={item.product_id}
            medName={item.medName}
            quantity={item.quantity}
            medPrice={item.medPrice}
            medImage={item.medImage}
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
      <ButtonNoIcon textButton="Commander" onPress={() => navigation.navigate('UploadPrescription')} />
    </KeyboardAvoidingView>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      width: "100%"
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
      height: 80,
      borderColor: 'white',
      padding: 1,
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
      fontSize: 20,
      color: '#AFB1B6',
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
    },
      
  });