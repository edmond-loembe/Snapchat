import { StatusBar } from "expo-status-bar";
import React from 'react';
import AppIcon from '../components/appIcon/AppIcon';
// import { useFonts, } from '@import url https://fonts.googleapis.com/css2?family=Russo+One&display=swap';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
} from "react-native";


const AcceuilScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {<Image
                style={styles.Image}
                source={require('../../assets/snap.png')}
            />}
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.appButtonContainer} >
                <Text style={styles.appButtonText} onPress={() => navigation.navigate('Home')}> Profil </Text>
            </TouchableOpacity>
        
            <Button
                title="Se déconnecter"
                color="black"
            />
                <AppIcon     onPress={() => 
                    navigation.navigate('Login')
                } AntName="logout" size={40} color="black" />
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
        paddingHorizontal: 100
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    }
});

export default AcceuilScreen;