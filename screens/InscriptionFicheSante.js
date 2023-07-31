import {HeaderSansLogo} from '../Components/HeaderSansLogo'
import {Title} from '../Components/Title'
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
} from 'react-native'


export default function InscriptionFicheSante() {




    return (
        <View>
            <HeaderSansLogo name="Je crée mon profile" />
            <Title title="Ma fiche santé" />
            <View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1, 
        
    }
})