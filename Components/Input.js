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

export default function Input(props) {

    return (
        <TextInput  style = {styles.input}
                    placeholder = {props.placeholder}
                    cursorColor={props.cursorColor}
                    maxLength={props.maxLength}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}>
        </TextInput>

)};

const styles = StyleSheet.create({
input: {
    width: '85%',
    height: 60,
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    borderColor:'#afb1b6',
    borderWidth:1,
    opacity: 0.8,
},
});

