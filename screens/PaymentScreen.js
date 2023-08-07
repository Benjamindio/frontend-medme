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

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function PaymentScreen({navigation}) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo name = 'Paiement'
                            onPress={() => navigation.goBack()}
            />
            <View style = {styles.content}>
      
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
});


// import React from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Button, Text } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import { useDispatch, useSelector } from 'react-redux';
// import { useConfirmPayment, CardForm, BillingDetails } from '@stripe/stripe-react-native';
// import HeaderSansLogo from '../Components/HeaderSansLogo';

// const PaymentScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value);
//   const { confirmPayment, loading } = useConfirmPayment();

//   const API_URL = 'http://192.168.1.24:3000'; // Replace this with your backend API URL

//   const fetchPaymentIntentClientSecret = async () => {
//     try {
//       const response = await fetch(`${API_URL}/create-payment-intent`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           currency: 'usd',
//         }),
//       });
//       const responseData = await response.json();
  
//       if (response.ok) {
//         return responseData.clientSecret;
//       } else {
//         throw new Error(responseData.error);
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération du clientSecret :', error.message);
//       throw error;
//     }
//   };

//  const handlePayPress = async () => {
//   // Gather the customer's billing information (for example, email)
//   const billingDetails = {
//     email: 'jenny.rosen@example.com',
//   };

//   // Fetch the intent client secret from the backend
//   const clientSecret = await fetchPaymentIntentClientSecret();

//   // Format the card details correctly
//   const cardDetails = {
//     number: '4242 4242 4242 4242',
//     expMonth: 12,
//     expYear: 24,
//     cvc: '666',
//     postalCode: '66666',
//   };

//   // Confirm the payment with the card details
//   const { paymentIntent, error } = await confirmPayment(clientSecret, {
//     paymentMethodType: 'Card',
//     paymentMethodData: {
//       billingDetails,
//       card: cardDetails,
//     },
//   });

//   if (error) {
//     console.log('Payment confirmation error', error);
//   } else if (paymentIntent) {
//     console.log('Success from promise', paymentIntent);
//   }
// };

// return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//      <HeaderSansLogo name='Paiement' onPress={() => navigation.goBack()} />
//       <View style={styles.content}>
//         <Text style={styles.headerText}>Vous allez effectuer un paiement sécurisé</Text>
//         <FontAwesome name='cc-visa' color='#154C79' size={80} style={styles.icon} />
//         <View style={styles.cardContainer}>
//           <CardForm
//             postalCodeEnabled={true}
//             initialValues={{
//               number: '4242 4242 4242 4242',
//               expMonth: 12,
//               expYear: 2024,
//               cvc: '666',
//             }}
//             style={{
//               width: '100%',
//               height: 200,
//             }}
//             onCardChange={(cardDetails) => {
//               console.log('cardDetails', cardDetails);
//             }}
//             onFocus={(focusedField) => {
//               console.log('focusField', focusedField);
//             }}
//           />
//         </View>
//         <Button onPress={handlePayPress} title="Payer" disabled={loading} />
// ... (36 lignes restantes)
// Réduire
// message.txt
// 5 Ko
// ﻿
// Quentinos
// _xhizox
// import React from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Button, Text } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import { useDispatch, useSelector } from 'react-redux';
// import { useConfirmPayment, CardForm, BillingDetails } from '@stripe/stripe-react-native';
// import HeaderSansLogo from '../Components/HeaderSansLogo';

// const PaymentScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value);
//   const { confirmPayment, loading } = useConfirmPayment();

//   const API_URL = 'http://192.168.1.24:3000'; // Replace this with your backend API URL

//   const fetchPaymentIntentClientSecret = async () => {
//     try {
//       const response = await fetch(`${API_URL}/create-payment-intent`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           currency: 'usd',
//         }),
//       });
//       const responseData = await response.json();
  
//       if (response.ok) {
//         return responseData.clientSecret;
//       } else {
//         throw new Error(responseData.error);
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération du clientSecret :', error.message);
//       throw error;
//     }
//   };

//  const handlePayPress = async () => {
//   // Gather the customer's billing information (for example, email)
//   const billingDetails = {
//     email: 'jenny.rosen@example.com',
//   };

//   // Fetch the intent client secret from the backend
//   const clientSecret = await fetchPaymentIntentClientSecret();

//   // Format the card details correctly
//   const cardDetails = {
//     number: '4242 4242 4242 4242',
//     expMonth: 12,
//     expYear: 24,
//     cvc: '666',
//     postalCode: '66666',
//   };

//   // Confirm the payment with the card details
//   const { paymentIntent, error } = await confirmPayment(clientSecret, {
//     paymentMethodType: 'Card',
//     paymentMethodData: {
//       billingDetails,
//       card: cardDetails,
//     },
//   });

//   if (error) {
//     console.log('Payment confirmation error', error);
//   } else if (paymentIntent) {
//     console.log('Success from promise', paymentIntent);
//   }
// };

// return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//      <HeaderSansLogo name='Paiement' onPress={() => navigation.goBack()} />
//       <View style={styles.content}>
//         <Text style={styles.headerText}>Vous allez effectuer un paiement sécurisé</Text>
//         <FontAwesome name='cc-visa' color='#154C79' size={80} style={styles.icon} />
//         <View style={styles.cardContainer}>
//           <CardForm
//             postalCodeEnabled={true}
//             initialValues={{
//               number: '4242 4242 4242 4242',
//               expMonth: 12,
//               expYear: 2024,
//               cvc: '666',
//             }}
//             style={{
//               width: '100%',
//               height: 200,
//             }}
//             onCardChange={(cardDetails) => {
//               console.log('cardDetails', cardDetails);
//             }}
//             onFocus={(focusedField) => {
//               console.log('focusField', focusedField);
//             }}
//           />
//         </View>
//         <Button onPress={handlePayPress} title="Payer" disabled={loading} />
//       </View>
//     </KeyboardAvoidingView>
//   );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F5F5F5',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     content: {
//       flex: 1,
//       width: '100%',
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingHorizontal: 20, 
//     },
//     headerText: {
//       fontSize: 20, 
//       marginBottom: 20,
//       textAlign: 'center', 
//       color: '#154C79'
//     },
//     icon: {
//       marginBottom: 20, 
//     },
//     cardContainer: {
//       width: '100%',
//       maxWidth: 400, 
//       justifyContent: 'center', 
//     },
//   });
  
