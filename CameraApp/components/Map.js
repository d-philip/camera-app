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
        const initMarker = {
          id: 1,
          coords: {
            latitude: location_data.coords.latitude,
            longitude: location_data.coords.longitude
          }
        };


        if (state.markers.length == 0) {
          const newArr = state.markers;
          newArr.push(initMarker);
          console.log("Set initial marker: ", newArr);
          await dispatch({type: "markers", payload: newArr});
        }
      }
    })();

    if (state.markers.length !== state.photos.length){
      loadMarkers();
    }
  });

  const loadMarkers = () => {
    if (state.photos.length !== 0) {
      state.photos.forEach(async (photo) => {
        const id = Object.keys(photo)[0];

        if (markerExists(id) == false) {
          const marker = {
            id: id,
            coords: {
              latitude: photo[id].location.coords.latitude,
              longitude: photo[id].location.coords.longitude,
          }};
          const newArr = state.markers;
          newArr.push(marker);
          console.log("New Marker: ", newArr);
          await dispatch({type: "markers", payload: newArr});
        }
      });
    }
  };

  const markerExists = (id) => {
    var exists = false;
    state.markers.forEach((marker) => {
      if (marker[id] !== undefined) exists = true;
    });
    return exists;
  };

  if (location === null) {
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
      {state.markers.map((marker, i) => (
        <Marker
          key={i}
          coordinate={marker.coords}
        />))
      }
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
