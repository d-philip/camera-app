import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { AuthContext } from "../App";
import config from '../app.json';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { IconButton, Colors } from 'react-native-paper';
import Logout from './Logout';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = config.expo.web.config.firebase;
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
   firebase.app();
}

const db = firebase.firestore();

export default function Cam() {
  const { state, dispatch } = React.useContext(AuthContext);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let camera: Camera;

  const handleCameraFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleCameraCapture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const filename = FileSystem.documentDirectory + Date.now().toString() + '.jpg';
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      FileSystem.moveAsync({from: photo.uri, to: filename})
      db.collection(state.email).doc(uuidv4()).set({
        filepath: filename,
        location: location,
        timestamp: Date.now().toString(),
      });
    }
  };

  useEffect(() => {
    // request camera permissions
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status);
      if (hasCameraPermission !== 'granted') {
        setErrorMsg('Permission to access camera was denied');
      }
    })();

    // request location permissions
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      setHasLocationPermission(status);
      if (hasLocationPermission !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasLocationPermission === false) {
    return <Text>{errorMsg}</Text>;
  }

  return (
      <View>
        <Camera style={styles.camera} type={type} ref={(r) => { camera = r }}>
          <View style={styles.buttonContainer}>
            <IconButton
              icon="camera-switch"
              color={Colors.white}
              style={styles.button}
              size={40}
              onPress={() => handleCameraFlip()}
            />
            <IconButton
              icon="camera"
              color={Colors.white}
              style={styles.button}
              size={40}
              onPress={() => handleCameraCapture()}
            />
            <Logout />
          </View>
        </Camera>
      </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
