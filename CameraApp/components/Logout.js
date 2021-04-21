import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from "../App";
import { FAB } from 'react-native-paper';

export default function Logout(){
  const { state, dispatch } = React.useContext(AuthContext);

  const handleLogout = () => {
    dispatch({type: "logout"});
  };

  return(
    <View>

      <FAB
        label="Logout"
        style={styles.fab}
        small
        icon="exit-to-app"
        onPress={() => handleLogout()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#767B91',
    top: 7,
  },
})
