import { StatusBar } from "expo-status-bar";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFonts, } from '@import url https://fonts.googleapis.com/css2?family=Russo+One&display=swap';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {<Image
                style={styles.Image}
                source={require('../../assets/snap.png')}
            />}
            <StatusBar style="auto" />
            <UselessTextInput navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFF00",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        width: 200,
        margin: 10,
        padding: 5,
        borderRadius: 15,
        backgroundColor: "white",
    },
    Image: {
        resizeMode: 'contain',
        width: 100,
        height: 100
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "black",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    }
});

const UselessTextInput = ({ navigation }) => {
    const [text3, onChangeText] = React.useState("");
    const [text4, onChangeText2] = React.useState(null);
    function Alerte() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": text3,
            "password": text4
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const storeData = async (value) => {
            try {
                await AsyncStorage.setItem("token", JSON.stringify(value));
                if (value !== null) {
                    return value;
                }
            } catch (error) {
                console.log('Something went wrong', error)
            }
        }

        fetch("http://149.91.89.133:6088/connection", requestOptions)
            .then(response => response.json())
            .then(result => {
                storeData(result.data.token);
                navigation.navigate("Acceuil")
            })
            .catch(error => console.log('error', error));
    }
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text3}
                placeholder="Email"
                // keyboardType="email-adress"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text4}
                placeholder="Password"
                secureTextEntry={true}
                // keyboardType="text"
            />
            <TouchableOpacity style={styles.appButtonContainer} >
                <Text style={styles.appButtonText} onPress={(Alerte)}> Connexion </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default LoginScreen;