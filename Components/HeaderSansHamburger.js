import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'


export default function headerWithoutLogo(props) {

    return (
        <View style={styles.container}>
          <View style = {styles.content}>
            <FontAwesome name='chevron-left' style={styles.icon} size={20} onPress={props.onPress}/>
            <Text style={styles.title}>{props.name}</Text>
            <FontAwesome name='bars' style={styles.iconHidden} size={30}/>
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
    icon:{
        color:'white',
    },
    iconHidden:{
        color:'#154C79',
    },
    title: {
      color: 'white',
      fontSize: 25,
    }
  });
