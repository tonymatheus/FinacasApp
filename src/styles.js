import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  background-color: #0b3b80;
  padding-top: ${0 + getStatusBarHeight()};
`;

export const Titulo = styled.Text`
  font-size: 25px;
  color: #ffff;
  text-align: center;
`;
