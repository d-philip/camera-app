import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { IconButton, Colors } from 'react-native-paper';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const handleCameraFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Check settings.</Text>;
  }

  return (
      <View>
        <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="camera-switch"
            color={Colors.white}
            style={styles.button}
            size={40}
            onPress={handleCameraFlip}
          />
          <IconButton
            icon="camera"
            color={Colors.white}
            style={styles.button}
            size={40}
            onPress={() => console.log('Take Picture')}
          />
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
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
