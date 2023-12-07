import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../FirebaseConfig';
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';

const CountryDetail = ({ route }) => {
  const { name, flags, capital, area, population, location} = route.params;

  const buttonClicked = async () => {
   try {
      const favouritesRef = collection(db, 'favourites'); 
      
      const q = query(favouritesRef, where('name', '==', name.common));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
         Alert.alert('Country already added to Favourites List')
      } else {
         // Add the country details to the "favourites" collection
         await addDoc(favouritesRef, {
         name: name.common,
         capital,
         population,
         flag: flags.png,
       });
       alert('Added to Favourites');
      }
   } catch (error) {
      console.error('Error adding to favourites:', error);
      alert('Failed to add to Favourites');
   }
  }
  
  return (
    <View>
      <View style={{paddingVertical: 20, alignItems: 'center'}}>
         <Image source={{ uri: flags.png }} style={{ width: 150, height: 80 }} />
      </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 10}}>
         <Text style={{fontSize: 20}}>Name</Text>
         <Text style={{fontSize: 20}}>{name.common}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 10}}>
         <Text style={{fontSize: 20}}>Capital</Text>
         <Text style={{fontSize: 20}}>{capital}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 10}}>
         <Text style={{fontSize: 20}}>Population</Text>
         <Text style={{fontSize: 20}}>{population}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingBottom: 10}}>
         <Text style={{fontSize: 20}}>Area</Text>
         <Text style={{fontSize: 20}}>{area} km²</Text>
      </View>
      <View style={{paddingVertical: 20, alignItems: 'center'}}>
         <MapView
            style={{height:200, width:320, marginBottom: 20, alignItems: 'center'}}
            initialRegion={{
               latitude: location.latlng[0],
               longitude: location.latlng[1],
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
            }}
         >
            <Marker key={1} coordinate={{latitude:location.latlng[0], longitude:location.latlng[1]}}/>
         </MapView>
      </View>
      <Button title='add to fav?' style={{padding: 20}} onPress={buttonClicked}></Button>
    </View>
  );
};

export default CountryDetail;
