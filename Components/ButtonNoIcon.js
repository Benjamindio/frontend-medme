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
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function ButtonNoIcon(props) {

    return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={props.onPress}>
        <Text style={styles.textButton}>{props.textButton}</Text>
    </TouchableOpacity>

    )};

const styles = StyleSheet.create({

    button: {
        flexDirection: 'row',
        width: 200,
        backgroundColor: '#ffffff',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        shadowColor: '#000000',
        shadowOpacity: 1,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: {width:0.8, height:15},
        marginBottom: 30,
    },

    textButton: {
        color: '#5FA59D',
        fontSize: 20,
        fontWeight: 'bold',

    },
});