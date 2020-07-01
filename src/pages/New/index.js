import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../components/Header';
import {Background, Input, SubmitButtom, SubmitText} from './styles';

export default function New() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(null);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        <SafeAreaView style={{alignItems: 'center'}}>
          <Input
            placeholder="Valor Desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={text => setValor(text)}
          />

          <SubmitButtom>
            <SubmitText>Resgistrar</SubmitText>
          </SubmitButtom>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
