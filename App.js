import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Container, Titulo} from './src/styles';

export default function App() {
  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <Titulo>Texto App </Titulo>
    </Container>
  );
}
