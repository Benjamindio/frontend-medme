import HeaderSansLogo from './components/HeaderSansLogo'
import Title from './components/Title'
import Input from './components/Input'
import ButtonNoColor from './components/ButtonNoColor'
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'


export default function InscriptionAllergie(navigation) {

    const handlePress = () => {
        navigation.navigate('Inscription Fiche Santé')
      }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}><HeaderSansLogo name="Ma fiche santé" onPress={() => handlePress()} /></View>
            <View style={styles.titleContainer}><Title title="Ajout d'une allergie" style={styles.title}/></View>
            <ScrollView style={styles.scrollView} > 
            <View style={styles.field}>
                <View style={styles.largeInputContainer}><Input placeholder="0 allergie déclarée" title="Allergies" underlineWidth={"20%"}/></View>
                <ButtonNoColor textButton="Enregistrer" /> 
                </View>
            </ScrollView> 
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'D9D9D9',
      width: "100%"
    },
    field:{
      width:'100%',
      alignItems:'center',
      marginTop:15

    },
    header:{
      width:'100%',
      height:"15%"
      
    },
 
    titleContainer:{
      width:"80%",
      marginTop:15 
    },

    largeInputContainer:{
      width:'100%',
      alignContent:'center',
    },

    scrollView:{

    width: '80%',
    
  }
  
})