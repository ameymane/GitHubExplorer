import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { View, Image } from 'react-native';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Profile from '../screens/Profile';
import { FavoritesContext } from '../contextApi/FavoritesContext';

const Tab = createBottomTabNavigator();

function BottomNav() {
  const { isDarkMode } = useContext(FavoritesContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#222' : '#fff',
          borderTopColor: isDarkMode ? '#444' : '#ccc',
          height: 60,
          paddingTop: 5,
          position: 'absolute',
        },
        tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
        tabBarInactiveTintColor: isDarkMode ? '#888' : '#7f8c8d',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../components/assets/images/icons/home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../components/assets/images/icons/favourites.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../components/assets/images/icons/profile.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNav;
