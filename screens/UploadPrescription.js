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
import { useNavigation } from '@react-navigation/native'


import FontAwesome from 'react-native-vector-icons/FontAwesome5';


export default function UploadPrescription() {

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [selectedPhoto, setSelectedPhoto] = useState(user.photoOrdonnance);
    const [errorMessage,setErrorMessage] = useState(false);

    console.log(selectedPhoto.length)
    const length = user.photoOrdonnance.length;
    console.log(length)

    const togglePhotoSelection = (photoUri) => {
        console.log('click')
        if (selectedPhoto.includes(photoUri)) {
          setSelectedPhoto(selectedPhoto.filter(uri => uri !== photoUri)); // Désélectionne l'image
        } else {
          setSelectedPhoto([...selectedPhoto, photoUri]); // Sélectionne l'image
          setErrorMessage(false);
        }
      };
    
    const handleOpenCamera = () => {
        navigation.navigate('SnapScreen')
    };

    handleRegister = () => {
        console.log('click register')
        if (selectedPhoto.length>0){
            setErrorMessage(false)
            // navigation.navigate('ChoosePharmacie');
            navigation.navigate('ConfirmationCommande');// changer quand screen payment et screen pharmacie prets
        } else {
            setErrorMessage(true)
        }
    };
    
    let ordonnanceCounter;
    if (length <= 1) {
        ordonnanceCounter = <Text style={styles.textUn}>{length} ordonnance importée</Text>
    } else {
        ordonnanceCounter = <Text style={styles.textUn}>{length} ordonnances importées</Text>
    };
  

    const photos = user.photoOrdonnance.map((data,i)=> {
        if (user.photoOrdonnance.length>0){
            return (
                <View key={i} style={styles.photoContainer}>
                <View style = {styles.iconSection}>
                    <TouchableOpacity onPress={() => togglePhotoSelection(data)}>
                        <FontAwesome name='check-circle' size={20}  style = {[styles.deleteIcon, , selectedPhoto.includes(data) && styles.selectedIcon]} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => dispatch(removePhotoOrdonnance(data))}>
                        <FontAwesome name='times' size={20} style = {styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
                  <Image source={{ uri: data }} style={styles.photo} />
                </View>
              );
        } else {
            return (
                <Text style = {styles.text}>Vous n'avez pas encore importé d'ordonnances</Text>
            )
        }
    });

    handleRegister = () => {
        navigation.navigate('ChoosePharmacie')
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = 'Votre ordonnance'
                            onPress={() => navigation.goBack()}
            />
            <View style = {styles.content}>
            <ScrollView style = {styles.scrollview}>
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
            <SmallTitle smallTitle = 'Mes ordonnances enregistrées'/>
            {ordonnanceCounter}
                <View style={styles.galleryContainer}>
                {photos}
                </View>
            </ScrollView>
            {errorMessage && <Text style= {styles.errorMessage}>Aucune ordonnance importée</Text>}
            <ButtonNoIcon   textButton = 'Enregistrer'
                            onPress={() => handleRegister ()}/>
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
    scrollview: {
        width:'100%',
    },

    textBox:{
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
        color: '#afb1b6',
        fontSize: 15,
        fontWeight: 'light',
    },
    deleteIcon: {
        marginRight: 10,
        marginLeft:10,
        color: '#afb1b6',
    },
    photo: {
        margin: 10,
        width: 110,
        height: 150,
    },
    iconSection: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedIcon:{
        color: '#5FA59D',
    },

    photoContainer: {
        width:'40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#afb1b6',
        borderWidth:1,
        borderRadius: 8,
        padding:5,
        margin:10,
    },

    galleryContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textSelection: {

    },
    button: {
        marginTop:30,
    },
    errorMessage: {
        fontSize:15,
        color:'#154C79',
        marginTop:20,
      },

});