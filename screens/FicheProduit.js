import HeaderSansLogo from '../Components/HeaderSansLogo';
import Title from '../Components/Title';
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



export default function FicheProduit({navigation}) {  

  const searchMed ='5QyAwQv1JS'
  const [medName, setMedName] = useState('')
  const [medInfo, setMedInfo] = useState('')
  const [needOrdonnance, setNeedOrdonnance] = useState(false)
  const [categorie, setCategorie] = useState('')
  const [price, setPrice] = useState(0)
  const [medImage, setMedImage] = useState('')
  const [description,setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    fetch(`https://backend-medme.vercel.app/medicaments/${searchMed}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.result){
        const medicaments = data.medicaments
        const medicamentName = medicaments.name.split(' ')
      setMedName(medicamentName[0])
      setMedInfo(medicamentName.slice(1).join(' '))
      setPrice(medicaments.price)
      setMedImage(medicaments.image)
      setDescription(medicaments.description)
      setCategorie(medicaments.categorie)
      setNeedOrdonnance(medicaments.need_prescription)
      }
      
    })
  
  },[])
  
  
  const handlePlus = () => {
    setQuantity(quantity +1)
  }
  
  const handleMinus = () => {
    if(quantity > 1) {
      setQuantity(quantity -1)
    }
  }
  //Clem a ajoute handle return
  handleReturn = () => {
    navigation.navigate('MedicamentsSelectionScreen')
  }
  let ordonnance = <Text style={styles.textOrdonnance}>Sans {"\n"} ordonnance</Text>
  
  if(needOrdonnance) {
    ordonnance = <Text style={{...styles.textOrdonnance, color:'red'}}>Sur {"\n"} ordonnance</Text>
  }
  
  let icon = <FontAwesome name='pills' color="#5FA59D" size={35} style={styles.icon} />
  if(categorie === 'Parapharmacie') {
    icon = <FontAwesome name='band-aid' color="#5FA59D" size={35} style={styles.icon} />
  }
  return (
    <View style={styles.container}>
        {/* <View style={styles.header}> */}
          <HeaderSansLogo name={medName} onPress={() => handleReturn()} />
        {/* </View> */}
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer} >
            {icon}
          </View>
          <View style={styles.titleContent}>
            <View style={styles.title}> 
              <Title title={medName} />
              <Text style={styles.subtitle} >{medInfo}</Text>
            </View>
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
                        <Text style={styles.textPrice}>{price}€</Text>
                        </View>
                      <View style={styles.quantity}>
                           <FontAwesome name='minus' color='#5FA59D' size={15}  onPress={() => handleMinus()}  />
                           <Text>{quantity}</Text>
                           <FontAwesome name='plus' color='#5FA59D' size={15} onPress={() => handlePlus()}/>
                      </View>
                     
  
                  </View>
                  <View style={styles.addToCart}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={()=> {}}>
                      <Text style={styles.textButton}>Ajouter{"\n"} au panier</Text>
                      <FontAwesome name='shopping-cart' size={25} color='#5FA59D'/>
                    </TouchableOpacity>
                  </View>
              </View>
        </View>
        <View style={styles.descriptionContainer}> 
              <View style={styles.descriptionTitleContainer}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                </View>
              <ScrollView style={styles.description}> 
                  <Text style={styles.descriptionText}>{description}</Text>
              </ScrollView> 
        </View>    
              
    
          
    </View>
  )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:2,
      alignItems: 'center',
      backgroundColor:'#D9D9D9',
    },
    // header:{
    //   flex:0.3,
    //   width:'100%'
    // },
     titleContainer:{
      flex: 0.3,
      width:"90%",
      flexDirection:"row",
  
      alignItems:"center",
      marginTop:'5%',
      marginBottom:'10%',
      backgroundColor:'#FFFFFF',
      borderRadius:15,
  
    },
    titleContent:{
     width:'70%',
    
    },
    subtitle:{
      justifyContent:'center',
      fontSize:14,
      color:'#AFB1B6',
      fontWeight:'bold'
    },
    title:{
      width:'90%'
    },
    iconContainer:{
      width:'30%',
      alignItems:'center'
    },
    contentContainer:{
  
      flex: 0.4,
      width:'90%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'start',
      marginBottom:'10%'
  
    },
    leftContainer:{
      width:'49%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      borderRadius:15
    },
    image:{
      resizeMode:'contain',
      width:'90%',
      height:'90%'
    },
    rigthContainer:{
      width:'49%',
      height:'100%',
      justifyContent:'flex-start',
      alignItems:'center',
      
    },
    ordonnance:{
      backgroundColor:'white',
      borderRadius:15,
      height:'25%',
      width:'100%',
      justifyContent:'center',
      alignItems:'center'
    },
    textOrdonnance:{
      color:'#154C79',
      fontWeight:'bold',
      textAlign:'center'
    },
    priceAndQuantity:{
      marginTop:'7%',
      width:'100%',
      height:'25%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      borderRadius:15,
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
      marginTop:'7%',
      width:'100%',
      height:'35%',
     backgroundColor: '#ffffff',
     borderRadius: 20,
      shadowColor: '#afb1b6',
          shadowOpacity: 0.8,
          elevation: 6,
          shadowRadius: 8,
          shadowOffset: {width:0.8, height:10},
          marginBottom: 50,
    justifyContent:'center'
    },
    descriptionContainer:{
      flex:1,
      width:'90%',
      backgroundColor:'white',
      borderRadius:15,
      alignItems:'center'
      
    },
    descriptionTitleContainer:{
      width:"90%",
      backgroundColor:'#5FA59D',
      marginTop:10,
      borderRadius:20,
    },
    descriptionTitle: {
      fontSize:14,
      color:"white",
      textAlign:'center',
      
    },
    description: {
      width:"90%",
      marginTop:10,
  
    },
    descriptionText:{
      color:"#AFB1B6",
      fontSize:15
    },
    button: {
          flexDirection: 'row',
          alignItems:'center',
          justifyContent:'center',
          
          width:'100%',
          fontSize: 30,
      },
  
      textButton: {
          color: '#5FA59D',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign:'center'
  
      },
  
  })