import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Image, View, StyleSheet, Pressable, TouchableOpacity,} from 'react-native'
import MenuHamburger from './MenuHamburger';
import { useDispatch } from 'react-redux'; 
import {setModalVisible} from '../reducers/modal';


export default function headerWithLogo(props) {

    const dispatch = useDispatch()

    const toggleMenu = () => {
      dispatch(setModalVisible(true));
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Medme-whiteV1.png')} style={styles.logo} /> 
            <TouchableOpacity
                style={styles.hamburgerButton}
                onPress={toggleMenu} >
            <FontAwesome name='bars' style={styles.icon} size={30}/>
            </TouchableOpacity>
            <MenuHamburger/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#154C79',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width:'100%',
      paddingLeft:'25%',
      paddingTop:'10%',
      borderRadius:30,
      marginBottom: 30,
    },
    logo:{
        width: '50%',
        resizeMode: 'contain',
    },
    icon:{

        color:'white',
    }
  })