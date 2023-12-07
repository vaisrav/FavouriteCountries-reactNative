import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../FirebaseConfig';


const Favourites = () => {
   const [favouritesData, setFavouritesData] = useState([]);
 
   useEffect(() => {
     const fetchFavourites = async () => {
       try {
         const favouritesRef = collection(db, 'favourites');
         const querySnapshot = await getDocs(favouritesRef);
         const favouritesDataArray = querySnapshot.docs.map((doc) => doc.data());
         setFavouritesData(favouritesDataArray);

         const unsubscribe = onSnapshot(favouritesRef, (snapshot) => {
         const updatedFavouritesDataArray = snapshot.docs.map((doc) => doc.data());
         setFavouritesData(updatedFavouritesDataArray);
         });

         return () => unsubscribe();

       } catch (error) {
         console.error('Error fetching favourites:', error);
       }
     };
 
     fetchFavourites();
   }, []);
 
   return (
     <View>
       <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Favourites:</Text>
       <FlatList
         data={favouritesData}
         keyExtractor={(item) => item.name}
         renderItem={({ item }) => (
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10,}}>
               <View>
                  <Image source={{ uri: item.flag }} style={{width: 100, height: 60}} />
               </View>
               <View style={{ padding: 10, marginLeft: 25 }}>
                  <View>
                     <Text>Name: {item.name}</Text>
                  </View>

                  <View>
                     <Text>Capital: {item.capital}</Text>
                  </View>

                  <View>
                     <Text>Population: {item.population}</Text>
                  </View>
               </View>
            </View>
         )}
       />
     </View>
   );
 };
 
 export default Favourites;
 