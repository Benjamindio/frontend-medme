import { useState, useEffect } from 'react';
import HeaderSansLogo from '../Components/HeaderSansLogo';
import Title from '../Components/Title';
import { View, ScrollView, StyleSheet,Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import {Dimensions} from 'react-native';
import * as Location from 'expo-location';
import { Marker,Callout } from 'react-native-maps';
import ButtonNoIcon from '../Components/ButtonNoIcon';


 
  export default function SelectPharmacie({navigation}) {
    const pharmacieLogo = require('../assets/Logo_pharmacie.png')
    const [region, setRegion] = useState({latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,})
    const [currentLocation ,setCurrentLocation] = useState({latitude:0,longitude:0})

    const [city, setCity] = useState('')
      const [pharmacie,setPharmacie] = useState([])
    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          const geocode = await Location.reverseGeocodeAsync(location.coords)
          setCity(geocode[0].city)
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0004,
            longitudeDelta: 0.005,
          });
          setCurrentLocation(location.coords)
          fetch('https://backend-medme.vercel.app/pharmacies/inArea',{
            method:'POST', 
            headers:{'Content-Type': 'application/json'}, 
            body: JSON.stringify({city:geocode[0].city, latitude:location.coords.latitude, longitude:location.coords.longitude})
            })
              .then(response => response.json())
              .then(data => {
                if(data.result) {
                  setPharmacie(data.listOfPharmacie)
                }
               });
          } 
      }       
    )()
    }, [])

 
  const markers = pharmacie.map((data,i) => {
    let isAvailable= <Text style={styles.available}>Disponible</Text>
    if(!data.isAvailable){
      isAvailable = <Text style={styles.notAvailable}>Non Disponible</Text>
    }
      return (
        <Marker 
        key={i}
        coordinate={data.coordinates}
        image={pharmacieLogo}
        anchor={{ x: 0.5, y: 0.5 }}
        >
          <Callout
          tooltip={true} >
            <View style={styles.bubble}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{data.pharmacieName}</Text>
                <Text style={styles.text}>{data.adresse}</Text>
                </View>
                
                  {isAvailable}
               
                <TouchableOpacity style={styles.buttonSelectContainer} activeOpacity={0.8} onPress={() => {}}>
                  <Text style={styles.textButtonSelect}>Sélectionner</Text>
                </TouchableOpacity>
            </View>
        </Callout>
        </Marker>
      )
    })



    
  
    
  
    
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderSansLogo name="Ma pharmacie" onPress={() => navigation.goBack()} />
          <ScrollView style = {styles.scrollview}>
        <View style={styles.content}>
        <View style={styles.introductionContainer}>
          <Title title="Votre choix" style={styles.title} />
          <Text style={styles.paragraphe}>Choisissez une pharmacie près de chez vous pour que notre coursier aille chercher votre commande</Text>
        </View>
        <MapView
            region={region}
            style={styles.mapContainer}
            provider='google'
            >
            <Marker title='Votre position'
        image={require('../assets/position.png')}
        coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} />
            {markers}
      </MapView>
          
        <View style={styles.buttonContainer}><ButtonNoIcon textButton="Commander" /*onPress={() => { }*/  /></View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      width:'100%',
  },
    content: {
      flex:4,
      width:'100%',
      alignItems:'center',
      justifyContent: 'center',
      padding:20,
  },
  scrollview: {
    width:'100%',
},
    introductionContainer:{
      width:'100%',
      alignItems:'center',
      marginBottom:30,
    },
    paragraphe:{
      width:'100%',
      color:'#AFB1B6'
    },
    mapContainer: {
        width: "100%",
        height: Dimensions.get('window').height,

      },
    buttonContainer:{
      justifyContent:'center'
    },
     bubble:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-evenly',
      backgroundColor:'white',
      borderRadius: 8,
      fontSize:15,
      height:200,
      padding:10
     },
     text :{
      textAlign:'center',
      fontWeight: 'bold',
     },
     available:{
      color:"#5FA59D",
      textAlign:'center',
      fontWeight:'bold'
     },
     notAvailable:{
      color: 'red',
      textAlign:'center',
     },
     buttonSelectContainer: {
      flexDirection: 'row',
      width: 200,
      backgroundColor: '#ffffff',
      height: 56,
      borderRadius: 8,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      fontSize: 30,
      shadowColor: '#afb1b6',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 8,
      shadowOffset: {width:0.8, height:10},
 
  },

  textButtonSelect: {
      color: '#5FA59D',
      fontSize: 20,
      fontWeight: 'bold',

  },
  });