import React, { useState, useEffect, useRef } from "react";
// import UsersScreen from '../screens/UsersScreen';
// import LoginScreen from '../screens/LoginScreen';
import * as ImagePicker from 'expo-image-picker';

import {
    View,
    Text,
    SafeAreaView,
    Button,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
} from "react-native";
import { Camera } from "expo-camera";
import AppIcon from "../components/appIcon/AppIcon";

const HomeScreen = () => {
    const [switchCam, setSwitchCam] = useState(0);

    if (switchCam == 0) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: '#FFFF00',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: "center",
                                marginBottom: 16,
                            }}
                        >
                            Bonjour  !
                        </Text>
                        <TouchableOpacity style={styles.appButtonContainer} >
                            <Text style={styles.appButtonText} onPress={() => setSwitchCam(1)}> Prendre un Snap </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: "center",
                                marginBottom: 16,
                            }}
                        >

                        </Text>
                        <TouchableOpacity style={styles.appButtonContainer} >
                            <Text style={styles.appButtonText} onPress={() => setSwitchCam(2)}> Choisir une image </Text>
                        </TouchableOpacity>
                    </View>

                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: "center",
                            color: "grey",
                        }}
                    ></Text>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: "center",
                            color: "grey",
                        }}
                    >
                        SNAPCHAT
        </Text>
                </View>
            </SafeAreaView>
        );
    } if (switchCam == 1) {
        return <Cam />;
    } else {
        return <ImagePickerExample />
    }
};
function Cam() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imagePreview, setImagePreview] = useState(null);
    const [isOpen, setIsopen] = useState(false);
    const camRef = useRef(null);
    const [flashMode, setFlashMode] = useState('off');

    const changeFlashMode = () => {
        if (flashMode == "off") {
            setFlashMode('on');
        } else {
            setFlashMode('off');

        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (!camRef) {
            return;
        }
        try {
            const pic = await camRef.current.takePictureAsync();
            //  console.log(pic);
            setImagePreview(pic.uri);
            setIsopen(true);
        } catch (error) {
            console.log("Error taking a picture !");
        }
    };

    function users() {
        var myHeaders = new Headers();
        myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYjBhMDEwNjAzZjQzMmMxNGZhZTFjZiIsImVtYWlsIjoiZWRAZWQuY29tIn0sImlhdCI6MTYyMjE5Mjk0Nn0.o0I5xuh6xZOrYpCGyzHhZM1rryVOfec1845H4Cqb6QU");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": "ED@ED.com",
            "password": "azerty"
        });

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://149.91.89.133:6088/all", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const CloseImagaPreview = () => {
        setImagePreview(null), setIsopen(false);
    };
    if (imagePreview) {
        return (
            <Modal animationType="fade" visible={isOpen}>
                {
                    <Image
                        source={{ uri: imagePreview }}
                        style={{ height: "100%", width: "100%" }}
                    />
                }

                <View style={styles.actionBottom}>
                    <AppIcon IonName="send" size={40} color="#eee" />
                    <AppIcon
                        IonName="send"
                        size={40}
                        color="#0e153a"
                        style={styles.sendBtn}
                        onPress={users}
                    />
                </View>
                <View style={styles.closeBtn}>
                    <AppIcon
                        IonName="close-circle"
                        size={60}
                        color="#eee"
                        onPress={CloseImagaPreview}
                    />
                </View>
            </Modal>
        );

    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={camRef}
                flashMode={flashMode}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                    >
                        {
                            <Image
                                style={styles.image}
                                source={require("../../assets/rotate.png")}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <AppIcon AntName="user" color="#eee" size={20} />
                </View>
                <View style={styles.setting}>
                    <AppIcon AntName="setting" size={20} color="#eee" />
                </View>
                <View style={styles.flash}>
                    <AppIcon
                        IonName="flash"
                        size={20}
                        color="#eee"
                        onPress={changeFlashMode}
                    />
                </View>
                <View style={styles.message}>
                    <AppIcon AntName="message1" size={20} color="#eee" />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={takePicture}
                        style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: "#fff",
                            marginLeft: 150,
                            marginBottom: 30,
                        }}
                    />
                </View>
            </Camera>
        </View>
    );
}
function ImagePickerExample() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Choisir une image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    camera: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        margin: 20,
    },
    button: {
        // flex: 0.1,
        // alignSelf: 'flex-end',
        // alignItems: 'center',
        marginLeft: 300,
    },
    text: {
        fontSize: 18,
        color: "white",
    },
    text1: {
        fontSize: 18,
        textAlign: "right",
    },
    image: {
        width: 50,
        height: 50,
    },
    actionBottom: {
        position: "absolute",
        bottom: 20,
        left: "80%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    sendBtn: {
        backgroundColor: "yellow",
    },
    closeBtn: {
        padding: 10,
        position: "absolute",
        top: 5,
    },
    header: {
        position: "absolute",
        margin: 20,
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: "black",
        borderRadius: 50,
    },
    setting: {
        position: "absolute",
        margin: 20,
        padding: 10,
        top: 50,
        justifyContent: "space-between",
        backgroundColor: "black",
        borderRadius: 50,
    },
    flash: {
        position: "absolute",
        margin: 20,
        padding: 10,
        top: 100,
        justifyContent: "space-between",
        backgroundColor: "black",
        borderRadius: 50,
    },
    message: {
        position: "absolute",
        margin: 20,
        padding: 10,
        top: 150,
        justifyContent: "space-between",
        backgroundColor: "black",
        borderRadius: 50,
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
export default HomeScreen;