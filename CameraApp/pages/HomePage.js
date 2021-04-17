import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { AuthContext } from "../App";
import Header from '../components/Header';
import CameraPage from '../pages/CameraPage';
import MapPage from '../pages/MapPage';
import PhotoPage from '../pages/PhotoPage';
import Login from '../components/Login';

export default function HomePage() {
  const { state, dispatch } = React.useContext(AuthContext);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'camera', title: 'Camera' },
    { key: 'photos', title: 'Photos' },
    { key: 'map', title: 'Map' },
  ]);

  const renderScene = SceneMap({
    camera: CameraPage,
    map: MapPage,
    photos: PhotoPage,
  });

  if (state.isAuthenticated === false){
    return (
      <View style={styles.container}>
        <Login />
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    width: 400,
  },
});
