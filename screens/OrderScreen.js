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
import SearchInput from '../Components/SearchInput';
import SmallTitle from '../Components/SmallTitle';
import DisplayButton from '../Components/DisplayButton';
import { useState } from 'react';

export default function OrderScreen({navigation}) {

    const [ searchtext, setSearchText ] = useState ('');

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderLogo name = 'Commande'
                        onPress={() => navigation.navigate('TabNavigator', {sreen: 'Home'})}/>
            <View style={styles.content}>
                <SearchInput placeholder='Que cherchez-vous?'
                            cursorColor = '#154C79'
                            keyboardType= 'default'
                            onChangeText={(value) => setSearchText(value)}
                            />
                <SmallTitle smallTitle = 'Catégories'/>
                <DisplayButton  styleTextDisplayButton = {styles.text} 
                                styleIconLeft = {styles.iconLeft} 
                                styleIconRight = {styles.iconRight} 
                                nameIconLeft = 'pills' 
                                nameIconRight = 'chevron-right' 
                                text = 'Médicaments'
                                onPress={() => navigation.navigate('MedicamentsSelectionScreen')}/>
                <DisplayButton  styleTextDisplayButton = {styles.text} 
                                styleIconLeft = {styles.iconLeft} 
                                styleIconRight = {styles.iconRight} 
                                nameIconLeft = 'band-aid'
                                nameIconRight = 'chevron-right' 
                                text = 'Parapharmacie'
                                onPress={() => navigation.navigate('ParapharmacieSelectionScreen')}/>
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
            alignItems:'center',
            width: '90%',
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
