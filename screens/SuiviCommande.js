import React, { useState } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Button,
} from 'react-native';
import HeaderSansLogo from '../Components/HeaderSansLogo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('window').height;

export default function SuiviCommande({ navigation }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [rating, setRating] = useState(0); 
    const [showRating, setShowRating] = useState(true); 

    const steps = [
        "Commande en attente de préparation",
        "Commande en préparation",
        "En cours de livraison",
        "Commande Livrée"
    ];

    
    const handleRating = (selectedRating) => {
        setRating(selectedRating);
        setShowRating(false); 
    };

    
    const handleShowRating = () => {
        navigation.navigate('Accueil')
        
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <HeaderSansLogo
                name='Suivi'
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <View style={styles.stepsContainer}>
                    {steps.map((stepText, index) => (
                        <View key={index} style={[
                                styles.stepItem,
                                index === currentStep && styles.currentStepItem
                            ]} >
                            <Text style={[
                                    styles.stepText,
                                    index === currentStep && styles.currentStepText
                                ]} >
                                     {stepText}
                            </Text>
                        </View>
                    ))}

                     {showRating ? (
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>Notez votre expérience</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleRating(star)}
                                >
                                    <FontAwesome
                                        name={star <= rating ? 'star' : 'star-o'}
                                        size={40}
                                        color={star <= rating ? "#5FA59D" : "#5FA59D"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.returnContainer}>
                        <Text>Votre note a été enregistrée !</Text>
                        <Button title="Retour à l'accueil" onPress={handleShowRating} color="#5FA59D"/>
                    </View>
                )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepsContainer: {
        width: '90%',
        height: windowHeight * 0.65,
        borderWidth: 1,
        borderColor: "#5FA59D",
        borderRadius: 1,
        alignItems: 'center',
    },
    stepItem: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    currentStepItem: {
        backgroundColor: "#5FA59D",
    },
    stepText: {
        textAlign: 'center',
        color: '#154C79',
        fontSize: 18,
        lineHeight: 50,
    },
    currentStepText: {
        color: 'white',
        fontWeight: 'bold',
    },
    ratingContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 25,
        color: "#5FA59D",
        fontWeight: 'bold',
        marginBottom: 15,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    returnContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
