import { Image, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import styled from 'styled-components';

const Container = styled(View)`
  padding-left: 12px;
  padding-right: 12px;
`;

const BottomContainer = styled(Button).attrs((props) => ({
  buttonColor: props.theme.backgroundDanger,
  textColor: props.theme.textDanger,
  contentStyle: { paddingHorizontal: s(12) },
}))`
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 12px;
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
