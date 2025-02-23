import {} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../splash/Splash';
import Home from '../screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import BottomNav from './BottomNavigation';
import RepoDetails from '../screens/RepoDetails';

const stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <stack.Screen component={Splash} name="Splash" />
        <stack.Screen component={Home} name="Home" />
        <stack.Screen component={BottomNav} name="BottomNavigation" />
        <stack.Screen name="RepoDetails" component={RepoDetails} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
