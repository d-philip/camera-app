import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <HomePage />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
