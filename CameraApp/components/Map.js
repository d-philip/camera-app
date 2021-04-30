import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from "../App";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
  const { state, dispatch } = React.useContext(AuthContext);
  const [markers, setMarkers] = React.useState([]);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  let mapView;

  useEffect(() => {
    // request location permissions
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      setHasLocationPermission(status);
      if (hasLocationPermission !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      else {
        let location_data = await Location.getCurrentPositionAsync({});
        setLocation(location_data);
        console.log(location_data);
      }
    })();
  })

  if (location == null) {
    mapView =
    <View>
      <ActivityIndicator animating={true} color='#2A324B' />
      <Text>Loading map...</Text>
    </View>
  }
  else {
    mapView =
    <MapView
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
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
  }

  return (
      <View>
        {mapView}
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
