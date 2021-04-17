import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import HomePage from './pages/HomePage';
import * as FirebaseCore from 'expo-firebase-core';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  email: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.user,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        email: null,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <PaperProvider>
        <View style={styles.container}>
          <HomePage />
        </View>
      </PaperProvider>
    </AuthContext.Provider>
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
