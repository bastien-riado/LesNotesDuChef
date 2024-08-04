import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import styled from 'styled-components/native';

const StyledButton = styled(Button).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
  contentStyle: { paddingHorizontal: s(16) },
}))`
  align-self: center;
  margin: auto;
  margin-bottom: 10px;
`;

const Loader = styled(Spinner).attrs((props) => ({
  textStyle: { color: props.theme.text },
  color: props.theme.text,
}))``;

const ScrollViewContainer = styled.ScrollView`
  padding-left: 12px;
  padding-right: 12px;
`;

export { Loader, ScrollViewContainer, StyledButton };
