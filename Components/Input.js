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
  import { useState} from 'react';

  
  export default function Input(props) {

    const [ isClicked, setIsClicked ] = useState(false);


    const handleFocusInput = () => {
      console.log('input focused')
      setIsClicked(true)
    }

    const selectedStyle= {
      borderColor: isClicked ? '#5FA59D': '#afb1b6',
    };

    const selectedTextStyle = {
      color: isClicked ? '#5FA59D': 'black',
    }

    return (
      <View> 
      
      <TextInput
        style={[styles.input,selectedStyle]}
        placeholder={props.placeholder}
        cursorColor={props.cursorColor}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        onFocus={() => handleFocusInput()}
        editable={props.editable}
        value ={props.value}>
        {props.text}
      </TextInput>
      <View style={styles.underline} width={props.underlineWidth}></View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title,selectedTextStyle]}>{props.title}</Text>
      </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      height: 60,
      backgroundColor: '#F5F5F5',
      marginBottom: 20,
      borderRadius: 8,
      padding: 20,
      borderColor: '#afb1b6',
      borderWidth: 1,
      opacity: 0.8,
  
    },
    titleContainer: {
      flexDirection:'column',
      position: 'absolute',
      left: 15,
      top: -6, 
     backgroundColor: '#F5F5F5',
      alignSelf: 'flex-start',
    },
    title:{
      paddingHorizontal: 5,
    },
    underline:{
      borderBottomWidth:3,
  
      borderColor:'#F5F5F5',
      position: 'absolute',
      marginLeft: 13,
      
    }
    
  });
  