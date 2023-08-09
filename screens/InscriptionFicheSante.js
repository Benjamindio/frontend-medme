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



export default function InscriptionFicheSante({navigation}) {
  const user = useSelector(state => state.user.value)


    const [dateOfBirth,setDateOfBirth] = useState(new Date())
    const [size, setSize] = useState(0); 
    const [weight, setWeight]= useState(0);
    const [allergies, setAllergies] = useState(0);
    const [treatment, setTreatment ] =useState(0);
    const [bloodGroup, setBloodGroup] = useState('');
    const dispatch = useDispatch()
    let allergieCount = `${allergies} allergies déclarées`
    let treatmentCount = `${treatment}  traitements déclarés`
    if (treatment < 1) {
      treatmentCount = `${treatment}  traitement déclaré`
    }
    if (allergies < 1) {
      allergieCount = `${allergies} allergie déclarée`
    }


    useEffect(() => {
      setDateOfBirth( new Date(user.healthCard.dateOfBirth))
      setSize(user.healthCard.size)
      setWeight(user.healthCard.weight)
      setAllergies(user.healthCard.allergies.length)
      setTreatment(user.healthCard.treatment.length)
      setBloodGroup(user.healthCard.bloodGroup)
      console.log(treatment)
      console.log('test')
    }, [])


    
    const handleReturn = () => {
  
      navigation.goBack()
      }


  const handleRegister = () => {
    const isoStringDate = dateOfBirth.toISOString()
    dispatch(healthCardCreation({isoStringDate,size, weight, bloodGroup}))

     
       
  fetch('https://backend-medme.vercel.app/users/updateUserInfo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: user.phoneNumber,firstname:user.firstName,lastname:user.lastname, email:user.email, hasHealthCard:user.hasHealthCard,dateOfBirth: user.healthCard.dateOfBirth, size: user.healthCard.size,
         weight: user.healthCard.weight,adress:user.adresse, allergies: user.healthCard.allergies, treatment: user.healthCard.treatment, bloodGroup: user.healthCard.bloodGroup  }),
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
  dispatch(healthCardCreation({isoStringDate, size,weight, bloodGroup}))
  navigation.push('InscriptionAllergie')
}
const handleAddTreatment = () => {
  const isoStringDate = dateOfBirth.toISOString()
  dispatch(healthCardCreation({isoStringDate, size,weight, bloodGroup}))
  navigation.push('InscriptionTraitement')
}
//

return (
  <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <HeaderSansHamburger name="Je crée mon profil" onPress={() => handleReturn()} />
        <View style = {styles.content}>
        <Title title="Ma fiche santé" />
        <View style={styles.field}>
          <View style={styles.inputAndLogoContainer}>
          {/* <View style={styles.dateContainer}> */}
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
              {/* </View> */}
            </View>
            <View style={styles.inputTailleEtPoids}> 
              <View style={styles.inputSize}>
                <Input placeholder=""  title='Taille' keyboardType='numeric' underlineWidth={40} onChangeText={(value) => {setSize(value)}} value={size} />
                </View>
              <View style={styles.inputSize}>
                <Input placeholder=""   title='Poids' keyboardType='numeric' underlineWidth={40} onChangeText={(value) => {setWeight(value)}} value={weight}/>
              </View>
            </View>
            <View style={styles.inputSize}>
                <Input placeholder=""   title='Groupe sanguin' underlineWidth={40} onChangeText={(value) => {setBloodGroup(value)}} value={bloodGroup}/>
            </View>
            <View style={styles.inputAndLogoContainer}>
              <View style={styles.largeInputContainer}>
                <Input editable={false} placeholder={allergieCount} title="Allergies" underlineWidth={"20%"}/>
              </View>
            <FontAwesome name='plus' size={25} style={styles.iconColor} onPress={() => handleAddAllergie()}/>
              </View>
            <View style={styles.inputAndLogoContainer}>
              <View style={styles.largeInputContainer}>
                <Input editable={false} placeholder={treatmentCount} title="Traitement en cours" underlineWidth={"40%"}/>
                </View>
                <FontAwesome name='plus' size={25} style={styles.iconColor} onPress={() =>handleAddTreatment() }/>
            </View>
            <ButtonNoIcon textButton="Enregistrer" onPress={() => handleRegister()} /> 
        </View>
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
    width:'90%',
    justifyContent:'center',
    alignItems:'center',

  },
  iconColor:{
    color: '#5FA59D',
    position:'absolute',
    left:'80%',
    top: '30%',
    // marginLeft: 20,
  },
  inputSize:{
    width: '45%',
    
  },
  titleContainer:{
    width:"80%",
    marginTop:30/// ici

  },

  inputTailleEtPoids:{
    width:"100%",
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  inputAndLogoContainer:{
    width:'100%',
    height:60,
    ////ici
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center',
    marginBottom:20,

  },
  dateContainer:{
    width:'100%',
    height:'80%'


  },
  dateInputContainer:{
    
    // height:'100%',
    backgroundColor: '#F5F5F5',
    // marginBottom: 20,
    borderRadius: 8,
    width:'100%',
    // padding: 20,
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
    width:'100%',
    // flexDirection:'row',
    // alignItems:'center',
    // justifyContent:'space-between',
  },
  

  })