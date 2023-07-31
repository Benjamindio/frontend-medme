import HeaderSansLogo from '../Components/HeaderSansLogo'
import Title from '../Components/Title'
import InputDate from '../Components/InputDate'
import Input from '../Components/Input'
import ButtonNoColor from '../Components/ButtonNoColor'
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'


export default function InscriptionFicheSante({navigation}) {

    const handlePress = () => {
        navigation.navigate('Inscription Profil')
      }
const title = "Ma fiche santé"

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}><HeaderSansLogo name="Je crée mon profil" onPress={() => handlePress()} /></View>
            <View style={styles.titleContainer}><Title title={title} style={styles.title}/></View>
            <ScrollView > 
            <View style={styles.field}>
                <View style={styles.largeInputContainer}>< InputDate placeholder="" 
                cursorColor = '#154C79'
                keyboardType = 'numeric'
                title="Date de naissance" 
                underlineWidth={'40%'}/></View>
                <View style={styles.inputTailleEtPoids}> 
                <View style={styles.inputSize}><Input placeholder="" text="cm" title='Taille' underlineWidth={40}/></View>
                <View style={styles.inputSize}><Input placeholder=""  text="kg" title='Poids' underlineWidth={40}/></View>
                </View>
                <View style={styles.largeInputContainer}><Input placeholder="0 allergie déclarée" title="Allergies" underlineWidth={"20%"}/></View>
                <View style={styles.largeInputContainer}><Input placeholder="0 traitement déclaré" title="Traitement en cours" underlineWidth={"40%"}/></View>
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
      width:'95%',
      alignItems:'center',
      marginTop:15

    },
    header:{
      width:'100%',
      height:"15%"
      
    },
    inputSize:{
      width: '40%'
    },
    titleContainer:{
      width:"80%",
    marginTop:15
      
    },

    inputTailleEtPoids:{
      width:"80%",
      flexDirection: 'row',
      justifyContent:'space-between',
    },
    largeInputContainer:{
      width:'80%',
      alignContent:'center'
    },
  title:{
    
  }
  
})