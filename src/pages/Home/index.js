import React, {useContext, useEffect, useState} from 'react';
import {Alert, TouchableOpacity, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../Services/FirebaseConnection';
import {AuthConText} from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import DatePicker from '../../components/DatePicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Background,
  Container,
  List,
  Nome,
  Saldo,
  Title,
  Area,
  BtnRegistrar,
} from './styles';
import {format, isBefore} from 'date-fns';

export default function Home() {
  const {user} = useContext(AuthConText);
  const [historico, setHistorico] = useState([]);
  const navigation = useNavigation();
  const [saldo, setSaldo] = useState(0);
  const uid = user && user.uid;

  const [show, setShow] = useState(false);
  const [newDate, setNewDate] = useState(new Date());

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
        .equalTo(format(newDate, 'dd/MM/yyyy'))
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
  }, [newDate, uid]);

  function handleDelete(data) {
    //Pegando a Data do Item9
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);
    console.log(dateItem);

    //Pegando a Data de Hoje
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    console.log(dateHoje);

    if (isBefore(dateItem, dateHoje)) {
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

  function handleShowPicker() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  const onChange = date => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date);
  };

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
      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" color="#fff" size={30} />
        </TouchableOpacity>
        <Title>Ultimas Movimentações</Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
      />
      {show && (
        <DatePicker onClose={handleClose} date={newDate} onChange={onChange} />
      )}
    </Background>
  );
}
