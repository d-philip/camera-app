import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
  const [markers, setMarkers] = React.useState([]);

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

        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginTop: 90,
  },
});
