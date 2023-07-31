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


export default function InscriptionProfilScreen({navigation}) {


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
                    keyboardType = 'numeric'
                    onChangeText={(value) => setPhone(value)}
                    valuealue = {phone}
                />
                            <Input  placeholder='+33'
                    cursorColor = '#154C79'
                    maxLength = {10}
                    keyboardType = 'numeric'
                    onChangeText={(value) => setPhone(value)}
                    valuealue = {phone}
                />
                            <Input  placeholder='+33'
                    cursorColor = '#154C79'
                    maxLength = {10}
                    keyboardType = 'numeric'
                    onChangeText={(value) => setPhone(value)}
                    valuealue = {phone}
                />

                <Bouton textButton= 'Enregistrer'
                    onPress={() => navigation.navigate('InscriptionFicheSante')}/>
            </View>
        </KeyboardAvoidingView>
        )
    };
