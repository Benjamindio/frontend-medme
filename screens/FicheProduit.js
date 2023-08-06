import HeaderSansLogo from '../Components/HeaderSansLogo';
import SmallTitle from '../Components/SmallTitle';
import {useState,useEffect} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/user';



export default function FicheProduit({route,navigation}) {  
  const {product_id,medName,medCategorie, medPrice, medImage} = route.params

  const dispatch =useDispatch()
  const [needOrdonnance, setNeedOrdonnance] = useState(false)
  const [description,setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const medicamentName = medName.split(' ')
  const medUsualName = medicamentName[0]
  const medInfo =medicamentName.slice(1).join(' ')
  useEffect(() => {
    fetch(`https://backend-medme.vercel.app/medicaments/${product_id}`)
    .then(response => response.json())
    .then(data => {

      if(data.result){
        const medicaments = data.medicaments
      setDescription(medicaments.description)
      setNeedOrdonnance(medicaments.need_prescription)
      }
      
    })
  
  },[])

  const handleAddToCart = () => {
    navigation.navigate('CheckoutScreen')
    dispatch(addToCart({product_id,quantity,needOrdonnance,medPrice,medName,medInfo, medImage}))

  }
  
  const handlePlus = () => {
    setQuantity(quantity +1)
  }
  
  const handleMinus = () => {
    if(quantity > 1) {
      setQuantity(quantity -1)
    }
  }

  handleReturn = () => {
    navigation.goBack()
  }
  let ordonnance = <Text style={styles.textOrdonnance}>Sans {"\n"} ordonnance</Text>
  
  if(needOrdonnance) {
    ordonnance = <Text style={{...styles.textOrdonnance, color:'red'}}>Sur {"\n"} ordonnance</Text>
  }
  
  let icon = <FontAwesome name='pills' color="#5FA59D" size={35} style={styles.icon} />
  if(medCategorie === 'Parapharmacie') {
    icon = <FontAwesome name='band-aid' color="#5FA59D" size={35} style={styles.icon} />
  }
  return (
    <View style={styles.container}>
          <HeaderSansLogo name='Votre sélection' onPress={() => handleReturn()} />
          <ScrollView style = {styles.scrollview}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer} >
              {icon}
              </View>
              <View style={styles.titleContent}>
                <View style = {styles.titleBox}>
                  <Text style={styles.smallTitle}>{medUsualName}</Text>
                </View>
                <Text style={styles.subtitle} >{medInfo}</Text>
            </View>
         </View>
        <View style={styles.contentContainer}>
              <View style={styles.leftContainer}>
                  <Image source={{uri:medImage}} style={styles.image} />
               </View>   
              <View style={styles.rigthContainer}> 
                  <View style={styles.ordonnance}>
                    {ordonnance}
                  </View>
                  <View style={styles.priceAndQuantity}>
                     <View style={styles.price}>
                        <Text style={styles.textPrice}>{medPrice} €</Text>
                        </View>
                      <View style={styles.quantity}>
                           <FontAwesome name='minus' color='#5FA59D' size={15}  onPress={() => handleMinus()}  />
                           <Text>{quantity}</Text>
                           <FontAwesome name='plus' color='#5FA59D' size={15} onPress={() => handlePlus()}/>
                      </View>
                     
  
                  </View>
                  <View style={styles.addToCart}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={()=> handleAddToCart()}>
                      <Text style={styles.textButton}>Ajouter{"\n"} au panier</Text>
                      <FontAwesome name='shopping-cart' size={25} color='white'/>
                    </TouchableOpacity>
                  </View>
              </View>
        </View>
        <View style={styles.descriptionContainer}> 
              <View style={styles.descriptionTitleContainer}>
                  <Text style={styles.descriptionTitle}>Description</Text>
              </View>
              <View style={styles.description}> 
                  <Text style={styles.descriptionText}>{description}</Text>
              </View> 
        </View>    
        </View>
        </ScrollView> 
    </View>
  )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F5F5F5',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    content:{
      flex:4,
      padding: 20,
      alignItems:'center',
      width: '100%',
    },
    //Titre
     titleContainer:{
      width:"100%",
      flexDirection:"row",
      justifyContent:'space-evenly',
      alignItems:"center",
      backgroundColor:'#FFFFFF',
      borderRadius:15,
      padding:15,
    },
    titleContent:{
      width:'70%',
      alignContent: 'center',
    },
    titleBox: {
      width: '100%',
      borderBottomColor: '#154C79',
      borderBottomWidth: 1,
      justifyContent: 'center',
      paddingBottom: 10,
      marginBottom:10,
  },
  smallTitle: {
      color: '#154C79',
      fontSize: 20,
      fontWeight: 'light',
  },
    subtitle:{
      justifyContent:'center',
      fontSize:14,
      color:'#AFB1B6',
      fontWeight:'bold'
    },
    iconContainer:{
      alignItems:'center'
    },
    //bloc Infos
    contentContainer:{
      width:'100%',
      height:'10%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:30,
      marginTop:30,
  
    },
    leftContainer:{
      width:'50%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      borderRadius:8,
      padding:20,
    },
    image:{
      resizeMode:'contain',
      width:'100%',
      height:'100%'
    },
    rigthContainer:{
      width:'45%',
      height:'100%',
      justifyContent:'space-between',
      alignItems:'center',
      
    },
    ordonnance:{
      backgroundColor:'white',
      borderRadius:8,
      height:'25%',
      width:'100%',
      justifyContent:'center',
      alignItems:'center'
    },
    textOrdonnance:{
      color:'#154C79',
      fontWeight:'bold',
      textAlign:'center',
    },
    priceAndQuantity:{
      width:'100%',
      height:'25%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      borderRadius:8,
    }, 
    textPrice:{
      fontSize:15,
      color:'#154C79'
    },
    price:{
      width:'50%',
      alignItems:'center',
    },
    quantity:{
      flexDirection: "row",
      justifyContent:'space-around',
      width:'50%'
  
    },
    addToCart:{
      width:'100%',
      height:'35%',
     backgroundColor: '#5FA59D',
     borderRadius:8,
     shadowColor: '#afb1b6',
     shadowOpacity: 0.5,
     elevation: 6,
     shadowRadius: 8,
     shadowOffset: {width:0.8, height:10},
    justifyContent:'center'
    },
    descriptionContainer:{
      width:'100%',
      backgroundColor:'white',
      borderRadius:15,
      alignItems:'center',
      padding:20,      
    },
    descriptionTitleContainer:{
      width:"80%",
      height:40,
      borderBottomColor:'#5FA59D',
      borderBottomWidth:0.5,
    },
    descriptionTitle: {
      fontSize:20,
      color:'#5FA59D',
      textAlign:'center',
      
    },
    description: {
      width:"100%",
      marginTop:20,
  
    },
    descriptionText:{
      color:"#AFB1B6",
      fontSize:15
    },
    button: {
          flexDirection: 'row',
          alignItems:'center',
          justifyContent:'space-evenly',
          width:'100%',
      },
  
      textButton: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'light',
          textAlign:'center'
  
      },
      scrollview:{
        width:'100%',      }

  
  })