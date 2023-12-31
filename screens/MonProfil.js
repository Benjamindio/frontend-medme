import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import HeaderLogo from '../Components/HeaderLogo';
import DisplayButton from '../Components/DisplayButton';
import { useState } from 'react';
import InputSansTitle from '../Components/InputSansTitle';
import Title from '../Components/Title';
import ButtonNoIcon from '../Components/ButtonNoIcon';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';



export default function MonProfil({navigation}) {
    const [showMore, setShowMore] = useState(false);
    const handleToggleShowMore = () => {
        setShowMore(!showMore);
      };
    const [isContent, setIsContent] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]= useState('');
    const [email, setEmail] = useState('');
    const [adresse,setAdresse] = useState('');
    const [telephone,setTelephone]= useState('');
    const [age, setAge]= useState('');
    const [size,setSize]= useState('');
    const [weight,setWeight]= useState('');
    const [bloodGroup,setBloodGroup]= useState('');
    const [treatment,setTreatment]= useState('');
    const [allergies,setAllergies]= useState('');
    const [hasHealthCard, setHasHealthCard] = useState(false)
    const user = useSelector(state => state.user.value)
    let contentSection;
    const isFocused = useIsFocused()

    const InfoCard = ({ iconName, text, value }) => {
        return (
          <View style={styles.infoCard}>
            <View style={styles.infoContainer}>
              <FontAwesome name={iconName} color="#5FA59D" size={20} style={styles.icon} />
              <Text style={styles.infoText}>
                {text}: {value}
              </Text>
            </View>
          </View>
        );
      };


    handleClickRegister = () => {
        
        fetch('https://backend-medme.vercel.app/users/updateUserInfo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({phoneNumber:telephone, lastname:lastName, firstname: firstName, email , adress:adresse}),
    }).then(response => response.json())
        .then(data => {
            
            if(data.result){
                setIsContent(!isContent)

            } else {
                console.log('error')
            }
        })
    
    }

    const calculateAge = (dateOfBirth) => {
        const yearsFromNow = moment(dateOfBirth,'YYYYMMDD').fromNow()
        const age = yearsFromNow.match(/\d+/)

        return age
    }
    const medName = (treatments) => {
        const allMed = []
        for (let treatment of treatments) {
            allMed.push(treatment.medicament)
        }
        return allMed.join(', ')
    }
    const allergieFormat =(allergies) => {
        return allergies.join(', ')
    }

    

    useEffect(() => {
        setHasHealthCard(user.hasHealthCard)
        setFirstName(user.firstName)
        setLastName(user.lastname)
        setEmail(user.email)
        setTelephone(user.phoneNumber)
        setAdresse(user.adresse)
        setSize(user.healthCard.size)
        setWeight(user.healthCard.weight)
        setAge(calculateAge(user.healthCard.dateOfBirth))
        setTreatment(medName(user.healthCard.treatment))
        setAllergies(allergieFormat(user.healthCard.allergies))
        setBloodGroup(user.healthCard.bloodGroup)
    },[isFocused])
    


    if (!isContent && hasHealthCard) {
        contentSection = (
            <View style={styles.contentContainer}>
                <HeaderLogo 
                            onPress={() => navigation.goBack()}/>
                <View style={styles.content}>
                    <View style = {styles.detailContent}>
                        <View style = {styles.titleBox}>
                            <Text style={styles.title}>Ma fiche santé</Text>
                        </View>
                            <View style={styles.infoContainer}>
                                <InfoCard styleTextDisplayButton={styles.text} iconName="calendar-alt" text="Âge" value={`${age} ans`} />
                                <InfoCard styleTextDisplayButton={styles.text} iconName="ruler" text="Taille" value={`${size} cm`} />
                            </View>
                            <View style={styles.infoContainer}>
                                <InfoCard styleTextDisplayButton={styles.text} iconName="weight" text="Poids" value={`${weight} kg`} />
                                <InfoCard styleTextDisplayButton={styles.text} iconName="tint" text="Groupe sanguin" value={bloodGroup} />
                            </View>
                            {showMore && (
                                <>
                                    <InfoCard styleTextDisplayButton={styles.text} iconName="pills" text="Traitement" value={treatment} />
                                    <InfoCard styleTextDisplayButton={styles.text} iconName="allergies" text="Allergie" value={allergies} />
                                </>
                            )}
                             {!showMore && (
                                <TouchableOpacity style={styles.showMoreButton} onPress={handleToggleShowMore}>
                                    <Text style={styles.showMoreButtonText}>Voir plus</Text>
                                    <FontAwesome name="chevron-down" size={20} color='#154C79' />
                                </TouchableOpacity>
                            )}
                            {showMore && (
                                <View style={styles.showLessSection}> 
                                    <TouchableOpacity style={styles.editerButton} onPress={() => navigation.navigate('InscriptionFicheSante')}>
                                        <Text style={styles.editerButtonText}>Editer
                                            </Text>
                                    </TouchableOpacity>
                                <TouchableOpacity style={styles.showMoreButton} onPress={handleToggleShowMore}>
                                    <Text style={styles.showMoreButtonText}>Voir moins</Text>
                                    <FontAwesome name="chevron-up" size={20} color='#154C79' />
                                </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'truck'
                                    nameIconRight = 'chevron-right' 
                                    text = 'Mes Commandes'
                                    onPress={() => {navigation.navigate('Commandes')}}
                                    />
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'address-book' 
                                    nameIconRight = 'chevron-right' 
                                    text = 'Mes Coordonnées'
                                     onPress={() =>setIsContent(!isContent) }
                                    />
                </View>
            </View>
        )
    } else if (!isContent && !hasHealthCard) {
        contentSection = (
            <View style={styles.contentContainer}>
                <HeaderLogo 
                            onPress={() => navigation.goBack()}/>
                <View style={styles.content}>
                    <View style = {styles.detailContent}>
                        <View style = {styles.titleBox}>
                            <Text style={styles.title}>Ma fiche santé</Text>
                        </View>
                            <View style={styles.infoContainer}>
                                <DisplayButton 
                                    styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight}
                                    nameIconLeft='plus-square' 
                                    nameIconRight = 'chevron-right'
                                    text = 'Créer une fiche santé'
                                    onPress={() => navigation.navigate('InscriptionFicheSante')} />
                            </View>
                            
                        </View>
                    
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'truck'
                                    nameIconRight = 'chevron-right' 
                                    text = 'Mes Commandes'
                                     onPress={() => {navigation.navigate('Commandes')}}
                                    />
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'address-book' 
                                    nameIconRight = 'chevron-right' 
                                    text = 'Mes Coordonnées'
                                     onPress={() =>setIsContent(!isContent) }
                                    />
                </View>
            </View>
        )
    }
    else {
        
        contentSection = (
            <View style={styles.containerMesCoordonnees}>
       <View style={styles.headerMesCoordonnees}>
            <HeaderLogo onPress={() => setIsContent(!isContent)} />
          </View>
          <View style={styles.titleMesCoordonnees}>
            <Title title='Mes coordonnées'/>
          </View>
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
            <View style={styles.contentMesCoordonnees}>
            
                <View style={styles.largeInputContainer}><InputSansTitle title="Nom :" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'default'
                                                                onChangeText={(value) => setLastName(value)}
                                                                value = {lastName}
                                                                text ={lastName}/></View>
                <View style={styles.largeInputContainer}><InputSansTitle title="Prénom :" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'default'
                                                                onChangeText={(value) => setFirstName(value)}
                                                                value = {firstName}
                                                                text ={firstName}/></View>
                <View style={styles.largeInputContainer}><InputSansTitle title="Email :" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'email-address'
                                                                onChangeText={(value) => setEmail(value)}
                                                                value = {email}
                                                                text ={email}/></View>
                <View style={styles.largeInputContainer}><InputSansTitle title="Adresse :" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'default'
                                                                onChangeText={(value) => setAdresse(value)}
                                                                value = {adresse}
                                                                text ={adresse}/></View>
                <View style={styles.largeInputContainer}><InputSansTitle title="Téléponne :" 
                                                                underlineWidth={"20%"}
                                                                cursorColor = '#154C79'
                                                                keyboardType = 'numeric'
                                                                onChangeText={(value) => setTelephone(value)}
                                                                value = {telephone}
                                                                text ={telephone}/></View>
                
                 <ButtonNoIcon textButton= 'Modifier'
                    onPress={() => handleClickRegister()}/>
            </View>
           
        </KeyboardAvoidingView>
        </View>
        )
    }



    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {contentSection}
            </KeyboardAvoidingView>
    )};



    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#F5F5F5',
            
        },
        contentContainer:{
            flex:1,
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
            fontSize: 16,
            fontWeight: 'light',
        },
        infoCard: {
            borderWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            marginBottom: 10,
            padding: 10,
          },
          infoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 7,
          },
          icon: {
            marginRight: 10,
          },
          infoText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'light',
          },
          showMoreContainer: {
            position: 'absolute',
            bottom: 50,
            left: '50%',
            transform: [{ translateX: -50 }],
            backgroundColor: 'white',
            borderRadius: 5,
            paddingVertical: 8,
            paddingHorizontal: 16,
            elevation: 10,
          },
          showMoreButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
          showLessSection:{
            height:'10%',
            width:'30%',
            
            alignItems:'center'
          },
          editerButton:{
            width:'100%',
            height:'50%',
            borderRadius: 5,
            backgroundColor:'#154C79',
            marginBottom:10
          },
          editerButtonText:{
            color:'white',
            textAlign:'center',

          },
          showMoreButtonText: {
            color: '#5FA59D',
            fontSize: 16,
            marginRight: 5,
          },
            iconLeft: {
                color:'#5FA59D',
            },
            iconRight:{
                color:'#afb1b6',
            },
            containerMesCoordonnees: {
                flex:2,
                backgroundColor: '#F5F5F5',
                //justifyContent: 'center',
                alignItems: 'center',
    
            },
            headerMesCoordonnees:{
            flex:0.25,
            width:'100%'
            },
            titleMesCoordonnees:{
            flex:0.1,
            width:'80%'
            },
            keyboardAvoidingView:{
                flex:0.8,
                
                justifyContent: 'space-between',
            },
            contentMesCoordonnees:{
                height:'100%',
                width:'100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                
            },
            largeInputContainer:{
                width:'80%',
                alignContent:'center'
                },
            
        
    });
