import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import Button from "../components/Button";

export default function PunchClockScreen({route, navigation}) {
    const [clockActive, setClockActive] = useState(false);
    const {username} = route.params;

    useEffect(() => {
        const timer = setTimeout(() => {
            logOut();
        }, 15000); // 30 seconds in milliseconds

        // Clear the timeout when the component unmounts
        return () => {
            clearTimeout(timer);
            logOut();
        };
    }, []);

    const logOut = () => {
        console.log('Logging out...')
        navigation.navigate('Login');
    }

    const punchClock = () => {
        console.log('Punching clock for:', username);
        setClockActive(!clockActive);
    }

    return (
        <View style={styles.container}>
            <Button style={styles.logoutBtn} color='red' title={'Afmelden'} onPress={logOut}/>
            <Text style={styles.textWelcome}>Hallo {username}</Text>
            <Pressable onPress={punchClock}>
                <Image style={styles.statusIcon}
                       source={clockActive ? require("../assets/stop-circle.svg") : require('../assets/play-circle.svg')}/>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    textWelcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    statusIcon: {
        width: 200,
        height: 200,
    },
});
