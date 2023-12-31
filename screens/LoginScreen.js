import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from '../Components/Input';
import Title from '../Components/Title';
import Bouton from '../Components/Button';
import { useDispatch } from 'react-redux';
import {login,updateUserStatus} from '../reducers/user'
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

export default function LoginScreen({navigation}) {

    const isFocused = useIsFocused();
    const [ title, setTitle ] = useState ('');
    const [ textContent, setTextContent] = useState ('');
    const [ phone, setPhone ] = useState('');
    const [ code, setCode ] = useState ('');
    const [ isContent, setIsContent ] = useState (false);
    const dispatch = useDispatch()
    let contentSection;
    let num = phone[8]+phone[9]
    const [userExist, setUserExist] = useState(false)
    const user = useSelector((state)=> state.user.value.isConnected)

    useEffect (() => {
        setTitle('Identifiez-vous');
        setTextContent('Veuillez saisir votre numéro de téléphone, nous vous enverrons un code de confirmation.')
    },[]);

    useEffect(()=> {
        if(user === false) {
            setIsContent(!isContent)
        }
    },[isFocused])
    

    if (!isContent) {

        contentSection = (
            <View style={styles.contentContainer}>
            <View style={styles.largeInputContainer}><Input title="Téléphone"
                                                            placeholder='+33'
                                                            underlineWidth={"20%"}
                                                            cursorColor = '#154C79'
                                                            maxLength = {10}
                                                            keyboardType = 'numeric'
                                                            onChangeText={(value) => setPhone(value)}
                                                            value = {phone}/></View>
            <Bouton textButton= 'Continuer'
                    iconName = 'arrow-right'
                    iconSize = {16}
                    iconColor = '#afb1b6'
                    onPress={() => handleConnection()}/>
            </View>
        )
    } else {

        contentSection =  (
            <View style={styles.contentContainer}>
                <View style={styles.codeSection}>
                    <View style = {styles.codeBox}>
                        <Text style = {styles.textCode}>{code[0]}</Text>
                    </View>
                    <View style = {styles.codeBox}>
                        <Text style = {styles.textCode}>{code[1]}</Text>
                    </View>
                    <View style = {styles.codeBox}>
                        <Text style = {styles.textCode}>{code[2]}</Text>
                    </View>
                    <View style = {styles.codeBox}>
                        <Text style = {styles.textCode}>{code[3]}</Text>
                    </View>
                    <View style = {styles.codeBox}>
                        <Text style = {styles.textCode}>{code[4]}</Text>
                    </View>
                </View>
                <Bouton textButton= 'Continuer'
                        iconName = 'arrow-right'
                        iconSize = {16}
                        iconColor = '#afb1b6'
                        onPress={() => handleClick()}/>
                {/* <Text style={styles.textComment}>Code non reçu? Réenvoyer Code.</Text> */}
            </View>
        )
    };
 
        // Bouton pour generer Code
        const handleConnection = () => {
                console.log('click', phone);

              // verifier conformite du numero telephone - fetch route générant code
                fetch('https://backend-medme.vercel.app/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber: phone }),
                }).then(response => response.json())
                    .then(data => {
                        if(data.result && data.userStatus ==='dontExist'){
                            // Affichage screen code 
                            setTitle('Code de vérification')
                            setTextContent(`Veuillez renseigner le code envoyé au numéro terminant par ********${num}.`)
                            setCode(data.generatedCode);
                            setIsContent(!isContent);
                            dispatch(updateUserStatus({userStatus:data.userStatus}))
                            
                        } else if(data.result && data.userStatus === 'existing') {
                            setUserExist(!userExist)
                            setIsContent(!isContent)
                            setCode(data.generatedCode)
                            console.log('userExist')
                            dispatch(updateUserStatus({userStatus:data.userStatus}))
                        } 
                        else {
                            console.log('error')
                        }
                    })
        };
    
        // Bouton pour valider code et se diriger sur le screen profil - création new user dans la bd
        const handleClick = () => {
            console.log('Click bouton continuer')
            fetch('https://backend-medme.vercel.app/users/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: phone, generatedCode:code}),
            }).then(response => response.json())
                .then(data => {
                    if(data.result){
                        //ouvrir écran profil
                        
                        dispatch(login({phoneNumber:phone,token:data.token}))
                        if(userExist) {
                            console.log('userExist')
                            navigation.navigate('TabNavigator', {screen: 'Home'})
                        } else {
                            navigation.navigate('InscriptionProfil')
                        }
                        
                    } else {
                        console.log('error')
                    }
                })
        };

     return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Image
                    style = {styles.logo}
                    source = {require('../assets/LogoV1.png')}
                />
                <Title title = {title}/>
                <Text style={styles.text}>{textContent}</Text>
                {contentSection}
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

        contentContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },

        logo:{
            width: '90%',
            height: 200,
            resizeMode: 'contain',
        },

        text: {
            width:'100%',
            color: '#afb1b6',
            fontSize: 15,
            marginBottom: 30,
        },
        codeSection: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30, 
        },
        codeBox: {
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',

        },
        textCode: {
            color: '#5FA59D',
            fontSize: 20,
            fontWeight: 'bold',    
        },
        input: {
            width: '100%',
        },
        largeInputContainer:{
            width:'80%',
            alignContent:'center'
          },

      });