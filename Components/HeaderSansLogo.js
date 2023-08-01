import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Text, View, StyleSheet} from 'react-native'

export default function headerSansLogo(props) {



    return (
        <View style={styles.container}>
            <FontAwesome name='chevron-left' style={styles.icon} size={20} onPress={props.onPress}/>
            <Text style={styles.title}>{props.title}</Text>
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
    title:{
        color:'white',
        fontSize: 20,
        fontWeight:'light',
    },
    icon:{
        color:'white',
    }
  })