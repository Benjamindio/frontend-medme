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
import HeaderSansLogo from '../Components/HeaderSansLogo';
import SmallTitle from '../Components/SmallTitle';
import ButtonNoIcon from '../Components/ButtonNoIcon'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { addToCart } from '../reducers/user';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const moment = require('moment');
import 'moment/locale/fr';


export default function DetailCommande({route, navigation}) {
    const {id} = route.params
    const dispatch = useDispatch();
    const [ order, setOrder] = useState([]);
    const [ date, setDate ] = useState('');
    const [ totalPrice, setTotalPrice ] = useState(0);
    const isFocused = useIsFocused();

    useEffect (() => {
        if (isFocused){
        fetch(`http://192.168.1.101:3000/orders/byId/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data){
                console.log('ok')
                setDate(moment(data.order.date).format('L'))
                setTotalPrice(data.order.total)
                setOrder(data.order.product)
            }else{
                console.log('error no order found ')
            }
        })}
    },[]);

    console.log('result',id)
    // console.log('orderuseeffect',order[0].product_id)

    const orderItems = order.map((data,i)=> {

        return (
            <View key ={i} style = {styles.itemContainer}>
                <Text style = {styles.qty}>x qty</Text>
                <Text style = {styles.medName}>{data.name}</Text>
                <Text style = {styles.medPrice}>{data.price} €</Text>
            </View>
        )
    });

    const handlePress = () => {
        const data = order[0]
        console.log('ordertosend', order[0])
        dispatch(addToCart({product_id: data.product_id, 
                            medName: data.name,
                            quantity:1,
                            medPrice: data.price,
                            medImage: data.image,
                        }))
        navigation.navigate('Commander',{screen:'CheckoutScreen'})
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = "Détail commande"
                            onPress={() => navigation.goBack()}
            />
            <View style = {styles.content}>
                <SmallTitle smallTitle = {`Ma commande du ${date}`}/>
                <View style ={styles.contentOrder}>
                    {orderItems}
                    <Text style = {styles.total}>Total payé: {totalPrice}  €</Text>
                </View>
                <View style = {styles.bottomContent}>
                    <ButtonNoIcon textButton='Commander'onPress={()=>handlePress()}/>
                </View>
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
        width:'100%',
        justifyContent: 'flex-start',
        alignItems:'center',
        padding:20,
        
    },
    contentOrder:{
        width:'100%',
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems:'flex-end',
        padding:20,
    },
    itemContainer: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'space-evenly',
        alignItems:'center',
        height: 80,
        borderBottomColor:'#5FA59D',
        borderBottomWidth:0.5,
        marginBottom: 20,
    },
    qty: {
        color: '#154C79',
    },
    medName:{
        width:'50%',
        color:'#154C79',
    },
    medPrice:{
        color:'#5FA59D',
        fontWeight: 'bold',
    },
    total: {
        color:'#5FA59D',
        fontWeight: 'bold',
    },
    bottomContent:{
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        justifyContent:'space-evenly',
    },
    textUn:{
        color:'#afb1b6',
        fontSize:15,
        padding:20,
    },
    textDeux: {
        color:'#5FA59D',
        fontWeight: 'bold',
        fontSize:15,
    }

});