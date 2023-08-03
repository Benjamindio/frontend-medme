import { useState, useEffect } from 'react';
import HeaderSansLogo from './components/HeaderSansLogo';
import Title from './components/Title';
import ButtonNoIcon from './components/ButtonNoIcon';
import { View, StyleSheet,Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps'
import {Dimensions} from 'react-native'
import * as Location from 'expo-location'
import { Marker } from 'react-native-maps';

 
  export default function SelectPharmacie({navigation}) {

  const [region, setRegion] = useState({latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,})
  const [currentLocation ,setCurrentLocation] = useState({latitude:0,longitude:0})
 useEffect(() => {
   (async () => {
     const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
      console.error('Permission to access location was denied.');
      return;
    }
  
       let location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0004,
      longitudeDelta: 0.005,
    });
    setCurrentLocation({latitude:location.coords.latitude, longitude:location.coords.longitude})
   console.log(location);
     
   })();
 }, [])




    
  
    
  
    
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <HeaderSansLogo name="Ma fiche santé" onPress={() => handlePress()} />
        </View>
        <View style={styles.introductionContainer}>
          <View style={styles.titleContainer}><Title title="Votre choix" style={styles.title} /></View>
          <Text style={styles.paragraphe}>Choisissez une pharmacie près de chez vous pour que notre coursier aille chercher votre commande</Text>
        </View>
        <MapView
            region={region}
            style={styles.mapContainer}
            >
            <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} />
      </MapView>
          
        <View style={styles.buttonContainer}><ButtonNoIcon textButton="Commander" /*onPress={() => { }*/  /></View>
      </KeyboardAvoidingView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      width: "100%"
    },
    header: {
      width: '100%',
      flex: 0.1
    },
    titleContainer: {
      width: "90%",
    },
    introductionContainer:{
      flex: 0.1,
      width:'90%',
      alignItems:'center',
    },
    paragraphe:{
      width:'90%',
      color:'#AFB1B6'
    },
    mapContainer: {
        flex: 0.5,
        width: "90%",
        height: Dimensions.get('window').height,

      },
    buttonContainer:{
      flex:0.2,
      justifyContent:'center'
    }
     
  });