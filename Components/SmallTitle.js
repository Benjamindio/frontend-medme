import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function SmallTitle(props) {

    return (
        <View style = {styles.titleBox}>
            <Text style={styles.smallTitle}>{props.smallTitle}</Text>
        </View>
)};

const styles = StyleSheet.create({
    titleBox: {
        width: '100%',
        height: 50,
        borderBottomColor: '#154C79',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingBottom: 10,
        marginTop: 30,
        marginBottom: 30,     
    },
    smallTitle: {
        color: '#154C79',
        fontSize: 30,
        fontWeight: 'light',
    },

});
