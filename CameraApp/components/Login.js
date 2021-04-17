import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from "../App";
import { TextInput, IconButton, Colors } from 'react-native-paper';

export default function Login(){
  const { state, dispatch } = React.useContext(AuthContext);
  const [text, setText] = React.useState('');

  const handleSubmit = () => {
    if (text == '') {
      alert('Please enter an email addres.');
    }
    else if (text.includes('@') === false){
      alert('Please enter a valid email address.')
    }
    else{
      dispatch({type: 'login', payload: text})
    }
  };

  return(
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          label="Enter an email"
          value={text}
          onChangeText={text => setText(text)}
        />
        <IconButton
          icon="check"
          color={Colors.black}
          size={35}
          onPress={() => handleSubmit()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 400,
  },
  inputBox: {
    width: '70%',
    margin: 10,
  },
  button: {

  },
});
