import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const [language, setLanguage] = useState('');
  const navigation = useNavigation();

  const langs = [
    { key: 'C++', value: 'C++' },
    { key: 'C#', value: 'C#' },
    { key: 'Java', value: 'Java' },
    { key: 'JavaScript', value: 'JavaScript' },
    { key: 'Python', value: 'Python' },
  ];

  const handleSearch = () => {
    if (language) {
      navigation.navigate('Results', {language}); // VScode ger varning här men fungerar ändå
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Top Trending GitHub Repos</Text>
        <Text style={styles.desc}>Select Programming Language:</Text>
      </View>

      <SelectList
        setSelected={setLanguage}
        data={langs}
        save="key"
        boxStyles={styles.dropdown}
        dropdownStyles={styles.dropdownStyles}
        
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Repos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wrapper: {
    marginTop: 200,
    alignItems: 'center',
  },
  header: {
    color: '#FFF',
    fontSize: 28,
  },
  desc: {
    color: '#AAA',
    marginTop: 25,
  },
  dropdown: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#EEE',
    borderRadius: 10,
    paddingHorizontal: 15,
    width: 200,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownStyles : {
    backgroundColor: '#EEE',
    zIndex: 999,
    position: "absolute",
    marginTop: 55,
    alignSelf: 'center',
    width: 200

  }
});
