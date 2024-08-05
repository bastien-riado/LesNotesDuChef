import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { FONTSIZE } from '../../../globals/styles/typography';

const StyledImageBackground = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${s(16)}px;
  background-color: rgba(255, 255, 255, 0.7);
`;

const Title = styled(Text)`
  font-size: ${FONTSIZE.LARGE}px;
  font-weight: bold;
  margin-bottom: ${vs(16)}px;
  color: ${(props) => props.theme.text};
`;

const StyledTextInput = styled(TextInput).attrs((props) => ({
  theme: {
    colors: {
      primary: props.theme.button,
      background: props.theme.backgroundPrimary,
    },
  },
  textColor: props.theme.text,
  selectionColor: props.theme.text,
  cursorColor: props.theme.text,
}))`
  width: 100%;
  margin-bottom: ${vs(16)}px;
`;

const StyledButton = styled(Button).attrs((props) => ({
  textColor: props.theme.text,
  contentStyle: { paddingHorizontal: s(16) },
}))`
  margin-top: ${vs(16)}px;
  width: auto;
  background-color: ${(props) => props.theme.button};
`;

const StyledButtonBis = styled(Button).attrs((props) => ({
  textColor: props.theme.text,
  contentStyle: { paddingHorizontal: s(16) },
}))`
  margin-top: ${vs(16)}px;
  width: auto;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const StyledDivider = styled(Divider)`
  height: 1px;
  width: 100%;
  background-color: black;
  margin-vertical: ${vs(16)}px;
`;

const StyledSpinner = styled(Spinner).attrs((props) => ({
  color: props.theme.text,
  textStyle: { color: props.theme.text },
}))``;

const ToggleText = styled(Text)`
  color: ${(props) => props.theme.text};
`;

export {
  Container,
  StyledButton,
  StyledButtonBis,
  StyledDivider,
  StyledImageBackground,
  StyledLinearGradient,
  StyledSpinner,
  StyledTextInput,
  Title,
  ToggleText,
};
