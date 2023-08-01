import HeaderSansLogo from '../Components/HeaderSansLogo'
import Title from '../Components/Title'
import Input from '../Components/Input'
import ButtonNoIcon from '../Components/ButtonNoIcon'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addAllergies } from '../reducers/user'

import {
    View, 
    StyleSheet,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'


export default function InscriptionAllergie({navigation}) {
  const dispatch = useDispatch()
  const [allergie,setAllergie] = useState('')
    const handlePress = () => {
        navigation.push('InscriptionFicheSante')
      }
      const handleAddAllergie = () => {
        dispatch(addAllergies(allergie))
        navigation.push('InscriptionFicheSante')
      }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}>
              <HeaderSansLogo name="Ma fiche santé" onPress={() => handlePress()} />
              </View>
            <View style={styles.titleContainer}><Title title="Ajout d'une allergie" style={styles.title}/></View>
            <ScrollView style={styles.scrollView} > 
            <View style={styles.field}>
                <View style={styles.largeInputContainer}>
                  <Input placeholder="0 allergie déclarée" title="Allergies" underlineWidth={"20%"} value={allergie} onChangeText={(value) => {setAllergie(value)}} />
                  </View>
                <ButtonNoIcon textButton="Enregistrer" onPress={() => {handleAddAllergie()}} /> 
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