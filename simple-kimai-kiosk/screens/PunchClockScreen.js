import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import Button from "../components/Button";
import {getActiveTimer, startTimer, stopTimer} from "../API";
import Timer from "../components/Timer";

export default function PunchClockScreen({route, navigation}) {
    const [clockActive, setClockActive] = useState(false);
    const [id, setID] = useState(-1);
    const [startTime, setStartTime] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    const {username} = route.params;
    const {password} = route.params;

    useEffect(() => {
        try {
            getActiveTimer(username, password).then(activeClocks => {
                const isActive = activeClocks.length > 0;
                setClockActive(isActive);
                setIsFetching(false);
                if (isActive) {
                    setID(activeClocks[0].id);
                    setStartTime(new Date(activeClocks[0].begin));
                }
            });
        } catch (error) {
            console.error('Error fetching active clocks:', error);
        }
    }, [username, password]);


    useEffect(() => {
        const timer = setTimeout(async () => {
            await logOut();
        }, 15000); // 30 seconds in milliseconds

        // Clear the timeout when the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const logOut = async () => {
        navigation.navigate('Aanmelden');
    }

    const punchClock = async () => {
        if (clockActive) {
            await stopTimer(username, password, id);
            setClockActive(!clockActive);
        } else {
            await startTimer(username, password);
            setClockActive(!clockActive);
        }
    }

    return (
        <View style={styles.container}>
            <Button style={styles.logoutBtn} color='red' title={'Afmelden'} onPress={logOut}/>
            <Text style={styles.textWelcome}>Hallo {username}</Text>
            <Pressable onPress={punchClock}>
                <Image style={styles.statusIcon}
                       source={isFetching ? require("../assets/loading.gif") :
                           clockActive ? require("../assets/stop-circle.svg") : require('../assets/play-circle.svg')}/>
            </Pressable>
            {clockActive && startTime && <Timer startTime={startTime}/>}
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
