    import {
        StyleSheet,
        KeyboardAvoidingView,
        TextInput,
        Image,
        Text,
        View,
        TouchableOpacity,
    } from 'react-native';
    import FontAwesome from 'react-native-vector-icons/FontAwesome5';
    import HeaderLogo from '../Components/HeaderLogo';
    import DisplayButton from '../Components/DisplayButton';
    import { useState } from 'react';
    
    export default function MesCommandes({navigation}) {
    
        
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <HeaderLogo name = 'Commande'
                            onPress={() => navigation.goBack()}/>
                <View style={styles.content}>
                    <View style = {styles.detailContent}>
                        <View style = {styles.titleBox}>
                            <Text style={styles.title}>Mes Commandes</Text>
                        </View>
                        <TouchableOpacity style = {styles.orderContainer} onPress={() => navigation.navigate('DetailCommande')}>
                            <FontAwesome name='truck' color='#5FA59D' size={20}/>
                            <Text style={styles.smallText}>Ma Commande du DATE</Text>
                            <Text style={styles.total}>Total €</Text>
                        </TouchableOpacity>
                    </View>
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'file-medical-alt'
                                    nameIconRight = 'chevron-right' 
                                    text = 'Ma fiche Santé'
                                    // onPress={() => navigation.navigate('ParapharmacieSelectionScreen')}
                                    />
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'address-book' 
                                    nameIconRight = 'chevron-right' 
                                    text = 'Mes Coordonnées'
                                    // onPress={() => navigation.navigate('MedicamentsSelectionScreen')}
                                    />  
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
                justifyContent: 'flex-start',
                alignItems:'center',
                width: '100%',
            },
            detailContent: {
                width: '100%',
                height:'55%',
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
                justifyContent: 'center',
                paddingBottom: 10,
                marginBottom: 20,     
            },
            title: {
                color: '#154C79',
                fontSize: 20,
                fontWeight: 'light',
            },
            orderContainer:{
                width:'100%',
                height:85,
                backgroundColor:'#F5F5F5',
                borderRadius:15,
                flexDirection: 'row',
                justifyContent:'space-evenly',
                alignItems:'center',
            },
            smallText:{
                color:'#afb1b6',
                fontSize:15,
                fontWeight: 'light',
            },
            total:{
                color:'#afb1b6',
                fontSize:15,
                fontWeight: 'bold',
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
    