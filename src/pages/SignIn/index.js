import React, {useState, useContext} from 'react';
import {Plataform} from 'react-native';
import {
  Background,
  Container,
  SubmitButton,
  SubmitText,
  Logo,
  Link,
  LinkText,
  AreaInput,
  Input,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {AuthConText} from '../../contexts/auth';

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthConText);

  function handleLogin() {
    signIn(email, password);
  }
  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} />
        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={texto => {
              setEmail(texto);
            }}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={texto => {
              setPassword(texto);
            }}
          />
        </AreaInput>

        <SubmitButton onPress={handleLogin}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar Uma Conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
