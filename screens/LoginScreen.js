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


export default function LoginScreen({navigation}) {

    const [ title, setTitle ] = useState ('');
    const [ textContent, setTextContent] = useState ('');
    const [ phone, setPhone ] = useState('');
    const [ code, setCode ] = useState ('');
    const [ isContent, setIsContent ] = useState (false);

    let contentSection;
    let num = phone[8]+phone[9]


    useEffect (() => {
        setTitle('Identifiez-vous');
        setTextContent('Veuillez saisir votre numéro de téléphone, nous vous enverrons un code de confirmation.')
    },[]);



    if (!isContent) {

        contentSection = (
            <View style={styles.contentContainer}>
            <Input  placeholder='+33'
                    cursorColor = '#154C79'
                    maxLength = {10}
                    keyboardType = 'numeric'
                    onChangeText={(value) => setPhone(value)}
                    value = {phone}
                />
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
                fetch('http://192.168.1.97:3000/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber: phone }),
                }).then(response => response.json())
                    .then(data => {
                        if(data.result){
                            // Affichage screen code 
                            setTitle('Code de vérification')
                            setTextContent(`Veuillez renseigner le code envoyé au numéro terminant par ********${num}.`)
                            setCode(data.generatedCode);
                            setIsContent(!isContent);

                        } else {
                            console.log('error')
                        }
                    })
        };
    
        // Bouton pour valider code et se diriger sur le screen profil - création new user dans la bd
        const handleClick = () => {
            console.log('Click bouton continuer')
            fetch('http://192.168.1.97:3000/users/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: phone, generatedCode:code}),
            }).then(response => response.json())
                .then(data => {
                    if(data.result){
                        //ouvrir écran profil
                        navigation.navigate('InscriptionProfil')
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
            shadowColor: '#000000',
            shadowOpacity: 1,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: {width:0.8, height:15},
        },
        textCode: {
            color: '#5FA59D',
            fontSize: 20,
            fontWeight: 'bold',    
        },

      });