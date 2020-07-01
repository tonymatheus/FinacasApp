import React, {useContext} from 'react';
import {AuthConText} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles';

export default function Profile() {
  const navigation = useNavigation();
  const {user, signOut} = useContext(AuthConText);

  return (
    <Container>
      <Header />
      <Nome>{user && user.nome}</Nome>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Resgistrar Gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}
