import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

  export default function SearchBarList({navigation}) {

    const [ isClicked, setIsClicked ] = useState(false);
    const [showList, setShowList] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [reset,setReset] = useState(0);
    const [errorMessage,setErrorMessage] = useState(false)
    const [ allItems, setAllItems ] = useState ([]);


    useEffect (() => {
      if(searchText.length > 2){
        console.log(searchText.length)
      //setTimeout(() => {
      fetch('https://backend-medme.vercel.app/medicaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name: searchText}),
      }).then(response => response.json())
      .then(data => {
        console.log(data)
          if(data.result){
            console.log(data.result)
          setAllItems(data.medicaments)
          console.log('allItems',allItems)
          setShowList(true)
          setErrorMessage(false)
          } else {
          setShowList(false)
          setErrorMessage(true)
          console.log('error medicament non trouvé')
          }})
      .then(() => {setReset(searchText.length)});

        //},2000)
        
} else {
  setAllItems([])
  setShowList(false)
}
    }, [searchText]);

    const handleSearchText = (value) => {
      if( searchText.length === 0) {
        setAllItems([])
        console.log('allitems', allItems)
      }
      setSearchText(value)
    };

    handleClick = ()=> {
      console.log('click')
      navigation.navigate('FicheProduit')
    }

    const renderItem = ({ item }) => (
      <View style={styles.resultContainer} >
        <Text style = {styles.resultName}onPress={()=> handleClick()}>{item.medName}</Text>
        <View style={styles.label}>
          <Text style = {styles.resultCategorie}>Catégorie: {item.medCategorie}</Text>
        </View>
      </View>
    );

    const handleCloseSearch = () => {
      if (textInputRef.current) {
        textInputRef.current.blur();
      }
      setSearchText('')
      setErrorMessage(false)
      setIsClicked(false);
      setReset(0);
    }

    const handleFocusInput = () => {
      console.log('input focused')
      setIsClicked(true)
    }



    const searchBarStyle = {
      backgroundColor: isClicked ? 'white' : '#F5F5F5',
      borderColor: isClicked ? '#5FA59D': '#afb1b6',
    };

    const textInputRef = useRef(null);

    return (
        <View style ={styles.container}>
            <View style = {[styles.searchBarUnclicked, searchBarStyle]}> 
              <FontAwesome name='search' size={20} color='#5FA59D' />
              <TextInput
                      ref={textInputRef}
                      style={styles.input}
                      placeholder='Que cherchez-vous?'
                      cursorColor='#154C79'
                      keyboardType='default'
                      onChangeText= {(value)=> handleSearchText(value)}
                      value={searchText}
                      onFocus={() => handleFocusInput()}
              />
              {isClicked && (
              <FontAwesome name='times' size={20} color='#afb1b6' style ={styles.iconClose} onPress={() => handleCloseSearch()}/>
              )}
            </View>
            {errorMessage && <Text style= {styles.errorMessage}>Aucun résultat</Text>}
            {showList && (
            <View style = {styles.listContainer}>
              <FlatList
                        data={allItems}
                        keyExtractor={(item) => item.product_id}
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
    },
    errorMessage: {
      fontSize:15,
      color:'#154C79',
      marginTop:20,
    }
  });