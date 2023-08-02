import HeaderSansHamburger from '../Components/HeaderSansHamburger'
import Title from '../Components/Title'
import InputDate from '../Components/InputDate'
import Input from '../Components/Input'
import ButtonNoIcon from '../Components/ButtonNoIcon'
import {
    View, 
    StyleSheet,
     KeyboardAvoidingView,
     Platform,
     ScrollView,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {healthCardCreation} from '../reducers/user'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function InscriptionFicheSante({navigation}) {
  const user = useSelector(state => state.user.value)


    const [dateOfBirth,setDateOfBirth] = useState('')
    const [size, setSize] = useState(0); 
    const [weight, setWeight]= useState(0);
    const [allergies, setAllergies] = useState(0);
    const [treatment, setTreatment ] =useState(0);
    const dispatch = useDispatch()
    const allergieCount = `${allergies} allergies déclarées`
    const treatmentCount = `${treatment}  traitements déclarées`


    useEffect(() => {
      setDateOfBirth(user.healthCard.dateOfBirth)
      setSize(user.healthCard.size)
      setWeight(user.healthCard.weight)
      setAllergies(user.healthCard.allergies.length)
      setTreatment(user.healthCard.treatment.length)
      console.log(treatment)
      console.log('test')
    }, [])


    
    const handleReturn = () => {
  
      navigation.navigate('InscriptionProfil')
      }


  const handleRegister = () => {
       
  fetch('https://backend-medme.vercel.app/users/updateUserInfo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: user.phoneNumber,firstname:user.firstName,lastname:user.lastname, email:user.email, hasHealthCard:user.healthCard.hasHealthCard,dateOfBirth: user.healthCard.dateOfBirth, size: user.healthCard.size,
         weight: user.healthCard.weight, allergies: user.healthCard.allergies, treatment: user.healthCard.treatment  }),
  }).then(response => response.json())
      .then(data => {
          if(data.result){
              navigation.navigate('TabNavigator', {screen: 'Home'})
          } else {
              console.log('error')
          }
      })
};
let dateOfBirthText = dateOfBirth
if (dateOfBirthText === ''){
  dateOfBirthText =''
}
let sizeText = size
if(sizeText === 0) {
  sizeText = 'cm'
} 
let weightText = weight
if(weightText ===0) {
  weightText = 'kg'
}
const handleAddAllergie = () => {

  dispatch(healthCardCreation({dateOfBirth, size,weight}))

  navigation.navigate('InscriptionAllergie')
}
const handleAddTreatment = () => {
  dispatch(healthCardCreation({dateOfBirth, size,weight}))
  navigation.navigate('InscriptionTraitement')
}
//

return (
  <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}><HeaderSansHamburger name="Je crée mon profil" onPress={() => handleReturn()} /></View>
      <View style={styles.titleContainer}>
        <Title title="Ma fiche santé" style={styles.title}/>
        </View>
      <ScrollView > 
      <View style={styles.field}>
          <View style={styles.inputAndLogoContainer}>
          <View style={styles.largeInputContainer}>
            < InputDate placeholder="" 
              cursorColor = '#154C79'
              title="Date de naissance" 
              text={dateOfBirthText}
              underlineWidth={'40%'} onChangeText={(value) => {setDateOfBirth(value)}} value={dateOfBirth} />
              </View>
              <FontAwesome name='calendar' size={25} style={styles.iconColor}/>
            </View>
            <View style={styles.inputTailleEtPoids}> 
              <View style={styles.inputSize}>
                <Input placeholder="" text={sizeText} title='Taille' underlineWidth={40} onChangeText={(value) => {setSize(value)}} value={size} />
                </View>
              <View style={styles.inputSize}>
                <Input placeholder=""  text={weightText} title='Poids' underlineWidth={40} onChangeText={(value) => {setWeight(value)}} value={weight}/>
              </View>
            </View>
            <View style={styles.inputAndLogoContainer}>
              <View style={styles.largeInputContainer}>
                <Input placeholder={allergieCount} title="Allergies" underlineWidth={"20%"}/>
                </View>
                <FontAwesome name='plus' size={25} style={styles.iconColor} onPress={() => handleAddAllergie()}/>
              </View>
            <View style={styles.inputAndLogoContainer}>
            <View style={styles.largeInputContainer}>
              <Input placeholder={treatmentCount} title="Traitement en cours" underlineWidth={"40%"} />
            </View>
              <FontAwesome name='plus' size={25} style={styles.iconColor} onPress={() =>handleAddTreatment() }/>
            </View>
            <ButtonNoIcon textButton="Enregistrer" onPress={() => handleRegister()} /> 
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
height:"15%",


},
iconColor:{
color: '#5FA59D',
position:'absolute',
left:'80%',
top: '15%',
marginLeft: 20,
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
inputAndLogoContainer:{
width:'80%',
flexDirection:'row',
alignContent:'center',
justifyContent:'center'

},
largeInputContainer:{
width:"100%"
},
title:{

}

})