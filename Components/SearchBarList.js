import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

  export default function SearchBarList() {

    const [ isClicked, setIsClicked ] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [ allItems, setAllItems ] = useState ([]);

    useEffect (() => {
      setTimeout(() => {
      fetch('https://backend-medme.vercel.app/medicaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: searchText}),
      }).then(response => response.json())
      .then(data => {
          if(data.result){
          setAllItems(data.medicaments)
          let filtered = allItems.filter(item => (item.medName).toLowerCase().includes(searchText.toLowerCase()));
          setFilteredItems(filtered);
          } else {
          console.log('error medicament non trouvé')
          }})
      .then(() => {setAllItems([])});

        },2000)


    }, [searchText]);
      
  

    console.log('allitems', allItems)
    console.log('filter',filteredItems)

    const renderItem = ({ item }) => (
      <View style={styles.resultContainer}>
        <Text style = {styles.resultName}>{item.medName}</Text>
        <View style={styles.label}>
          <Text style = {styles.resultCategorie}>Catégorie: {item.medCategorie}</Text>
        </View>
      </View>
    );

    const handleCloseSearch = () => {
      console.log('click closing window')
      setIsClicked(false);
      setSearchText('');
      setAllItems('');
      setFilteredItems([]);
    }

    const handleFocusInput = () => {
      console.log('input focused')
      setIsClicked(true)
    }

    const searchBarStyle = {
      backgroundColor: isClicked ? 'white' : '#F5F5F5',
      borderColor: isClicked ? '#5FA59D': '#afb1b6',
    };


    return (
        <View style ={styles.container}>
            <View style = {[styles.searchBarUnclicked, searchBarStyle]}> 
              <FontAwesome name='search' size={20} color='#5FA59D' />
              <TextInput
                      style={styles.input}
                      placeholder='Que cherchez-vous?'
                      cursorColor='#154C79'
                      keyboardType='default'
                      onChangeText= {(value)=> setSearchText(value)}
                      value={searchText}
                      onFocus={() => handleFocusInput()}
              />
              {isClicked && (
              <FontAwesome name='times' size={20} color='#afb1b6' style ={styles.iconClose} onPress={() => handleCloseSearch()}/>
              )}
            </View> 
            {isClicked && (
            <View style = {styles.listContainer}>
              <FlatList
                        data={filteredItems}
                        keyExtractor={(item) => item}
                        renderItem={renderItem} />
            </View>
            )}
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
    },
    searchBarUnclicked:{
      padding: 10,
      flexDirection: "row",
      width: "100%",
      borderRadius: 15,
      justifyContent:'center',
      alignItems: "center",
      borderWidth: 1,
      opacity: 0.8,
    },
    searchBarClicked:{
      padding: 10,
      flexDirection: "row",
      width: "80%",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-evenly",
      borderWidth: 1,
      opacity: 0.8,
    },
    input: {
      fontSize: 15,
      marginLeft: 20,
      width: "70%",
    },
    iconClose: {
      padding:1,
    },
    item: {
      fontSize: 18,
      marginBottom: 5,
    },
    listContainer: {
      width:'100%',
      height: '90%',
      padding:20,
      marginTop:10,
      backgroundColor: 'white',
      borderRadius: 15,
    },
    resultContainer: {
      width: '100%',
      height: 70,
      borderBottomColor: '#afb1b6',
      borderBottomWidth: 1,
      justifyContent: 'center'
    },
    resultName: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#154C79',

    },
    resultCategorie: {
      fontSize: 13,
      color: '#afb1b6',

    },
    label: {
      height: 30,
      justifyContent: 'center',
    }
  });
