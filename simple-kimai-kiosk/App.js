import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import AddUserScreen from "./screens/AddUserScreen";
import PunchClockScreen from "./screens/PunchClockScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Aanmelden">
                <Stack.Screen name="Aanmelden" component={LoginScreen}/>
                <Stack.Screen name="PrikKlok" component={PunchClockScreen}/>
                <Stack.Screen name="Gebruikers aanpassen" component={AddUserScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
