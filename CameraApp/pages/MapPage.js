import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MapPage() {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
