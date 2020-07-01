import React, {useContext, useState} from 'react';

import {AuthConText} from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import {Background, Container, List, Nome, Saldo, Title} from './styles';

export default function Home() {
  const {user} = useContext(AuthConText);
  const [historico, setHistorico] = useState([
    {key: '1', tipo: 'receita', valor: 112000},
    {key: '2', tipo: 'despesa', valor: 500},
    {key: '3', tipo: 'receita', valor: 50},
    {key: '4', tipo: 'despesa', valor: 100},
    {key: '5', tipo: 'receita', valor: 3200},
    {key: '6', tipo: 'receita', valor: 5000},
    {key: '7', tipo: 'receita', valor: 8000},
    {key: '8', tipo: 'despesa', valor: 9000},
    {key: '9', tipo: 'despesa', valor: 6000},
    {key: '10', tipo: 'receita', valor: 2000},
    {key: '11', tipo: 'receita', valor: 200.0},
  ]);
  return (
    <Background>
      <Header />
      <Container>
        <Nome>Matheus</Nome>
        <Saldo>R$10.0000</Saldo>
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
