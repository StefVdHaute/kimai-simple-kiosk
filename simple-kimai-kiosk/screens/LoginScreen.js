import {StyleSheet, Text, TextInput, View} from "react-native";
import Dropdown from "../components/Dropdown";
import {useCallback, useState} from "react";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ping} from "../API";
import {useFocusEffect} from "@react-navigation/native";

export default function LoginScreen({navigation}) {
    const [usernames, setUsernames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [password, setPassword] = useState('');

    useFocusEffect(
        useCallback(() => {
            try {
                setPassword('');
                getData().then(data => {
                    setUsernames(data)
                    setLoading(false);
                });
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        }, [])
    )

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('usernames');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.log('Error getting usernames:', e);
        }
    };

    const handleLogin = async () => {
        if (selectedUsername && password) {
            if (await ping(selectedUsername, password)) {
                navigation.navigate('Prikklok', {username: selectedUsername, password: password});
            } else {
                alert('Gebruikersnaam of wachtwoord is onjuist!');
            }
        } else {
            alert('Vul gebruikersnaam en wachtwoord in!');
        }
    };

    const logout = () => {
        setPassword('');
        navigation.navigate('Aanmelden');
    }

    return (
        <View style={styles.container}>
            <Button style={styles.addUserBtn} title={'Gebruikers aanpassen'}
                    onPress={() => navigation.navigate('Gebruikers aanpassen')}/>
            <View style={styles.form}>
                <View style={styles.grid}>
                    <View style={[styles.gridRow, styles.dropDownHolder]}>
                        <Text style={styles.label}>Gebruikersnaam:</Text>
                        {
                            loading ?
                                <Text>Loading...</Text> :
                                usernames.length > 0 ?
                                    <Dropdown options={usernames} onSelect={setSelectedUsername}/> :
                                    <Text>Geen gebruikers gevonden</Text>
                        }
                    </View>
                    <View style={styles.gridRow}>
                        <Text style={styles.label}>Wachtwoord:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Voeg wachtwoord in"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            onSubmitEditing={handleLogin}
                        />
                    </View>
                </View>
                <Button title="Aanmelden" onPress={handleLogin}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addUserBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    btn: {
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
    },
    form: {
        width: '80%',
    },
    grid: {
        flex: 1,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    dropDownHolder: {
        zIndex: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    label: {
        minWidth: 110,
        marginRight: 10,
    },
});
