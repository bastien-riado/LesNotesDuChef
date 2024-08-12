import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { vs } from 'react-native-size-matters';
import styled from 'styled-components';

const Container = styled(View)`
  margin-top: ${vs(10)}px;
`;

const StyledTextInput = styled(TextInput).attrs((props) => ({
  textColor: props.theme.text,
}))`
  width: 100%;
  margin-bottom: ${vs(10)}px;
  background-color: ${(props) => props.theme.backgroundPrimary};
  color: ${(props) => props.theme.text};
`;

export { Container, StyledTextInput };
