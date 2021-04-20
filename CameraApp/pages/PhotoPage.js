import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhotoList from '../components/PhotoList';

export default function PhotoPage() {
  return (
    <View style={styles.container}>
      <PhotoList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
