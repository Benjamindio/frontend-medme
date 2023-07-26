import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function LoginScreen() {

    return (
        <View style={styles.container}>
            <View style = {styles.titleBox}>
                <Text style={styles.title}>Identifiez-vous</Text>
            </View>
            <Text style={styles.text}>Veuillez saisir votre numéro de téléphone, nous vous enverrons un code de confirmation.</Text>
            <TextInput  style = {styles.input}
                        placeholder={'+33'}>
            </TextInput>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Continuer</Text>
                <FontAwesome name='arrow-right'size={16} color='#afb1b6'/>
            </TouchableOpacity>
        </View>

    )};

    const styles = StyleSheet.create({
        container: {
          flex:1,
          backgroundColor: '#F5F5F5',
          justifyContent: 'center',
          padding: 20,
          alignItems: 'center',
        },

        input: {
            width: '95%',
            height: 60,
            backgroundColor: '#F5F5F5',
            marginBottom: 50,
            borderRadius: 8,
            padding: 10,
            borderColor:'#afb1b6',
            borderWidth:1,
            opacity: 0.8,
        },

        titleBox: {
            width: '95%',
            height: 56,
            borderBottomColor: '#154C79',
            borderBottomWidth: 1,
            justifyContent: 'center',
            paddingBottom: 10,
            marginBottom: 20,
            
        },

        title: {
            color: '#154C79',
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Cabin',
    
        },
        text: {
            color: '#afb1b6',
            fontSize: 15,
            marginBottom: 30,
        },
        button: {
            flexDirection: 'row',
            width: 250,
            backgroundColor: '#ffffff',
            height: 56,
            borderRadius: 8,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            fontSize: 30,
            shadowColor: '#000000',
            shadowOpacity: 1,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: {width:0.8, height:15},
        },

        textButton: {
            color: '#5FA59D',
            fontSize: 20,
            fontWeight: 'bold',

        }
      })
