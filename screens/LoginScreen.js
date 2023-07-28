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
import { text } from '@fortawesome/fontawesome-svg-core';


export default function LoginScreen() {

    const [ title, setTitle ] = useState ('');
    const [ textContent, setTextContent] = useState ('');
    const 

    const [ phone, setPhone ] = useState('');
    const [ code, setCode ] = useState ('');
 

useEffect (() => {
    setTitle('Identifiez-vous')
    setTextContent('Veuillez saisir votre numéro de téléphone, nous vous enverrons un code de confirmation.')
        },[] );  
 
let content = (
    <Input  placeholder='+33'
            cursorColor = '#154C79'
            maxLength = {10}
            keyboardType = 'numeric'
            onChangeText={(value) => setPhone(value)}
            valuealue = {phone}
        />)

    const handleConnection = () => {
        console.log('click', phone)
        

        // verifier conformite du numero telephone - fetch route générant code
        // fetch('http://localhost:3000/users/signup', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ phoneNumber:phone})
        // }).then (response => response.json())
        //     .then (data => {
        //         if ( data.result) {
        //             console.log(data)
        //             // setCode(data)
                    let num = phone[8]+phone[9]
                    setTitle('Code de vérification')
                    setTextContent(`Veuillez renseigner le code envoyé au numéro terminant par ********${num}.`)
                    setPhone('')
                    console.log(num)

                    // Set Code page content
                    content = (
                        <View style = {styles.contentContainer}>
                            <Title title = 'Code de vérification'/>
                            <Text style={styles.text}>Veuillez renseigner le code envoyé au numéro terminant par ******{num}.</Text>
                            <Bouton textButton= 'Continuer'
                                    iconName = 'arrow-right'
                                    iconSize = {16}
                                    iconColor = '#afb1b6'/>
                            <Text style={styles.text}>Code non reçu? Renvoyer le code.</Text>
                        </View>
                    );
        //      };
        //     })
    };

    return (
        <View style={styles.container}>
            <Image
                style = {styles.logo}
                source = {require('../assets/LogoV1.png')}
            />
            <Title title = {title}/>
            <Text style={styles.text}>{textContent}</Text>
            {content}
            <Bouton textButton= 'Continuer'
                    iconName = 'arrow-right'
                    iconSize = {16}
                    iconColor = '#afb1b6'
                    onPress={() => handleConnection()}/>
        </View>

    )};

    const styles = StyleSheet.create({
        container: {
            flex:1,
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

      })
