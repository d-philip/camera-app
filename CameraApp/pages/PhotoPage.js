import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PhotoPage() {
  return (
    <View style={styles.container}>
      <Text>Photos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
