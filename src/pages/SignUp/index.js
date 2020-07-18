import React, {useState, useContext} from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import {
  Background,
  Container,
  SubmitButton,
  SubmitText,
  Logo,
  AreaInput,
  Input,
} from '../SignIn/styles';
import {AuthConText} from '../../contexts/auth';

export default function SignIn() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp, loadingAuth} = useContext(AuthConText);

  function handleSignUp() {
    signUp(email, password, nome);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={texto => {
              setNome(texto);
            }}
          />
        </AreaInput>
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
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
