import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Image, View, StyleSheet, Pressable, TouchableOpacity,} from 'react-native'
import MenuHamburger from '../Components/MenuHamburger';
import { useDispatch } from 'react-redux'; 
import {setModalVisible} from '../reducers/modal';

export default function headerWithLogo(props) {

  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch(setModalVisible(true));
  };

    return (
        <View style={styles.container}>
            <View style = {styles.content}>
                <Pressable onPress={props.onPress}>
                    <FontAwesome name='chevron-left' style={styles.icon} size={20} />
                </Pressable>
                <Image source={require('../assets/Medme-whiteV2.png')} style={styles.logo} /> 
                <TouchableOpacity
                    style={styles.hamburgerButton}
                    onPress={toggleMenu} >
                <FontAwesome name='bars' style={styles.icon} size={30}/>
                </TouchableOpacity>
                <MenuHamburger/>
            </View>
         </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 155,
        backgroundColor: '#154C79',
        width:'100%',
        marginBottom: 30,
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        paddingBottom:20,
        justifyContent: 'flex-end',
        alignItems:'center',
      },
    content:{
        width:'90%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    logo:{
        width: '50%',
        height:40.7,
        resizeMode: 'contain',
    },
    icon:{
        color:'white',
    }
  })