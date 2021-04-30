import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import config from './app.json';
import * as firebase from 'firebase';

const firebaseConfig = config.expo.web.config.firebase;
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
   firebase.app();
}

import HomePage from './pages/HomePage';
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  email: null,
  photos: [],
  markers: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        email: null,
      };
    case "photos":
      return {
        ...state,
        photos: action.payload,
      };
      case "marker":
        return {
          ...state,
          markers: action.payload,
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
