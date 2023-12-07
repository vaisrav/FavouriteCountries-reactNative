import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import CountriesList from './screens/CountriesList';
import Favourites from './screens/Favourites';
import CountryDetail from './screens/CountryDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CountryDetailScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CountriesList"
        component={CountriesList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CountryDetail"
        component={CountryDetail}
        options={{ title: 'Country Details' }}
      />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={CountryDetailScreen} options={{tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}/>
        <Tab.Screen name="Favourites" component={Favourites} options={{tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
