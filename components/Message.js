import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Message(props) {
    console.log("message", props.message)
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddddff',
        padding: 8,
        width: 150,
        borderRadius: 20
    },
    message: {
        paddingHorizontal: 10
    }
})