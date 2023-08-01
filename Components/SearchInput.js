import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
    StyleSheet,
    TextInput,
    View,
  } from 'react-native';

  export default function SearchInput(props) {
    return (
        <View style ={styles.container}>
            <FontAwesome name='search' size={20} color='#afb1b6' style ={styles.iconSearch} />
            <TextInput
                    style={styles.input}
                    placeholder={props.placeholder}
                    cursorColor={props.cursorColor}
                    maxLength={props.maxLength}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}>
            </TextInput>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        height: 60,
        width: '100%',
        backgroundColor: '#F5F5F5',
        marginBottom: 20,
        borderRadius: 8,
        padding: 10,
        borderColor: '#afb1b6',
        borderWidth: 1,
        opacity: 0.8,
    },
    input: {
        paddingLeft:20,
    },
    iconSearch: {
      color:'#5FA59D',
    },
  });
  