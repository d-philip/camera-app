import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

export default function Map() {

  return (
      <View>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width-20,
    height: Dimensions.get('window').height-80,
  },
});
