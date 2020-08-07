import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthConText} from '../../contexts/auth';

export default function CustomDrawer(props) {
  const {user, signOut} = useContext(AuthConText);
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{width: 100, height: 100}}
        />

        <Text style={{color: '#fff', fontSize: 18}}>Bem-Vindo</Text>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            padding: 15,
          }}>
          {user && user.nome}
        </Text>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem
        {...props}
        label="Sair do App"
        inactiveBackgroundColor="#c62c36"
        onPress={() => {
          signOut();
        }}
      />
    </DrawerContentScrollView>
  );
}
