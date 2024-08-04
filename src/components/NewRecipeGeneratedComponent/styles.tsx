import Spinner from 'react-native-loading-spinner-overlay';
import { Button, TextInput } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';
import styled from 'styled-components/native';

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const OutputContainer = styled.ScrollView`
  flex-grow: 1;
  padding-left: 12px;
  padding-right: 12px;
`;

const BottomContainer = styled.View`
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: center;
`;

const StyledTextInput = styled(TextInput).attrs((props) => ({
  textColor: props.theme.text,
}))`
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const StyledPaperButton = styled(Button).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
  contentStyle: { paddingHorizontal: s(16) },
}))`
  margin-left: auto;
  margin-right: auto;
  margin-top: ${vs(16)}px;
`;

const Loader = styled(Spinner).attrs((props) => ({
  textStyle: { color: props.theme.text },
  color: props.theme.text,
}))``;

export {
  BottomContainer,
  InputContainer,
  Loader,
  OutputContainer,
  StyledPaperButton,
  StyledTextInput,
};
