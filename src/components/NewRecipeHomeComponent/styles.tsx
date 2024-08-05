import LinearGradient from 'react-native-linear-gradient';
import { vs } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { FONTSIZE } from '../../globals/styles/typography';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const StyledButton = styled.TouchableOpacity`
  height: ${vs(100)}px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-vertical: ${vs(10)}px;
  elevation: 10;
`;

const ButtonGradient = styled(LinearGradient)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  font-size: ${FONTSIZE.LARGE}px;
  color: ${(props) => props.theme.text};
`;

export { ButtonGradient, ButtonText, Container, StyledButton };
