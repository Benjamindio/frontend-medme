import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Image, View, StyleSheet, Pressable} from 'react-native'

export default function headerWithLogo(props) {

    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                <FontAwesome name='chevron-left' style={styles.icon} size={20} />
            </Pressable>
            <Image source={require('../assets/Medme-whiteV1.png')} style={styles.logo} /> 
            <FontAwesome name='bars' style={styles.icon} size={30}/>
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