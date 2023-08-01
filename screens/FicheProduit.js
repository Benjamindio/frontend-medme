import HeaderSansLogo from './Components/HeaderSansLogo';
import Title from './Components/Title';
import {
    View, 
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';



export default function App() {  

return (
  <View style={styles.container}>
      <View style={styles.header}>
        <HeaderSansLogo name="Nom du produit" onPress={() => handleReturn()} />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.iconContainer} >
          <FontAwesome name='pills' color="#5FA59D" size={35} style={styles.icon} />
        </View>
        <View style={styles.titleContent}>
          <View style={styles.title}> 
            <Title title="Doliprane 500 mg" />
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
                <Image source={require("./assets/Krustytheclown.png")} style={styles.image} />
             </View>   
            <View style={styles.rigthContainer}> 
                <View style={styles.ordonnance}>
                  <Text style={styles.textOrdonnance}>Sans {"\n"}
                  ordonnance</Text>
                </View>
                <View style={styles.priceAndQuantity}>
                   <View style={styles.price}>
                      <Text>29,99€</Text>
                   </View>
                    <View style={styles.quantity}>

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
            <View style={styles.descriptionTitle}>
            
            </View>
            <ScrollView style={styles.description}> 

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
  header:{
    flex:0.3,
    width:'100%'
  },
   titleContainer:{
    flex: 0.3,
    width:"90%",
    flexDirection:"row",

    alignItems:"center",
    marginTop:'5%',
    backgroundColor:'#FFFFFF',
    borderRadius:15,

  },
  titleContent:{
   width:'70%',
  
  },
  title:{
    width:'90%'
  },
  iconContainer:{
    width:'30%',
    alignItems:'center'
  },
  icon:{

    marginBottom: 20,
  },
  contentContainer:{
    marginTop:15,
    flex: 0.4,
    width:'90%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'start',
    marginBottom:15

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
    height:'30%',
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
    width:'100%',
    height:'30%',
    flexDirection:'row',
    alignItems:'center'
  }, 
  price:{
    height:'50%',
    width:'50%',
    backgroundColor:'white',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  quantity:{
    height:'50%',
    width:'50%',
    backgroundColor:'white',
    borderRadius:15,
  },
  addToCart:{
    width:'100%',
    height:'40%',
   backgroundColor: '#ffffff',
   borderRadius: 8,
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
    borderRadius:15
    
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