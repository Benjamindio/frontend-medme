import {
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import DisplayButton from '../Components/DisplayButton';
import HeaderSansLogo from '../Components/HeaderSansLogo';
import SmallTitle from '../Components/SmallTitle';
import ButtonNoIcon from '../Components/ButtonNoIcon'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {removePhotoOrdonnance} from '../reducers/user';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function PaymentScreen({navigation}) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = 'Paiement'
                            onPress={() => navigation.goBack()}
            />
            <View style = {styles.content}>
      
            </View>

        </KeyboardAvoidingView>


    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        width:'100%',
    },
    content: {
        flex:4,
        width:'90%',
        alignItems:'center',
        justifyContent: 'center',
    },
});