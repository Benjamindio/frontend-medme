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
      shadowColor: '#afb1b6',
      shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 8,
        shadowOffset: {width:0.8, height:10},
        marginBottom: 50,
    },

    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'

    },
});