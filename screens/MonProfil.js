import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import HeaderLogo from '../Components/HeaderLogo';
import SmallTitle from '../Components/SmallTitle';
import DisplayButton from '../Components/DisplayButton';
import { useState } from 'react';

export default function MonProfil({navigation}) {

    
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderLogo name = 'Commande'
                        onPress={() => navigation.goBack()}/>
            <View style={styles.content}>
                <View style = {styles.detailContent}>
                    <View style = {styles.titleBox}>
                        <Text style={styles.title}>Mon Profil</Text>
                    </View>
                </View>
                <DisplayButton  styleTextDisplayButton = {styles.text} 
                                styleIconLeft = {styles.iconLeft} 
                                styleIconRight = {styles.iconRight} 
                                nameIconLeft = 'truck'
                                nameIconRight = 'chevron-right' 
                                text = 'Mes Commandes'
                                // onPress={}
                                />
                <DisplayButton  styleTextDisplayButton = {styles.text} 
                                styleIconLeft = {styles.iconLeft} 
                                styleIconRight = {styles.iconRight} 
                                nameIconLeft = 'address-book' 
                                nameIconRight = 'chevron-right' 
                                text = 'Mes Coordonnées'
                                // onPress={() => }
                                />
            </View>
        </KeyboardAvoidingView>
    )};



    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#F5F5F5',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content:{
            flex:4,
            padding: 20,
            justifyContent: 'flex-start',
            alignItems:'center',
            width: '100%',
        },
        detailContent: {
            width: '100%',
            height:'55%',
            backgroundColor: 'white',
            borderRadius:15,
            marginBottom: 30,
            padding:20,
            justifyContent:'flex-start',
            alignItems:'center'
        },
        titleBox: {
            width: '50%',
            height: 30,
            borderBottomColor: '#154C79',
            borderBottomWidth: 1,
            alignItems:'center',
            justifyContent: 'center',
            paddingBottom: 10,
            marginBottom: 20,     
        },
        title: {
            color: '#154C79',
            fontSize: 20,
            fontWeight: 'light',
            
        },
        text:{
            color: '#154C79',
            fontSize: 20,
            fontWeight: 'light',
        },
   
        iconLeft: {
            color:'#5FA59D',
        },
        iconRight:{
            color:'#afb1b6',
        },
        
    });
