import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Teste App</Text>
      <Icon name="home" size={30} color="#121212" />
      <Icon name="reply" size={30} color="#121212" />
      <Icon name="upload" size={30} color="#121212" />

      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#3b5998',
            justifyContent: 'center',
            alignItems: 'center',
            width: 220,
            height: 50,
            borderRadius: 10,
          }}>
          <Icon name="facebook" size={30} color="#fff" />
          <Text style={{paddingLeft: 5, color: '#fff', fontSize: 20}}>
            {' '}
            Login com Facebook
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
