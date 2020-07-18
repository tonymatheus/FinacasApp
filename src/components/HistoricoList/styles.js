import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 5px;
  padding: 5px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.4);
`;

export const Tipo = styled.View`
  flex-direction: row;
`;

export const IconView = styled.View`
  flex-direction: row;
  background-color: ${props => (props.tipo === 'despesa' ? 'red' : '#049301')};
  padding-bottom: 3px;
  padding-top: 3px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 7px;
`;

export const TipoText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-style: italic;
`;

export const ValorText = styled.Text`
  color: #222;
  font-weight: bold;
  font-size: 20px;
`;
