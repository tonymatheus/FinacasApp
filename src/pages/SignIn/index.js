import React, {useState} from 'react';
import {Text, View} from 'react-native';
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

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Background>
      <Container>
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

        <SubmitButton>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link>
          <LinkText>Criar Uma Conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
