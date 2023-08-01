import HeaderLogo from '../Components/HeaderLogo';
import Title from '../Components/Title'
import ButtonHome from '../Components/ButtonHome'
import {
    View, 
    Text,
    StyleSheet,
} from 'react-native'




export default function HomeScreen({navigation}) {


const title = `Bonjour`
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <HeaderLogo onPress={()=> navigation.navigate('Profile')} />
          </View>
          <View style={styles.content}>
            <View><Title title={title} /></View>
           <Text style={styles.text}>Que souhaitez-vous faire ?</Text>
        </View>
        <View style={styles.primaryButton}>
          <ButtonHome iconName='pills' iconSize={50} iconColor='#F5F5F5' textButton='Je commande' height='60%' width={200} backgroundColor='#154C79'  color="#F5F5F5" onPress={() => navigation.navigate('Order')} />
          </View>
        <View style={styles.lowerButton}> 
            <ButtonHome iconName='user' iconSize={50} iconColor='#5FA59D' textButton='Mon profil' height='70%' width={120} backgroundColor='#FFFFFF'  color="#5FA59D" onPress={() => navigation.navigate('Profile')}/>
            <ButtonHome iconName='file-medical-alt' iconSize={50} iconColor='#5FA59D' textButton='Ma fiche santé' height='70%' width={120} backgroundColor='#FFFFFF'  color="#5FA59D" onPress={() => navigation.navigate('Profile')}/>
            <ButtonHome iconName='book-medical' iconSize={50} iconColor='#5FA59D' textButton='Mes commandes' height='70%' width={120} backgroundColor='#FFFFFF'  color="#5FA59D" onPress={() => navigation.navigate('Myorders')} />
          </View>
        </View>
    )}


    const styles = StyleSheet.create({
        container: {
            flex:1,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor:'#F5F5F5',
            width:'100%'
          },
          content: {
            flex: 1,
            paddingTop:40,
            width:'80%'
          },
          primaryButton:{
            flex:2, 
           
          },
          header:{
            height:'15%'
          },
          text:{
            fontSize:30,
            color:'#AFB1B6',
          },
          lowerButton:{
            flex:1,
            width:'95%',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }
          
          
    });

