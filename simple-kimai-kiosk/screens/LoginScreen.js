import {StyleSheet, Text, TextInput, View} from "react-native";
import Dropdown from "../components/Dropdown";
import {useEffect, useState} from "react";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({navigation}) {
    const [usernames, setUsernames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [password, setPassword] = useState('');

    useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log('Fetching data...');
                    setUsernames(await getData());
                    console.log('Fetched data:', usernames);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, []
    );


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('usernames');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.log('Error getting usernames:', e);
        }
    };

    const handleLogin = () => {
        if (selectedUsername && password) {
            navigation.navigate('PunchClock', {username: selectedUsername})
        } else {
            alert('Vul gebruikersnaam en wachtwoord in!');
        }
    };

    return (
        <View style={styles.container}>
            <Button style={styles.addUserBtn} title={'Voeg gebruiker toe'}
                    onPress={() => navigation.navigate('AddUser')}/>
            <View style={styles.form}>
                <View style={styles.grid}>
                    <View style={styles.gridRow}>
                        <Text style={styles.label}>Gebruikersnaam:</Text>
                        {
                            loading ?
                                <Text>Loading...</Text> :
                                usernames.length > 0 ?
                                    <Dropdown style={{width: '100%', zIndex: '100'}} options={usernames}
                                              onSelect={setSelectedUsername}/> :
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
                        />
                    </View>
                </View>
                <Button title="Login" onPress={handleLogin}/>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
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
