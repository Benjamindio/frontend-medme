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
      <View style={styles.container}> 
       <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        cursorColor={props.cursorColor}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}>
        {props.text}
      </TextInput>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
      height:60,
      width:'100%',
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'center',
    },
    input: {
      width:'70%',
      height: 60,
      backgroundColor: '#F5F5F5',
      marginBottom: 50,
      borderRadius: 8,
      padding: 20,
      borderColor: '#afb1b6',
      borderWidth: 1,
      opacity: 0.8,
  
    },
    titleContainer: {
      justifyContent:'center',
      height:'100%',
      width:'30%',
     // backgroundColor: '#F5F5F5',
    
    },
    title:{
      color:'#afb1b6'
    }
    
  });
  