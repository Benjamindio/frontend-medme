import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Image, View, StyleSheet} from 'react-native'

export default function headerWithLogo(props) {



    return (
        <View style={styles.container}>
            <FontAwesome name='bars' style={styles.icon} size={40}/>
            <Image source={require('../assets/Medme-whiteV1.png')} style={styles.logo} /> 
            <FontAwesome name='user' style={styles.icon} size={40} onPress={props.onPress}/>
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

    },
    logo:{
        height:200,
        width:200,
        marginTop: 18,

    },
    icon:{
        color:'white',

    }
  })