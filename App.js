import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills,faBookMedical, faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import user from './reducers/user';

import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import LoginScreen from './screens/LoginScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import MyordersScreen from './screens/MyordersScreen';
import InscriptionProfil from './screens/InscriptionProfil';
import InscriptionFicheSante from './screens/InscriptionFicheSante';
import MedicamentsSelectionScreen from './screens/MedicamentsSelectionScreen';
import ParapharmacieSelectionScreen from './screens/ParapharmacieSelectionScreen';
import FicheProduit from './screens/FicheProduit';
import InscriptionAllergie from './screens/InscriptionAllergie'
import InscriptionTraitement from './screens/InscriptionTraitement';
import UploadPrescription from './screens/UploadPrescription';
import SnapScreen from './screens/SnapScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmationCommande from './screens/ConfirmationCommande';
import ChoosePharmacie from './screens/ChoosePharmacie';
import SuiviCommande from './screens/SuiviCommande';


import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: {user},
})

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'home';
        } 
        else if ( route.name === 'Order') {
          iconName = 'pills';
        }
         else if ( route.name === 'Profile') {
          iconName = 'user-alt';
        } else if ( route.name === 'Checkout') {
          iconName = 'shopping-cart';
        }
        else if ( route.name === 'Myorders') {
          iconName = 'book-medical';
        }
          return <FontAwesome name={iconName} size={size} color={color} />
        ;
      },
      tabBarActiveTintColor: '#154C79',
      tabBarInactiveTintColor: '#afb1b6',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Checkout" component={CheckoutScreen} />
      <Tab.Screen name="Profile" component={OrderScreen} />
      <Tab.Screen name="Myorders" component={MyordersScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name = 'InscriptionProfil' component ={InscriptionProfil} />
        <Stack.Screen name = 'InscriptionFicheSante' component ={InscriptionFicheSante} />
        <Stack.Screen name = 'InscriptionAllergie' component ={InscriptionAllergie} />
        <Stack.Screen name = 'InscriptionTraitement' component ={InscriptionTraitement} />
        <Stack.Screen name = 'MedicamentsSelectionScreen' component ={MedicamentsSelectionScreen} />
        <Stack.Screen name = 'OrderScreen' component={OrderScreen}/>
        <Stack.Screen name = 'ParapharmacieSelectionScreen'component ={ParapharmacieSelectionScreen} />
        <Stack.Screen name = 'FicheProduit'component ={FicheProduit} />
        <Stack.Screen name = 'CheckoutScreen'component ={CheckoutScreen} />
        <Stack.Screen name = 'ChoosePharmacie'component ={ChoosePharmacie} />
        <Stack.Screen name = 'UploadPrescription'component ={UploadPrescription} />
        <Stack.Screen name = 'SnapScreen'component = {SnapScreen} />
        <Stack.Screen name = 'PaymentScreen'component = {PaymentScreen} />
        <Stack.Screen name = 'ConfirmationCommande'component = {ConfirmationCommande} />
        <Stack.Screen name = 'SuiviCommande' component ={SuiviCommande}/>
        <Stack.Screen name= 'TabNavigator' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

