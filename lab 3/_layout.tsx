import React from 'react';

import { createStackNavigator,  } from '@react-navigation/stack';
import HomeScreen from './(tabs)/index';
import ResultScreen from './(tabs)/results';

export default function RootLayout() {

  const Stack = createStackNavigator();

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen} />
        <Stack.Screen
          name="Results"
          component={ResultScreen} />
      </Stack.Navigator>
  );
}
