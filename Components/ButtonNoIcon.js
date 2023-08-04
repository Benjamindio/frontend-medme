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
        shadowColor: '#afb1b6',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 8,
        shadowOffset: {width:0.8, height:10},
        marginBottom: 50,
        marginTop:30,
    },

    textButton: {
        color: '#5FA59D',
        fontSize: 20,
        fontWeight: 'bold',

    },
});