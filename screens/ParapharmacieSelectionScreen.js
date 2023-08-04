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
import ProductDisplay from '../Components/ProductDisplay';
import { useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';


export default function ParapharmacieSelectionScreen({navigation}) {

    const [searchText, setSearchText] = useState('');
    const [showList, setShowList] = useState(true);
    const [errorMessage,setErrorMessage] = useState(false);
    const [isClicked, setIsClicked ] = useState(false);
    const [reset, setReset] = useState(0);
    const [data, setData] = useState ([]);

    useEffect (() => {

        if(searchText.length > 2){
          console.log(searchText.length)
        
            // La recherche s'initie à partir de 2 lettres dans le champs recherche
            fetch('https://backend-medme.vercel.app/medicaments/categorie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: searchText, categorie: 'Parapharmacie'}),
            }).then(response => response.json())
            .then(item => {
                if(item.result){
                    setData(item.medicaments)
                    console.log('data',data)
                    setShowList(true)
                    setErrorMessage(false)
                } else {
                    setShowList(false)
                    setErrorMessage(true)
                    console.log('error medicament non trouvé')
                    }})
            .then(() => {setReset(searchText.length)});
        } else {
            setData([])
        }
    }, [searchText]);

    
    const handleFocusInput = () => {
        setIsClicked(true)
      };
    
    const handleSearchText = (value) => {
        if( searchText.length === 0) {
          setData([])
          console.log('data', data)
        }
        setSearchText(value)
      };
    
    const handleCloseSearch = () => {
        // if (textInputRef.current) {
        //   textInputRef.current.blur();
        // }
        setSearchText('')
        setData([])
        setErrorMessage(false)
        setIsClicked(false);
        setReset(0);
      };
    
    // const textInputRef = useRef(null);

    const searchBarStyle = {
        backgroundColor: isClicked ? 'white' : '#F5F5F5',
        borderColor: isClicked ? '#5FA59D': '#afb1b6',
      }; 
    
    const handlePress = (product_id,medName,medCategorie,medPrice,medImage) => {
        navigation.navigate('FicheProduit', {
          product_id:product_id,
          medName,
          medCategorie,
          medPrice,
          medImage
        })
    }
      

    const searchResult = data.map((data,i) => {
        if (showList) {
        return(
            <View style ={styles.resultContainer}>
                <ProductDisplay onPress={()=> handlePress(data.product_id,data.medName,data.medCategorie,data.medPrice,data.medImage)}
                                src = {{uri:(data.medImage)}} 
                                text = {data.medName}
                                price = {data.medPrice}
                                nameIconRight = 'shopping-cart'
                                styleIconRight = {styles.iconRight}
                                stylePrice = {styles.price}
                                styleTextDisplayButton = {styles.styleTextDisplayButton}
                                image = {styles.image}
                                id = {data.product_id}
                                key={i}
                ></ProductDisplay>
            </View>)}
                
        })

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = 'Parapharmacie'
                            onPress={() => navigation.navigate('TabNavigator', {sreen: 'Orders'})}
            />
            <View style={styles.content}>
                <SearchBar  styleSearchBar = {[styles.searchBarUnclicked, searchBarStyle]}        
                            // ref={textInputRef}
                            onChangeText={(value) => handleSearchText(value)}
                            value={searchText}
                            onPress={() => handleCloseSearch()}
                            onFocus={() => handleFocusInput()}
                            condition = {isClicked}
                            />
                <SmallTitle smallTitle = 'Vos résultats'/>
                {errorMessage && <Text style= {styles.errorMessage}>Aucun résultat</Text>}
                {searchResult}
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
            padding: 10,
            alignItems:'center',
            width: '90%',
        },

        resultContainer: {
            justifyContent: 'space-evenly'
        },
        text:{
            color: '#154C79',
            fontSize: 20,
            fontWeight: 'light',
        },
        searchBarUnclicked:{
            padding: 10,
            flexDirection: "row",
            width: "100%",
            borderRadius: 15,
            justifyContent:'center',
            alignItems: "center",
            borderWidth: 1,
            opacity: 0.8,
          },
          label: {
            height: 30,
            justifyContent: 'center',
          },
          errorMessage: {
            fontSize:15,
            color:'#154C79',
            marginTop:20,
          },
          iconRight: {
            color:'#5FA59D',
          },
          styleTextDisplayButton:{
            color:'#154C79',
            width: '35%',
          },
          price: {
            color: '#154C79',
            fontSize: 13
          },
          image: {
            resizeMode:'contain',
            width: 100,
            height: 50,
          }        
    });