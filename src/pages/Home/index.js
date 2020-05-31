import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthConText} from '../../contexts/auth';

export default function Home() {
  const {user, signOut} = useContext(AuthConText);
  return (
    <View>
      <Text>Home</Text>
      <Text>{user && user.nome}</Text>
      <Text>{user && user.email}</Text>
      <Button title="Sair" onPress={() => signOut()} />
    </View>
  );
}
