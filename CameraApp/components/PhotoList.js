import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { List, Surface, IconButton } from 'react-native-paper';
import { AuthContext } from "../App";
import config from '../app.json';
import * as firebase from 'firebase'
import 'firebase/firestore';
import Logout from './Logout';

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
        const photo = {};
        if (photoExists(doc.id) == false) {
          photo[doc.id] = doc.data();
          updatePhotos(photo);
        }
      });
    });
  };

  const photoExists = (id) => {
    var exists = false;
    userPhotos.forEach((photo) => {
      if (photo[id] !== undefined) exists = true;
    });
    return exists;
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
    photoView = userPhotos.map((photo, i) => {
      const id = Object.keys(photo)[0];
      var description;
      if (photo[id].location === "null"){ description = 'Location Not Found'; }
      else{ description = photo[id].location.coords.latitude.toFixed(3) + ', ' + photo[id].location.coords.latitude.toFixed(3); }
      const date = new Date(photo[id].timestamp*1);
      const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
      const formattedDate = Intl.DateTimeFormat('en-US', options).format(date);

      return(
        <List.Item
          key={i}
          title={formattedDate}
          description={description}
          titleStyle={styles.title}
          left={props => <Image style={styles.image} source={{uri: photo[id].filepath}} />}
        />
      )
    });
  }

  return(
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <ScrollView style={styles.scroll}>
          {photoView}
        </ScrollView>
        <Logout />
        <IconButton
          icon="refresh"
          style={styles.refresh}
          color="#767B91"
          size={30}
          onPress={() => loadPhotos()}
        />
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
    height: "95%",
    width: 370,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#E1E5EE',
    elevation: 3,
  },
  title: {
    color: '#2A324B',
  },
  image: {
    width: 125,
    height: 125,
  },
  scroll: {
    width: "100%",
  },
  refresh: {
    marginLeft: 310,
  },
});
