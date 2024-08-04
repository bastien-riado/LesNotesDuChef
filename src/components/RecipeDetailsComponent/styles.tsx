import { Image, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-paper';
import styled from 'styled-components';

const Container = styled(View)`
  padding-left: 12px;
  padding-right: 12px;
`;

const BottomContainer = styled(Button).attrs((props) => ({
  buttonColor: props.theme.backgroundDanger,
  textColor: props.theme.textDanger,
}))`
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: auto;
  height: 250px;
`;

const Loader = styled(Spinner).attrs((props) => ({
  textStyles: { fontSize: 16, fontWeight: 'bold', color: props.theme.text },
  color: props.theme.text,
}))``;

export { BottomContainer, Container, Loader, StyledImage };
