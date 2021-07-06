import { Assets } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";

// import { useFonts, } from '@import url https://fonts.googleapis.com/css2?family=Russo+One&display=swap';
import {
    StyleSheet,
    Alert,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Button,
    Image,
    TouchableOpacity
} from "react-native";


const App = ({ navigation }) => {

    return (
        <View style={styles.container}>
            {<Image
                style={styles.Image}
                source={require('../../assets/snap.png')}
            />}
            <StatusBar style="auto" />
            <UselessTextInput />
            <Button
                title="Se connecter"
                onPress={() => 
                navigation.navigate('Login')
                }
                color="black"
            />
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
        paddingVertical: 8,
        paddingHorizontal: 15
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    }
});

const UselessTextInput = () => {
    const [text, onChangeText] = React.useState("");
    const [text2, onChangeText2] = React.useState(null);
    const [text3, onChangeText3] = React.useState(null);
    function Verify() {

        if (text2 != text3) {
            Alert.alert('Password différent')
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": text,
            "password": text2
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://149.91.89.133:6088/inscription", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Email"
                // keyboardType="email-adress"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text2}
                placeholder="Password"
                secureTextEntry={true}
                // keyboardType="text"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText3}
                value={text3}
                placeholder="Confirmez le Password"
                secureTextEntry={true}
                // keyboardType="text"
            />
            <TouchableOpacity onPress={(Verify)} style={styles.appButtonContainer} >
                <Text style={styles.appButtonText}> S'inscrire </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

};

export default App;