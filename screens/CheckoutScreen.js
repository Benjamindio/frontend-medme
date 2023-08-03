import { useState } from 'react';
import { useDispatch, useSelector } from  'react-redux';
import HeaderSansLogo from '../Components/HeaderSansLogo';
import Title from '../Components/Title';
import ButtonNoIcon from '../Components/ButtonNoIcon';
import { View, StyleSheet,Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { removeFromCart, addOneArticle, removeOneArticle} from '../reducers/user';

const image = 'https://www.pharma-gdd.com/media/cache/resolve/product_show/646f6c697072616e652d746162732d313030306d672d382d636f6d7072696d65732d666163652d07bdf2.jpg'
const CartItem = ({ name, quantity, price }) => {
    return (
      <View style={[styles.cartItem, { backgroundColor: 'white' }]}>
        <Image source={{uri:image}} style={styles.image}/>
        <Text>{name}</Text>
        <Text style={{ marginLeft: 10 , color: '#154C79' }}>{price} €</Text>
        <TouchableOpacity >
          <FontAwesome name="minus" color="#5FA59D" size={18} style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 1 }}>{quantity}</Text>
        <TouchableOpacity >
          <FontAwesome name="plus" color="#5FA59D" size={18} />
        </TouchableOpacity>
        <TouchableOpacity >
          <FontAwesome name="trash" color="#154C79" size={15} />
        </TouchableOpacity>
      </View>
    );
  };


 
  export default function CheckoutScreen({navigation}) {

    const order = useSelector(state => state.user.value.order);
    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState([
      { id: 1, name: '', quantity: '', price: ''}, 
      { id: 2, name: '', quantity: '', price: '' },
      
    ]);
    
    
  
    const handleAddOneArticle = (product_id, quantity) => {
      dispatch(addOneArticle({product_id, quantity}))
    };
  
    const handleRemoveOneArticle = (product_id, quantity) => {
      dispatch(removeOneArticle({product_id, quantity}))
    };
  
    const handleRemoveFromCart = (product_id) => {
      dispatch(removeFromCart({product_id}))
    };

    handlePress = () => {
      navigation.goBack()
    };

    
  
    const totalSelectedProducts = cartItems.reduce((total, item) => total + item.quantity, 0);
  
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <View style={styles.header}> */}
          <HeaderSansLogo name="Votre Panier" onPress={() => handlePress()} />
        {/* </View> */}
        <View style={styles.titleContainer}><Title title="Votre choix" style={styles.title} /></View>
        <ScrollView style={styles.scrollView} >
        <CartItem>
        {order.map((item) => (
        <View key={item.product_id}>
          <Text>{item.product_name}</Text>
          <Text> Quantité: {item.quantity}</Text>
          <TouchableOpacity onPress={() => handleAddOneArticle(item.product_id, 1)}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveOneArticle(item.product_id, 1)}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item.product_id)}>
            <Text>Supprimer</Text>
          </TouchableOpacity>
        </View>
        
      ))}</CartItem>
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
      backgroundColor: '#F5F5F5',
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
      },
      image:{
       
        width:'20%',
        height:'100%'
      },
  });