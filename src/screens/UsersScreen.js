// import React, { useState, useEffect, useRef } from "react";
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';

// import {
//     View,
//     Text,
//     SafeAreaView,
//     Button,
//     TouchableOpacity,
//     StyleSheet,
//     Image,
//     Modal,
// } from "react-native";


// function users() {
//     var myHeaders = new Headers();
//     myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYjBhMDEwNjAzZjQzMmMxNGZhZTFjZiIsImVtYWlsIjoiZWRAZWQuY29tIn0sImlhdCI6MTYyMjE5Mjk0Nn0.o0I5xuh6xZOrYpCGyzHhZM1rryVOfec1845H4Cqb6QU");
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({
//         "email": "ED@ED.com",
//         "password": "azerty"
//     });

//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };
//     fetch("http://149.91.89.133:6088/all", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));
// }