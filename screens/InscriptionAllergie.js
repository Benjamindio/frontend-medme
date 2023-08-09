import HeaderSansHamburger from '../Components/HeaderSansHamburger'
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
        setAllergie('')
      }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <HeaderSansHamburger name="Ma fiche santé" onPress={() => handlePress()} />
              <View style = {styles.content}>
            <Title title="Ajout d'une allergie"/>
            <ScrollView style={styles.scrollView} > 
            <View style={styles.field}>
                <View style={styles.largeInputContainer}>
                  <Input placeholder="0 allergie déclarée" title="Allergies" underlineWidth={"20%"} value={allergie} onChangeText={(value) => {setAllergie(value)}} />
                  </View>
                <ButtonNoIcon textButton="Enregistrer" onPress={() => {handleAddAllergie()}} /> 
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
    field:{
      width:'100%',
      alignItems:'center',
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