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
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="PunchClock" component={PunchClockScreen}/>
                <Stack.Screen name="AddUser" component={AddUserScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
