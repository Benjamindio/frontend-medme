import HeaderLogo from '../Components/HeaderLogo';
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'




export default function HomeScreen() {

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        </KeyboardAvoidingView>
    )};


    const styles = StyleSheet.create({
        container: {
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'D9D9D9',
            width: "100%"
          },
    });

