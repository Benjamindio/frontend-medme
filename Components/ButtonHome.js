import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


export default function BoutonHome(props) {

    return (
      <View style={styles.container}>
    <TouchableOpacity style={{...styles.button, height:props.height, width:props.width, backgroundColor:props.backgroundColor}} activeOpacity={0.8} onPress={props.onPress}>
        <FontAwesome name={props.iconName} size={props.iconSize} color={props.iconColor}/>
        <Text style={{...styles.textButton, color:props.color}}>{props.textButton}</Text>
    </TouchableOpacity>
      </View>
    )};

const styles = StyleSheet.create({
    container:{
       flex:1,
        
    },
    button: {
      justifyContent: 'center',
        alignItems: 'center',
     borderRadius: 8,
      shadowColor: '#000000',
      shadowOpacity: 1,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: {width:0.8, height:15},
        marginBottom: 50,
    },

    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'

    },
});