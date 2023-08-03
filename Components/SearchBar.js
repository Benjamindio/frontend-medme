import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { useState, useEffect, useRef } from 'react';

  export default function SearchBar(props) {

    // const textInputRef = useRef(null);


    return (
        <View style ={styles.container}>
            <View style = {props.styleSearchBar}> 
              <FontAwesome name='search' size={20} color='#5FA59D' />
              <TextInput
                      // ref={textInputRef}
                      style={styles.input}
                      placeholder='Que cherchez-vous?'
                      cursorColor='#154C79'
                      keyboardType='default'
                      onChangeText={props.onChangeText}
                      value={props.value}
                      onFocus={props.onFocus}
              />
              {props.condition && (
              <FontAwesome name='times' size={20} color='#afb1b6' style ={styles.iconClose} onPress={props.onPress}/>
              )}
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
    input: {
      fontSize: 15,
      marginLeft: 20,
      width: "70%",
    },
    iconClose: {
      padding:1,
    }
  });
