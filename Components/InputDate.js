import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
    Text,
    TextInput,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function InputDate(props) {

    return (
      <View> 
        <TextInput  style = {styles.input}
                    placeholder = {props.placeholder}
                    cursorColor={props.cursorColor}
                    maxLength={props.maxLength}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                    >
                    <FontAwesome name='calendar' size={25} style={styles.calendar}/>
        </TextInput>
        <View style={styles.underline} width={props.underlineWidth}></View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>

)};

const styles = StyleSheet.create({
input: {
    textAlign:'right',
    height: 60,
    backgroundColor: '#F5F5F5',
    marginBottom: 50,
    borderRadius: 8,
    padding: 20,
    borderColor:'#afb1b6',
    borderWidth:1,
    opacity: 0.8,
},
calendar:{
  color: '#5FA59D'
  
},

titleContainer: {
    flexDirection:'column',
    position: 'absolute',
    left: 15,
    top: -6, 
   // backgroundColor: '#F5F5F5',
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

