import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Image, View, StyleSheet, Text} from 'react-native'

export default function DisplayButton(props) {

    return (
        <View style={styles.container}>
            <FontAwesome name={props.nameIconLeft} style ={props.styleIconLeft} size={20}/>
            <Text style={props.styleTextDisplayButton}>{props.text}</Text>
            <FontAwesome name={props.nameIconRight} style ={props.styleIconRight} size={20}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      height:65,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width:'100%',
      borderRadius:8,
      marginBottom: 30,
      padding: 10,
    },
  })