import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Button, Text } from 'react-native';
import HeaderSansLogo from '../Components/HeaderSansLogo';
import { useSelector } from 'react-redux';
import { useConfirmPayment, CardForm, BillingDetails } from '@stripe/stripe-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const PaymentScreen = ({ navigation }) => {
    const user = useSelector((state) => state.user.value);
    const order = useSelector(state => state.user.value.order);
    const { confirmPayment, loading } = useConfirmPayment();

    const calculateTotal = (order) => {
        let total = 0;
        order.forEach((item) => {
          total += item.quantity * item.medPrice;
        });
        return total.toFixed(2);
      }

    const API_URL = '192.168.1.101:3000'; // Replace this with your backend API URL

  
    const fetchPaymentIntentClientSecret = async () => {
      try {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currency: 'usd',
          }),
        });
        const responseData = await response.json();
    
        if (response.ok) {
          return responseData.clientSecret;
        } else {
          throw new Error(responseData.error);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du clientSecret :', error.message);
        throw error;
      }
    };

    console.log('user',user)


    const handlePayPress = async () => {

        // Gather the customer's billing information (for example, email)
        const billingDetails = {
          email: 'jenny.rosen@example.com',
        };
    
        // Fetch the intent client secret from the backend
        const clientSecret = await fetchPaymentIntentClientSecret();
    
        // Format the card details correctly
        const cardDetails = {
          number: '4242 4242 4242 4242',
          expMonth: 12,
          expYear: 24,
          cvc: '666',
          postalCode: '66666',
        };
    
        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
            card: cardDetails,
          },
        });
    
        if (error) {
          console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
          console.log('Success from promise', paymentIntent);
        }

        const orderData = {
            date: new Date(),
            total: calculateTotal(order), 
            status: 'paid',
            isPaid: true,
            productId: order.map((item) => item.product_id), 
            token: user.token, 
        };
        
        fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then((saveOrderData) => {
            if (saveOrderData.ok) {
                console.log('Order saved:', saveOrderData);
                console.log(user)
                navigation.navigate('ConfirmationCommande'); 
            } else {
                console.error('Error saving order:', saveOrderData.error);
            
            }
            })
    }
  
  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
       <HeaderSansLogo name='Paiement' onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Text style={styles.headerText}>Vous allez effectuer un paiement sécurisé</Text>
          <FontAwesome name='cc-visa' color='#154C79' size={80} style={styles.icon} />
          <View style={styles.cardContainer}>
            <CardForm
              postalCodeEnabled={true}
              initialValues={{
                number: '4242 4242 4242 4242',
                expMonth: 12,
                expYear: 2024,
                cvc: '666',
              }}
              style={{
                width: '100%',
                height: 200,
              }}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log('focusField', focusedField);
              }}
            />
          </View>
          <Button onPress={handlePayPress} title="Payer" disabled={loading} />
        </View>
      </KeyboardAvoidingView>
    );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, 
      },
      headerText: {
        fontSize: 20, 
        marginBottom: 20,
        textAlign: 'center', 
        color: '#154C79'
      },
      icon: {
        marginBottom: 20, 
      },
      cardContainer: {
        width: '100%',
        maxWidth: 400, 
        justifyContent: 'center', 
      },
    });
    
    export default PaymentScreen;
  