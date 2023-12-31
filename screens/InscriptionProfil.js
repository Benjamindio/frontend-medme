import {
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import Input from '../Components/Input';
import Title from '../Components/Title';
import ButtonNoIcon from '../Components/ButtonNoIcon';
import { useDispatch,useSelector } from 'react-redux';
import {signUp} from '../reducers/user'
import { faBullseye, faLaptopHouse } from '@fortawesome/free-solid-svg-icons';


export default function InscriptionProfilScreen({navigation}) {
const user = useSelector(state => state.user.value)
const [name, setName] = useState('');
const [firstName, setFirstName] = useState('');
const [email, setEmail] = useState('');
const [adresse,setAdresse] = useState('')
const [isSelected, setIsSelected] = useState(false)
const dispatch = useDispatch()


handleClickRegister = () => {
    console.log(typeof adresse)
    fetch('https://backend-medme.vercel.app/users/updateUserInfo', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({phoneNumber:user.phoneNumber, lastname: name, firstname: firstName, email: email, 
      healthCard: false , adress:adresse}),
}).then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.result){
            setIsSelected(false)
            navigation.navigate('TabNavigator', {screen: 'Home'})
        } else {
            console.log('error')
        }
    })

}

handleClickYes = () => {
    console.log('click bouton yes')
    dispatch(signUp({lastname:name, firstName,adresse, email, hasHealthCard:true}))
    navigation.navigate('InscriptionFicheSante');
}

handleClickNo = () => {
    console.log('click bouton no')
    setIsSelected(true)
    dispatch(signUp({lastname:name, firstName, email, hasHealthCard:false, adresse}))
}

const butnSelectedStyle = {
    backgroundColor: isSelected ? '#5FA59D' : '#ffffff',
    color: isSelected ? 'white' : '#afb1b6',
  }; 


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <Image
                    style = {styles.logo}
                    source = {require('../assets/LogoV1.png')}
                />
                <Title title = 'Je crée mon profil'/>
                <View style={styles.largeInputContainer}><Input title="Nom" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'default'
                                                                onChangeText={(value) => setName(value)}
                                                                value = {name}/></View>
                <View style={styles.largeInputContainer}><Input title="Prénom" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'default'
                                                                onChangeText={(value) => setFirstName(value)}
                                                                value = {firstName}/></View>
                <View style={styles.largeInputContainer}><Input title="Email" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'email-address'
                                                                onChangeText={(value) => setEmail(value)}
                                                                value = {email}/></View>
                <View style={styles.largeInputContainer}><Input title="Adresse" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'default'
                                                                onChangeText={(value) => setAdresse(value)}
                                                                value = {adresse}/></View>
                <Text style={styles.centerText}>Êtes-vous sous traitement?</Text>
                <View style={styles.smallButtonSection}>
                    <TouchableOpacity style={styles.smallButton} activeOpacity={0.8} onPress={()=> handleClickYes()}>
                        <Text style={styles.textSmallButton}>OUI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.smallButton,butnSelectedStyle]} activeOpacity={0.8} onPress={()=> handleClickNo()}>
                        <Text style={[styles.textSmallButton,butnSelectedStyle]}>NON</Text>
                    </TouchableOpacity>
                </View>
                <ButtonNoIcon textButton= 'Enregistrer'
                    onPress={() => handleClickRegister()}/>
            </View>
        </KeyboardAvoidingView>
        )
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#F5F5F5',
            justifyContent: 'center',
            padding: 20,
            alignItems: 'center',
        },
        logo:{
            width: '90%',
            height: 200,
            resizeMode: 'contain',
        },
        centerText: {
            justifyContent: 'center',
            color: '#263238',
            fontSize: 18,
            marginBottom: 15,
        },

        smallButtonSection: {
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center',
        },
        smallButton: {
            flexDirection: 'row',
            width: 60,
            backgroundColor: '#ffffff',
            height: 40,
            borderRadius: 8,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            fontSize: 20,
            margin: 10,
            shadowColor: '#afb1b6',
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 8,
            shadowOffset: {width:0.8, height:10},
        },
        textSmallButton: {
            color: '#afb1b6',
            fontSize: 20,
            fontWeight: 'light',
    
        },
        largeInputContainer:{
            width:'80%',
            alignContent:'center'
          },
         });
