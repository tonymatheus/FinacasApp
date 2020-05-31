import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AuthConText} from '../../contexts/auth';

export default function Home() {
  const {user} = useContext(AuthConText);
  return (
    <View>
      <Text>Home</Text>
      <Text>{user && user.nome}</Text>
      <Text>{user && user.email}</Text>
    </View>
  );
}
