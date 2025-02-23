import {View, Text} from 'react-native';
import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {FavoritesProvider} from './src/contextApi/FavoritesContext';

const App = () => {
  return (
    <FavoritesProvider>
      <StackNavigation />
    </FavoritesProvider>
  );
};

export default App;
