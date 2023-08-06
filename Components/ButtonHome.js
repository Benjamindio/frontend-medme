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
        <TouchableOpacity style={{...styles.button, height:props.height, width:props.width, backgroundColor:props.backgroundColor}} activeOpacity={0.8} onPress={props.onPress}>
          <FontAwesome style={props.iconStyle} name={props.iconName} size={props.iconSize} color={props.iconColor}/>
          <Text style={props.textStyle}>{props.textButton}</Text>
        </TouchableOpacity>
    )};

const styles = StyleSheet.create({
    button: {
      marginTop:30,
      marginBottom:20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      shadowColor: '#afb1b6',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 8,
      shadowOffset: {width:0.8, height:10},
    },
});