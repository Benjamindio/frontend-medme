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
     Text,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {healthCardCreation} from '../reducers/user'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import DatePicker from 'react-native-datepicker'


export default function InscriptionFicheSante({navigation}) {
  const user = useSelector(state => state.user.value)


    const [dateOfBirth,setDateOfBirth] = useState(new Date())
    const [size, setSize] = useState(0); 
    const [weight, setWeight]= useState(0);
    const [allergies, setAllergies] = useState(0);
    const [treatment, setTreatment ] =useState(0);
    const dispatch = useDispatch()
    const allergieCount = `${allergies} allergies déclarées`
    const treatmentCount = `${treatment}  traitements déclarées`


    useEffect(() => {

      setDateOfBirth( new Date(user.healthCard.dateOfBirth))
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
         weight: user.healthCard.weight,adress:user.adresse, allergies: user.healthCard.allergies, treatment: user.healthCard.treatment  }),
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
  const isoStringDate = dateOfBirth.toISOString()
  console.log(isoStringDate)
  dispatch(healthCardCreation({isoStringDate, size,weight}))

  navigation.navigate('InscriptionAllergie')
}
const handleAddTreatment = () => {
  const isoStringDate = dateOfBirth.toISOString()
  dispatch(healthCardCreation({isoStringDate, size,weight}))
  navigation.navigate('InscriptionTraitement')
}
//

return (
  <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}><HeaderSansHamburger name="Je crée mon profil" onPress={() => handleReturn()} /></View>
      <View style={styles.titleContainer}>
        <Title title="Ma fiche santé" />
        </View>
      
      <View style={styles.field}>
          <View style={styles.inputAndLogoContainer}>
          <View style={styles.dateContainer}>
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
              const currentDate = selectedDate || dateOfBirth;
                setDateOfBirth(currentDate);
              }}
              style={styles.dateInputContainer}
            />
            <View style={styles.underline} width={100}></View>
              <View style={styles.dateTitleContainer}>
                <Text style={[styles.title,]}>Date de naissance</Text>
              </View>
            {/*< InputDate placeholder="" 
              cursorColor = '#154C79'
              title="Date de naissance" 
              text={dateOfBirthText}
              underlineWidth={'40%'} onChangeText={(value) => {setDateOfBirth(value)}} value={dateOfBirth} />
              </View>
              <FontAwesome name='calendar' size={25} style={styles.iconColor}/>*/}
              </View>
            </View>
            <View style={styles.inputTailleEtPoids}> 
              <View style={styles.inputSize}>
                <Input placeholder="" text={sizeText} title='Taille' keyboardType='numeric' underlineWidth={40} onChangeText={(value) => {setSize(value)}} value={size} />
                </View>
              <View style={styles.inputSize}>
                <Input placeholder=""  text={weightText} title='Poids' keyboardType='numeric' underlineWidth={40} onChangeText={(value) => {setWeight(value)}} value={weight}/>
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
      
  </KeyboardAvoidingView>
)
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'D9D9D9',
    width: "100%"
    },
  field:{
    width:'95%',
    alignItems:'center',

    flex:0.7

  },
    header:{
    width:'100%',
    flex:0.15

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
    flex:0.15,
    marginTop:15

  },

  inputTailleEtPoids:{
    width:"80%",
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  inputAndLogoContainer:{
    width:'80%',
    height:'20%',
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center'

  },
  dateContainer:{
    width:'100%',
    height:'80%'


  },
  dateInputContainer:{
    
  height:'100%',
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    borderColor: '#afb1b6',
    borderWidth: 1,
    opacity: 0.8,

  },
  dateTitleContainer: {
    flexDirection:'column',
    position: 'absolute',
    left: 15,
    top: -6, 
   backgroundColor: '#F5F5F5',
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
    
  },
  largeInputContainer:{
    width:"100%"
  },
  

  })