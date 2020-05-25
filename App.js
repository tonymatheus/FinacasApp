import React from 'react';
import {View, Text} from 'react-native';
import {Container, Titulo, Botao, BotaoTexto} from './src/styles';
export default function App() {
  return (
    <Container>
      <Titulo>Oá Mundo </Titulo>
      <Botao onPress={() => alert('Clicou')}>
        <BotaoTexto tamanho={30} cor="green">
          Clique aqui
        </BotaoTexto>
      </Botao>
    </Container>
  );
}
