import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CameraPage() {
  return (
    <View style={styles.container}>
      <Text>Camera</Text>
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
