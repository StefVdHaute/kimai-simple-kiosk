import {StyleSheet, Text, TextInput, View} from "react-native";
import Button from "../components/Button";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddUserScreen({navigation}) {
    const [username, setUsername] = useState('');

    const appendData = async (key, value) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            const data = jsonValue != null ? JSON.parse(jsonValue) : [];
            data.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.log('Error appending ' + value.toString() + ' to ' + key + ': ', e);
        }
    }

    const removeValue = async (key, value) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            const data = jsonValue != null ? JSON.parse(jsonValue) : [];
            const newData = data.filter(item => item !== value);
            await AsyncStorage.setItem(key, JSON.stringify(newData));
        } catch (e) {
            console.log('Error removing ' + value.toString() + ' from ' + key + ': ', e);
        }
    }

     async function addUser (){
        await appendData('usernames', username);
        navigation.goBack();
    }

    async function removeUser (){
        await removeValue('usernames', username);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Gebruikersnaam:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Gebruikersnaam"
                    value={username}
                    onChangeText={setUsername}
                />
                <View style={styles.gridRow}>
                    <Button style={styles.button} color="red" title="Annuleer" onPress={() => navigation.goBack()}/>
                    <Button style={styles.button} color="red" title="Verwijder" onPress={() => navigation.goBack()}/>
                    <Button style={styles.button} title="Voeg toe" onPress={addUser}/>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '80%',
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    button: {
        marginTop: 10,
        marginLeft: 20,
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
