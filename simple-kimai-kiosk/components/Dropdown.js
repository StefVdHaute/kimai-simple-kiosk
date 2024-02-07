import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';

const Dropdown = ({options, onSelect, style}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        onSelect(option);
        setSelectedOption(option);
        setIsVisible(false);
    };

    return (
        <View style={[styles.container, style]}>
            <Pressable onPress={() => setIsVisible(!isVisible)} style={
                isVisible ? [styles.dropdownButton, styles.dropdownSelectedButton] : styles.dropdownButton}>
                <Text>{selectedOption !== null ? selectedOption.toString() : isVisible ? 'Kies gebruikersnaam' : 'Kies gebruikersnaam'}</Text>
            </Pressable>
            {isVisible && (
                <View style={styles.dropdownContainer}>
                    <FlatList
                        data={options}
                        renderItem={({item}) => (
                            <Pressable onPress={() => handleSelect(item)}
                                              style={selectedOption === item ? [styles.option, styles.selectedOption] : styles.option}>
                                <Text>{item}</Text>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.toString()}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
    },
    dropdownButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        alignItems: 'center',
    },
    dropdownSelectedButton: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    dropdownContainer: {
        position: 'absolute',
        top: 39,
        right: 0,
        left: 0,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        maxHeight: 150,
        zIndex: 100,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    selectedOption: {
        backgroundColor: 'lightgray',
    },
});

export default Dropdown;
