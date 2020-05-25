import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ff0000;
`;

export const Titulo = styled.Text`
  font-size: 35px;
  color: #ffff;
`;

export const Botao = styled.TouchableOpacity`
  color: #000;
  background-color: #ffff;
  width: 100%;
  height: 50%;
`;

export const BotaoTexto = styled.Text`
  font-size: ${props => `${props.tamanho}px`};
  color: ${props => `${props.cor}`};
`;
