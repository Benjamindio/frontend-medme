import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Image, View, StyleSheet, Pressable, TouchableOpacity,} from 'react-native'
import MenuHamburger from '../Components/MenuHamburger';
import { useState } from 'react'; 

export default function headerWithLogo(props) {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = () => {
  
        setMenuVisible(false);
      };
    
      const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
      };

    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                <FontAwesome name='chevron-left' style={styles.icon} size={20} />
            </Pressable>
            <Image source={require('../assets/Medme-whiteV1.png')} style={styles.logo} /> 
            <TouchableOpacity
                style={styles.hamburgerButton}
                onPress={toggleMenu} >
            <FontAwesome name='bars' style={styles.icon} size={30}/>
            </TouchableOpacity>
            <MenuHamburger
                isVisible={isMenuVisible}
                onMenuItemPress={handleMenuItemPress}
                onClose={() => setMenuVisible(false)} />
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
      paddingTop:20,
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