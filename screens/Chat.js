import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Text, View, Image, TextInput, ScrollView } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import Images from '../assets/index'
import Message from '../components/Message'
import database from '@react-native-firebase/database';

const Chat = ({ route, navigation }) => {
    const [message, setText] = useState('')
    const [send, setSend] = useState(false)
    const [Messages, setMessages] = useState([])
    const { name } = route.params
    const [num, setNum] = useState()

    useEffect(() => {
        database()
            .ref(`/${name}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() != null) {
                    setNum(snapshot.val().length)
                }
                else {
                    setNum('1')
                }
            });
    }, [num])

    useEffect(() => {
        database()
            .ref(`/${name}`)
            .once('value')
            .then(snapshot => {
                setMessages(snapshot.val())
            })
    }, [])
    const handleSubmit = e => {
        database()
            .ref(`/${name}/${num}`)
            .set({
                message: message,
            })
            .then(() => console.log('Data updated.'));
        setSend(true)
    }
    return (
        <>
            <StatusBar hidden />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image style={styles.profileIcon} source={Images.person} />
                        <Text style={styles.contactName}>{name}</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.chatBody}>

                        {Messages.map(value => {
                            if (value != null) {
                                <Message message={value.message} />
                            }
                        })}
                        {send ?
                            <Message message={message} />
                            : <Text></Text>
                        }
                    </ScrollView>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Enter Text"
                            name="chat"
                            onChangeText={text => {
                                setSend(false)
                                setText(text)
                            }}
                            style={{ backgroundColor: 'white', width: '90%' }}
                        />
                        <Text style={{ marginLeft: 4, marginTop: 2 }} onPress={handleSubmit}>
                            <Image style={styles.send} source={Images.send} />
                        </Text>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileIcon: {
        height: 30,
        width: 30,
        marginVertical: 10,
        marginLeft: 15,
        padding: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignContent: 'center',
    },
    chatBody: {
        paddingVertical: 100,
        paddingHorizontal: 10
    },
    contactName: {
        color: 'white',
        fontSize: 25,
        margin: 12,
    },
    input: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        borderTopColor: 'gray',
        borderTopWidth: 1
    },
    send: {
        width: 30,
        height: 30,
    }
});

export default Chat;
