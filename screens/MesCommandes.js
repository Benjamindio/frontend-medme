    import {
        StyleSheet,
        KeyboardAvoidingView,
        ScrollView,
        Text,
        View,
        TouchableOpacity,
    } from 'react-native';
    import FontAwesome from 'react-native-vector-icons/FontAwesome5';
    import HeaderLogo from '../Components/HeaderLogo';
    import DisplayButton from '../Components/DisplayButton';
    import { useNavigation } from '@react-navigation/native'
    import { useState } from 'react';
    import { useEffect } from 'react';
    import { useSelector } from 'react-redux'; 
    import { useIsFocused } from '@react-navigation/native';

    const moment = require('moment');
    import 'moment/locale/fr';

    export default function MesCommandes() {
        const navigation = useNavigation()
        const isFocused = useIsFocused();
        const user = useSelector((state) => state.user.value);
        const [ orderList, setOrderList] = useState([])
        const token = user.isConnected
    
        console.log(isFocused)

        useEffect (() => {
            if (isFocused){

            fetch(`http://192.168.1.101:3000/users/getUserOrders/${token}`)
            .then(response => response.json())
            .then(data => {
                if (data){
                    console.log('orderdata', data.orders)
                    setOrderList(data.orders)
                }else{
                    console.log('error')
                }
            })}
        },[isFocused]);

        console.log('list',orderList)

        const handlePress = (orderId) => {
            console.log(orderId)
            navigation.navigate('DetailCommande',{id: orderId})
        };

        const commandes = orderList.map((data,i) => {
            let date = moment(data.date).format('L')
            return (   <TouchableOpacity key={i} style = {styles.orderContainer} onPress={() => handlePress(data._id)}>
                            <FontAwesome name='truck' color='#5FA59D' size={20}/>
                            <Text style={styles.smallText}>Commande du {date}</Text>
                            <Text style={styles.total}>{data.total} €</Text>
                        </TouchableOpacity>
            )
        });
                
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <HeaderLogo name = 'Commande'
                            onPress={() => navigation.goBack()}/>
                <View style={styles.content}>
                    <View style = {styles.detailContent}>
                        <View style = {styles.titleBox}>
                            <Text style={styles.title}>Mes Commandes</Text>
                        </View>
                        <ScrollView style={styles.scrollview}>
                            {commandes}
                        </ScrollView>
                    </View>
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'file-medical-alt'
                                    nameIconRight = 'chevron-right' 
                                    text = 'Ma fiche santé'
                                    // onPress={() => navigation.navigate('ParapharmacieSelectionScreen')}
                                    />
                    <DisplayButton  styleTextDisplayButton = {styles.text} 
                                    styleIconLeft = {styles.iconLeft} 
                                    styleIconRight = {styles.iconRight} 
                                    nameIconLeft = 'address-book' 
                                    nameIconRight = 'chevron-right' 
                                    text = 'Mes coordonnées'
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
            scrollview: {
                width:'100%',
            },
            detailContent: {
                width: '100%',
                height:'60%',
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
                marginBottom:20,
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
    