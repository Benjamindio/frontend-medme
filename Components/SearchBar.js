import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { useState } from 'react';

  export default function SearchBar() {

    const [ isClicked, setIsClicked ] = useState(false);

    const [searchText, setSearchText] = useState('');
    // const [filteredItems, setFilteredItems] = useState(allItems);

    const allItems = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Cherry' },
    ];


    const handleSearch = text => {
      setSearchText(text);
    }

    const handleCloseSearch = () => {
      console.log('click closing window')
      setIsClicked(false)
      setSearchText('');
    }

    const searchBarStyle = {
      backgroundColor: isClicked ? 'white' : '#F5F5F5',
      borderColor: isClicked ? '#5FA59D': '#afb1b6',
    };



  //   const filtered = allItems.filter(item =>
  //     item.name.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setFilteredItems(filtered);
  // };

  // <View style = {styles.searchBarUnclicked}> 

    return (
        <View style ={styles.container}>
            <View style = {[styles.searchBarUnclicked, searchBarStyle]}> 

              <FontAwesome name='search' size={20} color='#5FA59D' />
              <TextInput
                      style={styles.input}
                      placeholder='Que cherchez-vous?'
                      cursorColor='#154C79'
                      keyboardType='default'
                      onChangeText={handleSearch}
                      value={searchText}
                      onFocus={() => {setIsClicked(true)}}
              />
              {isClicked && (
              <FontAwesome name='times' size={20} color='#afb1b6' style ={styles.iconClose} onPress={() => handleCloseSearch()}/>
              )}
              {/* <FlatList
                      data={filteredItems}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({ item }) => <Text>{item.name}</Text>}
              /> */}
            </View> 
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
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
    }
  });
