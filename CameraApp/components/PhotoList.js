import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { AuthContext } from "../App";
import config from '../app.json';
import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = config.expo.web.config.firebase;
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
   firebase.app();
}

export default function PhotoList(){
  const { state, dispatch } = React.useContext(AuthContext);
  const db = firebase.firestore();
  const [userPhotos, setUserPhotos] = useState([]);
  let photoView;

  const loadPhotos = () => {
    db.collection(state.email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const photoLocation = doc.data().filepath;
        updatePhotos(photoLocation);
      });
    });
  };

  const updatePhotos = async (photo) => {
    const newPhotos = (userPhotos => [...userPhotos, photo]);
    await setUserPhotos(newPhotos);
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  if (userPhotos.length === 0) {
    photoView = <Text>No photos saved. Go to the camera page to take some pics!</Text>
  }
  else {
    console.log("Photos Full: ", userPhotos);
    photoView = userPhotos.map((item, i) => (
      <List.Item
        key={i}
        title="Date"
        description="Location"
        titleStyle={styles.title}
        left={props => <Image style={styles.image} source={{uri: item}} />}
      />
    ))
  }

  return(
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <ScrollView style={styles.scroll}>
          {photoView}
        </ScrollView>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  surface: {
    padding: 6,
    height: "90%",
    width: 370,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#ffc',
    elevation: 3,
  },
  title: {
    color: 'black',
  },
  image: {
    width: 125,
    height: 125,
  },
  scroll: {
    width: "100%",
  }
});
