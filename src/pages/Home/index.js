import React, {useContext, useEffect, useState, Children} from 'react';

import firebase from '../../Services/FirebaseConnection';
import {AuthConText} from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import {Background, Container, List, Nome, Saldo, Title} from './styles';
import {format} from 'date-fns';

export default function Home() {
  const {user} = useContext(AuthConText);
  const [historico, setHistorico] = useState([]);

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

          snapshot.forEach(children => {
            let list = {
              key: children.key,
              tipo: children.val().tipo,
              valor: children.val().valor,
            };

            setHistorico(oldArray => [...oldArray, list].reverse());
          });
        });
    }
    loadList();
  }, []);

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>
          R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Saldo>
      </Container>

      <Title>Ultimas Movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => <HistoricoList data={item} />}
      />
    </Background>
  );
}
