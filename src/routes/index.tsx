import React from 'react';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import {Home, Login, Catalog, Details} from '../pages'

const Stack = createStackNavigator();

const Routes: React.FC = () => {
    return(
        <Stack.Navigator
           screenOptions={
               {headerTitle: "",}               
           }
        >  
          <Stack.Screen name="Home" component={Home} />     
          <Stack.Screen name="Login" component={Login} />     
          <Stack.Screen name="Catalog" component={Catalog} />  
          <Stack.Screen name="Details" component={Details} /> 
      </Stack.Navigator>
    )
}

export default Routes;