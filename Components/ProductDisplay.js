import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export default function ProductDisplay(props) {

    return (
        <View style={styles.container} id ={props.shadowRadius}>
            <Image source={props.src} style ={props.image}/>
            <Text style={props.styleTextDisplayButton} onPress={props.onPress}>{props.text}</Text>
            <Text style={props.stylePrice}>{props.price} €</Text>
            <FontAwesome name={props.nameIconRight} style ={props.styleIconRight} size={20} onPress={props.onPressIcon}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      height:80,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width:'100%',
      borderRadius:8,
      marginBottom: 30,
      padding: 10,
      shadowColor: '#afb1b6',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 8,
      shadowOffset: {width:0.8, height:10},
      marginBottom: 15,
    },
  })