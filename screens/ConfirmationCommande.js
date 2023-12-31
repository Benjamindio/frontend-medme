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
import { useNavigation } from '@react-navigation/native'
import { emptyCart } from '../reducers/user';


import FontAwesome from 'react-native-vector-icons/FontAwesome5';


export default function ConfirmationCommande() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const order = useSelector((state) => state.user.value.order);
    const totalPrice = order.reduce((total, item) => total + item.quantity * item.medPrice, 0).toFixed(2);

    const orderItems = order.map((data,i)=> {
        return (
            <View key ={i} style = {styles.itemContainer}>
                <Text style = {styles.qty}>x {data.quantity}</Text>
                <Text style = {styles.medName}>{data.medName}</Text>
                <Text style = {styles.medPrice}>{data.medPrice} €</Text>
            </View>
        )
    });

    const handlePress = () => {
        dispatch(emptyCart(order))
        console.log(order)
        navigation.navigate('SuiviCommande')
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = "Commande validée"
                            onPress={() => navigation.goBack()}
            />
            <View style = {styles.content}>
                <SmallTitle smallTitle = 'Merci pour votre commande !'/>
                <View style ={styles.contentOrder}>
                {orderItems}
                <Text style = {styles.total}>Total payé: {totalPrice} €</Text>
                </View>
                <View style = {styles.bottomContent}>
                    <FontAwesome name='road' size={40} style = {styles.icon} />
                    <Text style = {styles.textSuivi}>Cliquer sur continuer pour voir le suivi de votre commande.</Text>
                </View>
                <ButtonNoIcon textButton = 'Continuer' onPress={()=> handlePress()}/>    
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
        flexDirection: 'row',
    },
    textSuivi: {
        width: '100%',
        alignItems:'center',
        color: '#154C79',
        textAlign: 'center',

    },
    icon:{
        color:'#5FA59D',
    },

});