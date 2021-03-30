import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Header from '../components/Header';
import CameraPage from '../pages/CameraPage';
import MapPage from '../pages/MapPage';
import PhotoPage from '../pages/PhotoPage';

export default function HomePage() {
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
