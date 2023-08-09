import HeaderSansHamburger from '../Components/HeaderSansHamburger'
import Title from '../Components/Title'
import Input from '../Components/Input'
import ButtonNoIcon from '../Components/ButtonNoIcon'
import {
    View, 
    StyleSheet,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTreatment } from '../reducers/user'

export default function InscriptionTraitement({navigation}) {
const [pathologie,setPathologie] =useState('')
const [medicament, setMedicament]= useState('')
const [dosage, setDosage] = useState('')
const dispatch = useDispatch()
const handlePress = () => {
  navigation.navigate('InscriptionFicheSante')
}

const handleNewPathologie = () => {
    dispatch(addTreatment({pathologie:pathologie, medicament:medicament, dosage:dosage}))
    
    setPathologie('')
    setMedicament('')
    setDosage('')
    navigation.push('InscriptionFicheSante') 
    
}


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <HeaderSansHamburger name="Ma fiche santé" onPress={() => handlePress()} />
                <View style = {styles.content}>
            <Title title="Ajout d'un traitement" style={styles.title}/>
            <ScrollView style={styles.scrollView}> 
            <View style={styles.field}>
                <View style={styles.largeInputContainer}><Input placeholder="Pathologie" title="Pathologie" underlineWidth={"35%"} value={pathologie} onChangeText={(value) => setPathologie(value)}/></View>
                <View style={styles.largeInputContainer}><Input placeholder="Nom médicament" title="Traitement en cours" underlineWidth={"60%"} value={medicament} onChangeText={(value) => setMedicament(value)}/></View>
                <View style={styles.largeInputContainer}><Input placeholder="unité" title="Dosage" underlineWidth={"30%"} value={dosage} onChangeText={(value) => setDosage(value)} /></View>
                <ButtonNoIcon textButton="Enregistrer" onPress={() => {handleNewPathologie()}} /> 
                </View>
            </ScrollView> 
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    width:'100%',
},
content: {
    flex:4,
    width:'100%',
    justifyContent: 'flex-start',
    alignItems:'center',
    padding:20,
    
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
      width:"70%",
    marginTop:15
    },
    largeInputContainer:{
      width:'100%',
      alignContent:'center',
      textAlign:'left'
    },
    
  
  
})