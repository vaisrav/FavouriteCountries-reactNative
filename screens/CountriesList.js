import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import CountryDetail from './CountryDetail';

const Stack = createStackNavigator();

export default function CountriesList({navigation}) {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const fetchCountriesData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/independent?status=true');
      const data = await response.json();
      setCountriesData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const navigateToCountryDetail = (item) => {
    navigation.navigate('CountryDetail', { name: item.name, flags: item.flags, capital: item.capital, area: item.area, population: item.population, location: item.capitalInfo });
  };

  const renderCountryItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigateToCountryDetail(item)}>
        <View style={styles.countryItem}>
          <View style={styles.countryInfo}>
            <Image source={{ uri: item.flags.png }} style={styles.flagImage} />
            <Text style={styles.countryName}>{item.name.common}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>List of Countries</Text>
      <FlatList
        data={countriesData}
        renderItem={renderCountryItem}
        keyExtractor={(item) => item.cca2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  countryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ededed',
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  countryName: {
    fontSize: 16,
    marginLeft: 10,
  },
  flagImage: {
    width: 100,
    height: 60,
  },
});
