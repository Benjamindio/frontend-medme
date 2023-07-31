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
import ButtonNoIcon from '../Components/ButtonNoIcon';


export default function InscriptionProfilScreen({navigation}) {

const [name, setName] = useState('');
const [firstName, setFirstName] = useState('');
const [email, setEmail] = useState('');

handleClickYes = () => {
     console.log('click bouton yes')
     navigation.navigate('InscriptionFicheSante');
}

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Image
                    style = {styles.logo}
                    source = {require('../assets/LogoV1.png')}
                />
                <Title title = 'Je crée mon profil'/>
                <Input  placeholder='Nom'
                    cursorColor = '#154C79'
                    keyboardType = 'default'
                    onChangeText={(value) => setName(value)}
                    value = {name}
                />
                <Input  placeholder='Prénom'
                    cursorColor = '#154C79'
                    keyboardType = 'default'
                    onChangeText={(value) => setFirstName(value)}
                    value = {firstName}
                />
                <Input  placeholder='Email'
                    cursorColor = '#154C79'
                    keyboardType = 'email-address'
                    onChangeText={(value) => setEmail(value)}
                    value = {email}
                />
                <Text style={styles.centerText}>Êtes-vous sous traitement?</Text>
                <View style={styles.smallButtonSection}>
                    <TouchableOpacity style={styles.smallButton} activeOpacity={0.8} onPress={()=> handleClickYes()}>
                        <Text style={styles.textSmallButton}>OUI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} activeOpacity={0.8} onPress={()=> handleClickNo()}>
                        <Text style={styles.textSmallButton}>NON</Text>
                    </TouchableOpacity>
                </View>
                <ButtonNoIcon textButton= 'Enregistrer'
                    onPress={() => navigation.navigate('TabNavigator', {sreen: 'Home'})}/>
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
            shadowColor: '#000000',
            shadowOpacity: 1,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: {width:0.8, height:15},
            marginBottom: 30,
        },
    
        textSmallButton: {
            color: '#afb1b6',
            fontSize: 20,
            fontWeight: 'light',
    
        },
        
        
    });
