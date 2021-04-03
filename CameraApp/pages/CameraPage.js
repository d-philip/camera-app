import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Cam from '../components/Cam';

export default function CameraPage() {
  return (
    <View style={styles.container}>
      <Cam />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fbf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
