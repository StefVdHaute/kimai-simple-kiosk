import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

export default function Button({onPress, title, color = 'dodgerblue', style}) {
    return (
        <Pressable onPress={onPress} style={[styles.button, {backgroundColor: color}, style]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
