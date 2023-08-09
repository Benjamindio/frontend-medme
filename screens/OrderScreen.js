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
import SearchBarList from '../Components/SearchBarList';
import SmallTitle from '../Components/SmallTitle';
import DisplayButton from '../Components/DisplayButton';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function OrderScreen({navigation}) {
    const [suggestionMed, setSuggestionMed] = useState([])
    const treatment = useSelector(state => state.user.value.healthCard.treatment)
    const user = useSelector(state => state.user.value)
    const medName = (treatments) => {
        const allMed = []
        for (let treatment of treatments) {
            allMed.push(...treatment.medicament)
        }
        return allMed
    }
    useEffect(() => {
        console.log(treatment)
        const medNameArray = medName(treatment)
        console.log(medNameArray)
        const medSuggestionArray = []
        for (let meds of medNameArray) {
            console.log(meds)
            fetch(`https://backend-medme.vercel.app/medicaments/suggestion`, {
                method:'POST',
                headers:{'Content-Type': 'application/json'}, 
                body:JSON.stringify({name:meds})
            }).then(response => response.json())
            .then(data => {
                if(data.result){
                    console.log(data.medicament)
                    if(!suggestionMed.find(e => e.name === data.medicament.name)){
                        medSuggestionArray.push(data.medicament)
                    
                    console.log('suggestion',suggestionMed)}
                    
                }
            }).then(() => {
                setSuggestionMed([...suggestionMed, ...medSuggestionArray])
            } )
            
        }
        
        
    },[])
    console.log(suggestionMed)
    const productSuggestion = suggestionMed.map((data,i) => {
        const title = data.name.slice(0,20)
        return (<View key={i} style={styles.medSuggestion}>
                    <Image source={{uri:data.medImage}} style={styles.medImageSuggestion}/>
                    <View style={styles.productInfo}>
                        <Text style={styles.suggestionText}>{title}</Text>
                        <Text style={styles.suggestionText}>{data.price}€</Text>
                        <TouchableOpacity style={styles.addToCartButton} onPress={() => navigation.navigate('InscriptionFicheSante')}>
                            <Text style={styles.addToCartText}>Ajouter au panier</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
    })
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderLogo name = 'Commande'
                        onPress={() => navigation.goBack()}/>
            <View style={styles.content}>
                <SearchBarList 
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
                    <SmallTitle smallTitle ="Vos médicaments" />
                    <View style={styles.suggestion}>
                        {productSuggestion}
                    </View>
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
            alignItems:'center',
            justifyContent:'flex-start',
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
        suggestion:{
            width:'100%',
            height:160,
            flexDirection: 'row',
            justifyContent:'space-evenly',            
        },
        suggestionText: {
            textAlign:'center',
            fontWeight:'light',
            color:'#154C79',
            fontSize:12,
            marginTop:5,
        },
        medSuggestion:{
            justifyContent:'center',
            backgroundColor:'#FFFFFF',
            height: '100%', 
            width:'45%',
            alignItems:'center',
            borderRadius:15,
            marginRight:15,
        },
        medImageSuggestion:{
            height:60,
            width:70
        },
        addToCartButton:{
            height:30,
            width:'90%',
            justifyContent:'center',
            backgroundColor:'#5FA59D',
            borderRadius:8,
            marginTop:5,
  
        },
        addToCartText:{
            color:'white',
            textAlign:'center',
            fontSize:14,
            fontWeight:'light',
        },
        productInfo:{
            height:'40%',
            alignItems:'center',
            justifyContent:'space-between',
            width:'90%',
        }
    });
