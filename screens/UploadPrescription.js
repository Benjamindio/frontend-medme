import {
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import DisplayButton from '../Components/DisplayButton';
import HeaderSansLogo from '../Components/HeaderSansLogo'

export default function UploadPrescription({navigation}) {

    const handleOpenCamera = () => {
        navigation.navigate('SnapScreen')
    };



    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = 'Votre ordonnance'
                            onPress={() => navigation.goBack()}
            />
            <View style = {styles.content}>
                <View style={styles.textBox}>
                <Text style = {styles.textUn}>Le produit que vous avez sélectionné necessite une ordonnance.
                Veuillez importer votre ordonnance pour pouvoir procéder à la commande.</Text>
                </View>
                <DisplayButton  onPress={()=> handleOnPress()}
                                nameIconLeft='file'
                                nameIconRight='chevron-right'
                                text='Importer votre fichier'
                                styleIconLeft={styles.iconLeft}
                                styleIconRight={styles.iconRight}
                                styleTextDisplayButton = {styles.textButton}

                />
                <DisplayButton  onPress={()=> handleOpenCamera()}
                                nameIconLeft='camera'
                                nameIconRight='chevron-right'
                                text='Prendre une Photo'
                                styleIconLeft={styles.iconLeft}
                                styleIconRight={styles.iconRight}
                                styleTextDisplayButton = {styles.textButton}

                />

            </View>

        </KeyboardAvoidingView>


    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
    },
    content: {
        flex:4,
        width:'90%',
        alignItems:'center',
    },
    textBox:{
        marginTop:30,
        marginBottom: 30,

    },
    textButton:{
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
    textUn:{
        color: '#154C79',
        fontSize: 15,
        fontWeight: 'light',
    },
});