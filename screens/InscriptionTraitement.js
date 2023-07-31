import HeaderSansLogo from './components/HeaderSansLogo'
import Title from './Components/Title'
import Input from './Components/Input'
import ButtonNoColor from './Components/ButtonNoColor'
import {
    View, 
    StyleSheet,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'


export default function InscriptionTraitement(navigation) {

const handlePress = () => {
  navigation.navigate('Inscription Fiche Santé')
}



    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}><HeaderSansLogo name="Ma fiche santé" onPress={() => handlePress()} /></View>
            <View style={styles.titleContainer}><Title title="Ajout d'un traitement" style={styles.title}/></View>
            <ScrollView style={styles.scrollView}> 
            <View style={styles.field}>
                <View style={styles.largeInputContainer}><Input placeholder="0 allergie déclarée" title="Pathologie" underlineWidth={"35%"}/></View>
                <View style={styles.largeInputContainer}><Input placeholder="nom médicament" title="Traitement en cours" underlineWidth={"60%"}/></View>
                <View style={styles.largeInputContainer}><Input placeholder="unité" title="Dosage" underlineWidth={"30%"} /></View>
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
    scrollView:{
      width:'70%'
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
      textAlign:'left'
    },
    
  
  
})