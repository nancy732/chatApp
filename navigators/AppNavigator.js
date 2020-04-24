import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Contacts from '../screens/Contacts'
import Chat from '../screens/Chat'
const AppNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteNmae="Contacts" headerMode="none">
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
