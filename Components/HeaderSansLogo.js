import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import MenuHamburger from '../Components/MenuHamburger';
import { useState } from 'react'; 

export default function headerWithoutLogo(props) {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = () => {
  
        setMenuVisible(false);
      };
    
      const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
      };




    return (
        <View style={styles.container}>
          <View style = {styles.content}>
            <FontAwesome name='chevron-left' style={styles.icon} size={20} onPress={props.onPress}/>
            <Text style={styles.title}>{props.name}</Text>
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
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      height: '20%',
      backgroundColor: '#154C79',
      width:'100%',
      padding:20,
      borderBottomRightRadius:30,
      borderBottomLeftRadius:30,
      justifyContent: 'flex-end',
      alignItems:'center',
    },
    content:{
      width:'90%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    icon:{
        color:'white',
    },

    title :{
        paddingBottom:5,
        color:'white',
        fontSize: 25,
    },
  })