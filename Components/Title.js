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

export default function Title(props) {

    return (
        <View style = {styles.titleBox}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
)};

const styles = StyleSheet.create({
    titleBox: {
        width: '100%',
        height: 56,
        borderBottomColor: '#154C79',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingBottom: 10,
        marginBottom: 30,
        
    },

    title: {
        color: '#154C79',
        fontSize: 30,
        fontWeight: 'light',
    },
});

