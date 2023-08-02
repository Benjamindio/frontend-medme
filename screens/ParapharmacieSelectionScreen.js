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

import HeaderSansLogo from '../Components/HeaderSansLogo';
import SearchBar from '../Components/SearchBar';
import SmallTitle from '../Components/SmallTitle';
import { useState } from 'react';



export default function ParapharmacieSelectionScreen({navigation}) {

    const [ searchtext, setSearchText ] = useState ('');

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = 'Parapharmacie'
                            onPress={() => navigation.navigate('OrderScreen')}
                            title = 'Parapharmacie'/>
            <View style={styles.content}>
                <SearchBar placeholder='Que cherchez-vous?'
                            cursorColor = '#154C79'
                            keyboardType= 'default'
                            onChangeText={(value) => setSearchText(value)}
                            />
                <SmallTitle smallTitle = 'Vos résultats'/>
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
        
    });