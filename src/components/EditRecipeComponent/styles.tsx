import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding-left: 12px;
  padding-right: 12px;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const BottomContainer = styled(Button).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
}))`
  margin: auto;
  margin-bottom: 12px;
`;

const Loader = styled(Spinner).attrs((props) => ({
  color: props.theme.text,
  textStyle: { color: props.theme.text },
}))``;

export { BottomContainer, Container, Loader };
