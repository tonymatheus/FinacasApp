import React, {useState} from 'react';
import {SafeAreaView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Header from '../../components/Header';
import {Background, Input, SubmitButtom, SubmitText} from './styles';
import Picker from '../../components/Picker';

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
          <Picker onChange={setTipo} />
          <SubmitButtom>
            <SubmitText>Resgistrar</SubmitText>
          </SubmitButtom>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
