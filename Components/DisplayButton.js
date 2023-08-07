import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export default function DisplayButton(props) {

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <FontAwesome name={props.nameIconLeft} style ={props.styleIconLeft} size={20}/>
            <Text style={props.styleTextDisplayButton}>{props.text}</Text>
            <FontAwesome name={props.nameIconRight} style ={props.styleIconRight} size={20}/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
      height:65,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width:'90%',
      borderRadius:8,
      marginBottom: 30,
      padding: 10,
      shadowColor: '#afb1b6',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 8,
      shadowOffset: {width:0.8, height:10},
    },
  })