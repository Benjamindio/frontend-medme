import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HeaderLogo from './screens/HearLogo'
import HeaderSansLogo from './screens/HeaderSansLogo';

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderLogo style={styles.header}/>
      {/*<HeaderSansLogo style={styles.header} name='Test'/>*/}
      <Text style={styles.text} >Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    flex: 7,
  },
  header:{
    flex: 1,
  },
});
