import HeaderSansReturn from '../Components/HeaderSansReturn'
import Title from '../Components/Title'
import ButtonHome from '../Components/ButtonHome'
import {
    View, 
    Text,
    StyleSheet,
} from 'react-native'
import { useSelector } from 'react-redux';





export default function HomeScreen({navigation}) {

  const user = useSelector((state) => state.user.value);


    return (
        <View style={styles.container}>
            <HeaderSansReturn onPress={()=> navigation.navigate('Profile')} />
          <View style={styles.content}>
              <Title title={'Bonjour,'} />
              <Text style={styles.text}>Que souhaitez-vous faire ?</Text>
              <ButtonHome iconName='pills' iconSize={50} 
                          iconColor='#F5F5F5' 
                          iconStyle={styles.iconStyle}
                          textButton='Je commande' 
                          textStyle={styles.textMainButn}
                          height={200} 
                          width={200} 
                          backgroundColor='#154C79'  
                          color="#F5F5F5" 
                          onPress={() => navigation.navigate('TabNavigator', {screen: 'Order'})} />
              <View style={styles.lowerButton}> 
                <ButtonHome iconName='user-alt' iconSize={30} iconStyle={styles.iconStyle} iconColor='#5FA59D' textButton='Mon profil' textStyle={styles.textStyle} height={110} width={110} backgroundColor='#FFFFFF'  color="#5FA59D" onPress={() => navigation.navigate('Profile')}/>
                <ButtonHome iconName='file-medical-alt' iconStyle={styles.iconStyle} iconSize={30} iconColor='#5FA59D' textButton='Ma fiche santé' textStyle={styles.textStyle} height={110} width={110}  backgroundColor='#FFFFFF'  color="#5FA59D" onPress={() => navigation.navigate('Profile')}/>
                <ButtonHome iconName='book-medical' iconStyle={styles.iconStyle} iconSize={30} iconColor='#5FA59D' textButton='Mes commandes' textStyle={styles.textStyle} height={110} width={110}  backgroundColor='#FFFFFF'  color="#5FA59D" onPress={() => navigation.navigate('Myorders')} />
              </View>
          </View>
        </View>
    )}


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
        text:{
          width:'100%',
          fontSize:25,
          color:'#AFB1B6',
        },
        iconStyle:{
          margin:10,
        },
        textMainButn:{
          fontSize:20,
          fontWeight: 'light',
          color:'#F5F5F5',
        },
        textStyle:{
          fontSize:12,
          color:'#AFB1B6',
        },
          lowerButton:{
            width: '100%',
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems: 'center',

          }
          
          
    });

    // <Title title={`Bonjour ${user.firstName},`} />
