import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AuthContext } from "../App";
import config from '../app.json';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { IconButton, Colors, Badge } from 'react-native-paper';
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
  const [camType, setCamType] = useState(Camera.Constants.Type.back);
  const [barType, setBarType] = useState(BarCodeScanner.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let camera: Camera;

  const handleCameraFlip = () => {
    setCamType(
      camType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
    setBarType(
      barType === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back
    );
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanData({type: type, data: data});
    console.log('Scanned');
    alert('Barcode detected.');
  };

  const handleCameraCapture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const filename = FileSystem.documentDirectory + Date.now().toString() + '.jpg';
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      FileSystem.moveAsync({from: photo.uri, to: filename});
      console.log(scanData);
      db.collection(state.email).doc(uuidv4()).set({
        filepath: filename,
        location: location,
        timestamp: Date.now().toString(),
        barcode: scanned ? scanData : null,
      });
      setScanned(false);
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

        <Camera style={styles.camera} type={camType} ref={(r) => { camera = r }} >

          <View style={styles.buttonContainer}>
            <Badge style={(scanned) ? styles.badgeOn : styles.badgeOff} >
              {(scanned) ? 'Barcode Detected' : 'No Barcode Detected'}
            </Badge>
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
            {/*<BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.barcode}
            />*/}
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
  barcode: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'transparent',
  },
  badgeOn: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#2a9d8f',
    borderWidth: 0.75,
  },
  badgeOff: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#ED771D',
    borderWidth: 0.75,
  },
});
