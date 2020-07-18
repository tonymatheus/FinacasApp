import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../Services/FirebaseConnection';
import {AuthConText} from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import {
  Background,
  Container,
  List,
  Nome,
  Saldo,
  Title,
  BtnRegistrar,
} from './styles';
import {format, isPast} from 'date-fns';

export default function Home() {
  const {user} = useContext(AuthConText);
  const [historico, setHistorico] = useState([]);
  const navigation = useNavigation();
  const [saldo, setSaldo] = useState(0);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref('users')
        .child(uid)
        .on('value', snapshot => {
          setSaldo(snapshot.val().saldo);
        });

      await firebase
        .database()
        .ref('historico')
        .child(uid)
        .orderByChild('date')
        .equalTo(format(new Date(), 'dd/MM/yy'))
        .limitToLast(10)
        .on('value', snapshot => {
          setHistorico([]);

          snapshot.forEach(childItem => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date,
            };

            setHistorico(oldArray => [...oldArray, list].reverse());
          });
        });
    }
    loadList();
  }, []);

  function handleDelete(data) {
    if (isPast(new Date(data.date))) {
      //se  a data já tiver passado a condição entra aqui
      alert('Você não pode excluir um resgistro antigo!');
      return;
    }
    Alert.alert(
      'Cuidado Atenção!',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'COntinuar',
          onPress: () => handleDeleteSuccess(data),
        },
      ],
    );
  }

  async function handleDeleteSuccess(data) {
    await firebase
      .database()
      .ref('historico')
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let saldoAtual = saldo;
        data.tipo === 'despesa'
          ? (saldoAtual += parseFloat(data.valor))
          : (saldoAtual -= parseFloat(data.valor));

        await firebase
          .database()
          .ref('users')
          .child(uid)
          .child('saldo')
          .set(saldoAtual);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>
          R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Saldo>
        <BtnRegistrar onPress={() => navigation.navigate('Registrar')}>
          <Title>Resgistrar</Title>
        </BtnRegistrar>
      </Container>

      <Title>Ultimas Movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
      />
    </Background>
  );
}
