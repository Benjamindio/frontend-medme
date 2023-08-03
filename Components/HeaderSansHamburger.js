import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'


export default function headerWithoutLogo(props) {

    return (
        <View style={styles.container}>
            <FontAwesome name='chevron-left' style={styles.icon} size={20} onPress={props.onPress}/>
            <Text style={styles.title}>{props.name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#154C79',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      width:'100%',
      paddingTop:20,
      paddingBottom:20,
      borderRadius:30,

    },
    icon:{
        color:'white',
        paddingLeft: 30,
    },

    title :{
        paddingLeft:'30%',
        paddingBottom:5,
        color:'white',
        fontSize: 25,
    },
  })