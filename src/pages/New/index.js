import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import {Background, Input, SubmitButtom, SubmitText} from './styles';
import Picker from '../../components/Picker';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../Services/FirebaseConnection';
import {AuthConText} from '../../contexts/auth';

export default function New() {
  const navigation = useNavigation();

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(null);
  const {user: usuario} = useContext(AuthConText);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo == null) {
      alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando Dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd(),
        },
      ],
    );
  }

  async function handleAdd() {
    let uid = usuario.uid;

    let key = await firebase
      .database()
      .ref('historico')
      .child(uid)
      .push().key;
    await firebase
      .database()
      .ref('historico')
      .child(uid)
      .child(key)
      .set({
        tipo: tipo,
        valor: parseFloat(valor),
        date: format(new Date(), 'dd/MM/yyyy'),
      });

    //Atualizar o nosso saldo
    let user = firebase
      .database()
      .ref('users')
      .child(uid);
    await user.once('value').then(snapshot => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa'
        ? (saldo -= parseFloat(valor))
        : (saldo += parseFloat(valor));

      user.child('saldo').set(saldo);
    });
    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
  }

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
          <SubmitButtom onPress={handleSubmit}>
            <SubmitText>Resgistrar</SubmitText>
          </SubmitButtom>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
